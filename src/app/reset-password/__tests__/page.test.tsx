import { render, screen } from "@testing-library/react";
import Page from "../page";

// Mock the ResetPassword component
jest.mock("../components/ResetPassword", () => {
  return function MockedResetPassword() {
    return <div data-testid="reset-password-component">Reset Password Component</div>;
  };
});

// Mock the Background component
jest.mock("../../signin/components/Background", () => {
    return function MockedBackground({ children }: { children: React.ReactNode }) {
      return <div data-testid="background-component">{children}</div>;
    };
  });

describe("Reset Password Page", () => {
  it("renders the Background and ResetPassword components", () => {
    render(<Page />);

    // Check if Background component is rendered
    const background = screen.getByTestId("background-component");
    expect(background).toBeInTheDocument();

    // Check if ResetPassword component is rendered inside the Background
    const resetPasswordComponent = screen.getByTestId("reset-password-component");
    expect(resetPasswordComponent).toBeInTheDocument();
    expect(background).toContainElement(resetPasswordComponent);
  });
}); 