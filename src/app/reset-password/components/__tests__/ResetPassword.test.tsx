import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/services/supabase";
import usersSlice, { clearPasswordUpdateStatus } from "@/state/User/usersSlice";
import ResetPassword from "../ResetPassword";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));
jest.mock("@/services/supabase", () => ({
  supabase: {
    auth: {
      setSession: jest.fn(),
      getSession: jest.fn(),
      updateUser: jest.fn(),
    },
  },
}));

const mockPush = jest.fn();
const mockToast = jest.fn();

const store = configureStore({
  reducer: {
    user: usersSlice,
  },
});

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <ResetPassword />
    </Provider>
  );
};

describe("ResetPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    store.dispatch(clearPasswordUpdateStatus()); // Reset redux state
  });

  describe("Authentication Handling", () => {
    it("shows loading state initially", async () => {
      (supabase.auth.getSession as jest.Mock).mockReturnValue(
        new Promise(() => {})
      ); // Never resolves
      renderComponent();
      expect(
        screen.getByText("Verifying your reset link...")
      ).toBeInTheDocument();
      expect(screen.getByText("Authenticating...")).toBeInTheDocument();
    });

    it("handles session from URL hash and shows form", async () => {
      window.location.hash =
        "#access_token=test-access&refresh_token=test-refresh";
      (supabase.auth.setSession as jest.Mock).mockResolvedValue({
        data: { session: { user: {} } },
        error: null,
      });

      renderComponent();

      await waitFor(() => {
        expect(supabase.auth.setSession).toHaveBeenCalledWith({
          access_token: "test-access",
          refresh_token: "test-refresh",
        });
      });

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /update password/i })
        ).toBeInTheDocument();
      });
    });

    it("shows an error if URL hash is invalid", async () => {
      window.location.hash = "#access_token=invalid";
      (supabase.auth.setSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: null,
      });

      renderComponent();

      await waitFor(() => {
        expect(
          screen.getByText("Invalid reset link. Missing authentication tokens.")
        ).toBeInTheDocument();
      });
    });

    it("shows an error if setSession fails", async () => {
      window.location.hash =
        "#access_token=test-access&refresh_token=test-refresh";
      (supabase.auth.setSession as jest.Mock).mockResolvedValue({
        data: { session: null },
        error: new Error("Session set failed"),
      });

      renderComponent();

      await waitFor(() => {
        expect(
          screen.getByText(
            "Invalid or expired reset link. Please request a new password reset."
          )
        ).toBeInTheDocument();
      });
    });

    it("shows an error if no session and no hash is found", async () => {
      window.location.hash = "";
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
      });

      renderComponent();

      await waitFor(() => {
        expect(
          screen.getByText(
            "No valid session found. Please use the link from your password reset email."
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("Form Submission and Validation", () => {
    beforeEach(() => {
      // Ensure user is authenticated for form tests
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { user: {} } },
      });
    });

    it("renders the password form when authenticated", async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByLabelText("New Password")).toBeInTheDocument();
        expect(
          screen.getByLabelText("Confirm New Password")
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: /update password/i })
        ).toBeInTheDocument();
      });
    });

    it("shows validation error if passwords do not match", async () => {
      renderComponent();
      const user = userEvent.setup();

      await waitFor(() => {
        expect(screen.getByLabelText("New Password")).toBeInTheDocument();
      });

      const passwordInput = screen.getByLabelText("New Password");
      const confirmPasswordInput = screen.getByLabelText(
        "Confirm New Password"
      );
      const submitButton = screen.getByRole("button", {
        name: /update password/i,
      });

      await user.type(passwordInput, "Password123");
      await user.type(confirmPasswordInput, "Password456");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("New passwords don't match")
        ).toBeInTheDocument();
      });
    });

    it("shows validation error for weak password", async () => {
      renderComponent();
      const user = userEvent.setup();

      await waitFor(() => {
        expect(screen.getByLabelText("New Password")).toBeInTheDocument();
      });

      const passwordInput = screen.getByLabelText("New Password");
      const submitButton = screen.getByRole("button", {
        name: /update password/i,
      });

      await user.type(passwordInput, "weak");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("New password must be at least 8 characters")
        ).toBeInTheDocument();
      });
    });

    it("submits successfully with valid passwords", async () => {
      (supabase.auth.updateUser as jest.Mock).mockResolvedValue({
        error: null,
      });
      renderComponent();
      const user = userEvent.setup();

      await waitFor(() => {
        expect(screen.getByLabelText("New Password")).toBeInTheDocument();
      });

      const passwordInput = screen.getByLabelText("New Password");
      const confirmPasswordInput = screen.getByLabelText(
        "Confirm New Password"
      );
      const submitButton = screen.getByRole("button", {
        name: /update password/i,
      });

      await user.type(passwordInput, "ValidPassword123");
      await user.type(confirmPasswordInput, "ValidPassword123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(supabase.auth.updateUser).toHaveBeenCalledWith({
          password: "ValidPassword123",
        });
        expect(mockToast).toHaveBeenCalledWith({
          title: "Success",
          description:
            "Password updated successfully! You can now sign in with your new password.",
        });
      });

      // Check for redirect
      await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/signin"), {
        timeout: 3000,
      });
    });

    it("shows an error toast if password update fails", async () => {
      const error = new Error("Update failed");
      (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error });
      renderComponent();
      const user = userEvent.setup();

      await waitFor(() => {
        expect(screen.getByLabelText("New Password")).toBeInTheDocument();
      });

      const passwordInput = screen.getByLabelText("New Password");
      const confirmPasswordInput = screen.getByLabelText(
        "Confirm New Password"
      );
      const submitButton = screen.getByRole("button", {
        name: /update password/i,
      });

      await user.type(passwordInput, "ValidPassword123");
      await user.type(confirmPasswordInput, "ValidPassword123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: "Error updating password",
          description: "Update failed",
          variant: "destructive",
        });
      });
    });
  });
});
