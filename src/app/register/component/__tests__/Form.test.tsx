import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import * as userThunks from "@/state/User/userThunks";
import usersReducer from "@/state/User/usersSlice";
import Form from "../Form";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

jest.mock("@/state/User/userThunks", () => {
  const mockAsyncThunk = (typePrefix: string) => {
    return Object.assign(jest.fn(), {
      pending: { type: `${typePrefix}/pending` },
      fulfilled: { type: `${typePrefix}/fulfilled` },
      rejected: { type: `${typePrefix}/rejected` },
    });
  };
  return {
    registerCreator: mockAsyncThunk("user/registerCreator"),
    registerClipper: mockAsyncThunk("user/registerClipper"),
    loginCreator: mockAsyncThunk("user/loginCreator"),
    loginClipper: mockAsyncThunk("user/loginClipper"),
  };
});

jest.mock("@/state/Clippers/clipperThunks", () => {
  const mockAsyncThunk = (typePrefix: string) => {
    return Object.assign(jest.fn(), {
      pending: { type: `${typePrefix}/pending` },
      fulfilled: { type: `${typePrefix}/fulfilled` },
      rejected: { type: `${typePrefix}/rejected` },
    });
  };
  return {
    getClipperPortfolioImages: mockAsyncThunk(
      "clipper/getClipperPortfolioImages"
    ),
  };
});

jest.mock("@/state/User/profileManagementThunks", () => {
  const mockAsyncThunk = (typePrefix: string) => {
    return Object.assign(jest.fn(), {
      pending: { type: `${typePrefix}/pending` },
      fulfilled: { type: `${typePrefix}/fulfilled` },
      rejected: { type: `${typePrefix}/rejected` },
    });
  };
  return {
    getCreatorProfile: mockAsyncThunk("user/getCreatorProfile"),
    getClipperProfile: mockAsyncThunk("user/getClipperProfile"),
    updateCreatorProfile: mockAsyncThunk("user/updateCreatorProfile"),
    updateClipperProfile: mockAsyncThunk("user/updateClipperProfile"),
    uploadCreatorProfileImage: mockAsyncThunk("user/uploadCreatorProfileImage"),
    uploadClipperProfileImage: mockAsyncThunk("user/uploadClipperProfileImage"),
    deleteCreatorProfileImage: mockAsyncThunk("user/deleteCreatorProfileImage"),
    deleteClipperProfileImage: mockAsyncThunk("user/deleteClipperProfileImage"),
    deleteCurrentUserAccount: mockAsyncThunk("user/deleteCurrentUserAccount"),
    uploadPortfolioImages: mockAsyncThunk("user/uploadPortfolioImages"),
    deletePortfolioImageById: mockAsyncThunk("user/deletePortfolioImageById"),
    changePassword: mockAsyncThunk("user/changePassword"),
  };
});

jest.mock("@/state/User/userProfileThunks", () => ({
  uploadCreatorImage: jest.fn(),
  uploadClipperImage: jest.fn(),
}));

const mockPush = jest.fn();
const mockToast = jest.fn();

// Mock Redux store
const createMockStore = () =>
  configureStore({
    reducer: {
      user: usersReducer,
    },
  });

const renderComponent = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

// Helper to fill common fields
const fillCommonFields = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Full Name"), "Test User");
  await user.type(screen.getByLabelText("Brand Name"), "Test Brand");
  await user.type(screen.getByLabelText("Email Address"), "test@example.com");
  await user.type(screen.getByLabelText("Social Media Handle"), "testhandle");
  await user.type(screen.getByLabelText("Password"), "Password123");
  await user.type(screen.getByLabelText("Confirm Password"), "Password123");
  await user.type(screen.getByLabelText("Country"), "United Kingdom");
  // Also handle the file input to satisfy validation
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  const fileInput = screen.getByLabelText(/brand profile picture/i);
  await user.upload(fileInput, file);
};

// Helper to select role
const selectRole = async (user: ReturnType<typeof userEvent.setup>, role: "Creator" | "Clipper") => {
  const roleSelect = screen.getByRole("combobox", { name: /role/i });
  await user.click(roleSelect);
  
  await waitFor(() => {
    expect(screen.getByText(role)).toBeInTheDocument();
  });
  
  const roleOption = screen.getByText(role);
  await user.click(roleOption);
  
  await waitFor(() => {
    expect(screen.queryByText("Select your role...")).not.toBeInTheDocument();
  });
};

describe("Registration Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it("renders all form sections correctly", () => {
    renderComponent();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Brand Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Social Media Handle")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByText("I am a")).toBeInTheDocument();
    expect(screen.getByText(/Brand Profile Picture/)).toBeInTheDocument();
  });

  it("shows validation errors for empty submission", async () => {
    renderComponent();
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {
      name: /submit registration/i,
    });

    await user.click(submitButton);

    await waitFor(() => {
      // The role is a discriminator, so its error shows up first.
      expect(
        screen.getByText(/Invalid discriminator value/i)
      ).toBeInTheDocument();
    });
  });

  describe("Creator Registration", () => {
    it('shows creator-specific fields when "Creator" is selected', async () => {
      renderComponent();
      const user = userEvent.setup();

      await selectRole(user, "Creator");

      await waitFor(() => {
        expect(screen.getByText("Platform")).toBeInTheDocument();
        expect(screen.getByText("Which best describe your niche:")).toBeInTheDocument();
      });
    });

    it("submits creator data successfully", async () => {
      const mockRegisterCreator =
        userThunks.registerCreator as unknown as jest.Mock;
      mockRegisterCreator.mockResolvedValue({ data: { token: "fake-token" } });

      renderComponent();
      const user = userEvent.setup();

      await fillCommonFields(user);
      await selectRole(user, "Creator");

      // Select Platform
      const platformSelect = screen.getAllByRole("combobox")[1]; // Second combobox is platform
      await user.click(platformSelect);
      
      await waitFor(() => {
        expect(screen.getByText("YouTube")).toBeInTheDocument();
      });
      
      const youtubeOption = screen.getByText("YouTube");
      await user.click(youtubeOption);

      // Select Niche
      const nicheSelect = screen.getAllByRole("combobox")[2]; // Third combobox is niche
      await user.click(nicheSelect);
      
      await waitFor(() => {
        expect(screen.getByText("Gaming")).toBeInTheDocument();
      });
      
      const gamingOption = screen.getByText("Gaming");
      await user.click(gamingOption);

      const submitButton = screen.getByRole("button", {
        name: /submit registration/i,
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterCreator).toHaveBeenCalled();
        expect(mockToast).toHaveBeenCalledWith({
          title: "Registration successful",
          description: "You have successfully registered",
        });
        expect(mockPush).toHaveBeenCalledWith("/signin");
      });
    });
  });

  describe("Clipper Registration", () => {
    it('shows clipper-specific fields when "Clipper" is selected', async () => {
      renderComponent();
      const user = userEvent.setup();

      await selectRole(user, "Clipper");

      await waitFor(() => {
        expect(screen.getByLabelText("Follower Count")).toBeInTheDocument();
        expect(screen.getByLabelText("Price Per Post (£)")).toBeInTheDocument();
      });
    });

    it("submits clipper data successfully", async () => {
      const mockRegisterClipper =
        userThunks.registerClipper as unknown as jest.Mock;
      mockRegisterClipper.mockResolvedValue({ data: { token: "fake-token" } });

      renderComponent();
      const user = userEvent.setup();

      await fillCommonFields(user);
      await selectRole(user, "Clipper");

      // Fill clipper-specific fields
      await user.type(screen.getByLabelText("Follower Count"), "10000");
      await user.type(screen.getByLabelText("Price Per Post (£)"), "150");

      // Select Platform
      const platformSelect = screen.getAllByRole("combobox")[1];
      await user.click(platformSelect);
      
      await waitFor(() => {
        expect(screen.getByText("YouTube")).toBeInTheDocument();
      });
      
      await user.click(screen.getByText("YouTube"));

      // Select Niche
      const nicheSelect = screen.getAllByRole("combobox")[2];
      await user.click(nicheSelect);
      
      await waitFor(() => {
        expect(screen.getByText("Gaming")).toBeInTheDocument();
      });
      
      await user.click(screen.getByText("Gaming"));

      const submitButton = screen.getByRole("button", {
        name: /submit registration/i,
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockRegisterClipper).toHaveBeenCalled();
        expect(mockToast).toHaveBeenCalledWith({
          title: "Registration successful",
          description: "You have successfully registered",
        });
        expect(mockPush).toHaveBeenCalledWith("/signin");
      });
    });
  });

  it("shows an error toast if registration fails", async () => {
    const mockRegisterClipper =
      userThunks.registerClipper as unknown as jest.Mock;
    const errorMessage = "Email already in use";
    mockRegisterClipper.mockRejectedValue({ message: errorMessage });

    renderComponent();
    const user = userEvent.setup();

    await fillCommonFields(user);
    await selectRole(user, "Clipper");

    // Fill clipper-specific fields
    await user.type(screen.getByLabelText("Follower Count"), "10000");
    await user.type(screen.getByLabelText("Price Per Post (£)"), "150");

    // Select Platform and Niche
    const platformSelect = screen.getAllByRole("combobox")[1];
    await user.click(platformSelect);
    await waitFor(() => expect(screen.getByText("YouTube")).toBeInTheDocument());
    await user.click(screen.getByText("YouTube"));

    const nicheSelect = screen.getAllByRole("combobox")[2];
    await user.click(nicheSelect);
    await waitFor(() => expect(screen.getByText("Gaming")).toBeInTheDocument());
    await user.click(screen.getByText("Gaming"));

    const submitButton = screen.getByRole("button", {
      name: /submit registration/i,
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      expect(mockPush).toHaveBeenCalledWith("/register");
    });
  });
});
