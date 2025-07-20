import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { loginCreator, loginClipper } from "@/state/User/userThunks";
import { setForgotPassword } from "@/state/Modal/isOpen";
import Form from "../Form";

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the ForgotPasswordModal component
jest.mock("../ForgotPasswordModal", () => {
  return function MockForgotPasswordModal() {
    return <div data-testid="forgot-password-modal">Forgot Password Modal</div>;
  };
});

// Mock the user thunks
jest.mock("@/state/User/userThunks", () => ({
  loginCreator: jest.fn((data) => ({
    type: "user/loginCreator/pending",
    payload: data,
  })),
  loginClipper: jest.fn((data) => ({
    type: "user/loginClipper/pending",
    payload: data,
  })),
}));

// Mock the modal actions
const mockSetForgotPasswordAction = { type: "modal/setForgotPassword" };
jest.mock("@/state/Modal/isOpen", () => ({
  setForgotPassword: jest.fn(() => mockSetForgotPasswordAction),
}));

describe("Form Component", () => {
  let mockStore: ReturnType<typeof configureStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup router mock
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Create mock store with different states for different tests
    mockStore = configureStore({
      reducer: {
        user: (
          state = { loading: false, error: null, user: null, userType: null },
          action
        ) => {
          switch (action.type) {
            case "SET_LOADING":
              return { ...state, loading: action.payload };
            case "SET_ERROR":
              return { ...state, error: action.payload };
            case "SET_USER":
              return {
                ...state,
                user: action.payload,
                userType: action.userType,
              };
            default:
              return state;
          }
        },
        isOpen: (state = { forgotPassword: false }) => state,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  it("renders all form elements", () => {
    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    expect(screen.getByText("Log in as:")).toBeInTheDocument();
    expect(screen.getByText("Creator")).toBeInTheDocument();
    expect(screen.getByText("Clipper")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot your password?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("allows switching between Creator and Clipper user types", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    const creatorButton = screen.getByText("Creator");
    const clipperButton = screen.getByText("Clipper");

    // Creator should be selected by default
    expect(creatorButton).toHaveClass("bg-gray-800", "text-white");
    expect(clipperButton).toHaveClass("bg-white", "text-gray-700");

    // Click Clipper button
    await user.click(clipperButton);

    expect(clipperButton).toHaveClass("bg-gray-800", "text-white");
    expect(creatorButton).toHaveClass("bg-white", "text-gray-700");
  });

  it("handles form input changes", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("submits form with Creator login when Creator is selected", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    await user.type(screen.getByLabelText("Email"), "creator@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");

    const submitButton = screen.getByRole("button", { name: "Log in" });
    await user.click(submitButton);

    // Check if loginCreator was called
    expect(loginCreator).toHaveBeenCalledWith({
      email: "creator@example.com",
      password: "password123",
    });
  });

  it("submits form with Clipper login when Clipper is selected", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    // Switch to Clipper
    await user.click(screen.getByText("Clipper"));

    await user.type(screen.getByLabelText("Email"), "clipper@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");

    const submitButton = screen.getByRole("button", { name: "Log in" });
    await user.click(submitButton);

    // Check if loginClipper was called
    expect(loginClipper).toHaveBeenCalledWith({
      email: "clipper@example.com",
      password: "password123",
    });
  });

  it("opens forgot password modal when link is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    const forgotPasswordLink = screen.getByText("Forgot your password?");
    await user.click(forgotPasswordLink);

    // Check that the action creator was called
    expect(setForgotPassword).toHaveBeenCalled();
  });

  it("displays loading state during form submission", () => {
    // Create store with loading state
    const loadingStore = configureStore({
      reducer: {
        user: () => ({
          loading: true,
          error: null,
          user: null,
          userType: null,
        }),
        isOpen: () => ({ forgotPassword: false }),
      },
    });

    render(
      <Provider store={loadingStore}>
        <Form />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: "Logging in..." });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveClass(
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    );
  });

  it("displays error message when login fails", () => {
    // Create store with error state
    const errorStore = configureStore({
      reducer: {
        user: () => ({
          loading: false,
          error: "There was an internal server error during login process.",
          user: null,
          userType: null,
        }),
        isOpen: () => ({ forgotPassword: false }),
      },
    });

    render(
      <Provider store={errorStore}>
        <Form />
      </Provider>
    );

    expect(screen.getByText("Invalid email or password.")).toBeInTheDocument();
  });

  it("displays custom error message", () => {
    // Create store with custom error state
    const errorStore = configureStore({
      reducer: {
        user: () => ({
          loading: false,
          error: "Custom error message",
          user: null,
          userType: null,
        }),
        isOpen: () => ({ forgotPassword: false }),
      },
    });

    render(
      <Provider store={errorStore}>
        <Form />
      </Provider>
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("redirects to creator dashboard when creator logs in successfully", () => {
    // Create store with successful creator login
    const successStore = configureStore({
      reducer: {
        user: () => ({
          loading: false,
          error: null,
          user: { id: "1", email: "creator@example.com" },
          userType: "creator",
        }),
        isOpen: () => ({ forgotPassword: false }),
      },
    });

    render(
      <Provider store={successStore}>
        <Form />
      </Provider>
    );

    expect(mockPush).toHaveBeenCalledWith("/dashboard/creator");
  });

  it("redirects to clipper dashboard when clipper logs in successfully", () => {
    // Create store with successful clipper login
    const successStore = configureStore({
      reducer: {
        user: () => ({
          loading: false,
          error: null,
          user: { id: "1", email: "clipper@example.com" },
          userType: "clipper",
        }),
        isOpen: () => ({ forgotPassword: false }),
      },
    });

    render(
      <Provider store={successStore}>
        <Form />
      </Provider>
    );

    expect(mockPush).toHaveBeenCalledWith("/dashboard/clipper");
  });

  it("renders the ForgotPasswordModal component", () => {
    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    expect(screen.getByTestId("forgot-password-modal")).toBeInTheDocument();
  });

  it("has proper form validation attributes", () => {
    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("autoComplete", "email");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("required");
    expect(passwordInput).toHaveAttribute("autoComplete", "current-password");
  });
});
 