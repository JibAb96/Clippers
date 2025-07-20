import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Redux imports removed as they're not used
import ForgotPasswordModal from "../ForgotPasswordModal";
import { supabase } from "@/services/supabase";

// Mock Supabase
jest.mock("@/services/supabase", () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn(),
    },
  },
}));

// Mock toast hook
const mockToast = jest.fn();
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock Modal component
jest.mock("@/components/Modal", () => {
  return function MockModal({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) {
    return isOpen ? <div data-testid="modal">{children}</div> : null;
  };
});

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  X: () => <div data-testid="x-icon">X</div>,
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
}));

// Mock the modal actions
jest.mock("@/state/Modal/isOpen", () => ({
  setForgotPassword: jest.fn(() => ({ type: "modal/setForgotPassword" })),
}));

// Mock app hooks
jest.mock("@/app/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (
    selector: (state: { isOpen: { forgotPassword: boolean } }) => boolean
  ) => selector({ isOpen: { forgotPassword: true } }),
}));

describe("ForgotPasswordModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the mock implementation
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
      error: null,
    });
  });

  it("renders the modal when open", () => {
    render(<ForgotPasswordModal />);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
  });

  it("displays the correct header and description", () => {
    render(<ForgotPasswordModal />);

    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your email address and we'll send you a link/)
    ).toBeInTheDocument();
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("renders email input field", () => {
    render(<ForgotPasswordModal />);

    const emailInput = screen.getByLabelText("Email Address");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute(
      "placeholder",
      "Enter your email address"
    );
  });

  it("renders Cancel and Send Reset Link buttons", () => {
    render(<ForgotPasswordModal />);

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Send Reset Link")).toBeInTheDocument();
  });

  it("submits form with valid email", async () => {
    const user = userEvent.setup();

    render(<ForgotPasswordModal />);

    const emailInput = screen.getByLabelText("Email Address");
    const sendButton = screen.getByText("Send Reset Link");

    await user.type(emailInput, "test@example.com");
    await user.click(sendButton);

    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      "test@example.com",
      {
        redirectTo: "http://localhost:3000/reset-password",
      }
    );
  });

  it("shows success toast on successful submission", async () => {
    const user = userEvent.setup();

    render(<ForgotPasswordModal />);

    const emailInput = screen.getByLabelText("Email Address");
    const sendButton = screen.getByText("Send Reset Link");

    await user.type(emailInput, "test@example.com");
    await user.click(sendButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Password reset email sent",
        description: "Please check your email for the reset link",
      });
    });
  });
});
