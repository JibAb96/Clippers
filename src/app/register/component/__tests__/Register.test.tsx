import { render, screen } from "@testing-library/react";
import Register from "../Register";

// Mock the Form component
jest.mock("../Form", () => {
  return function MockedForm() {
    return <form data-testid="register-form">Register Form</form>;
  };
});

describe("Register Component", () => {
  it("renders the header and the Form component", () => {
    render(<Register />);

    // Check for header text
    expect(screen.getByText("Register Now, Go Viral Tomorrow")).toBeInTheDocument();
    expect(screen.getByText("Please fill out all the fields to complete your registration.")).toBeInTheDocument();

    // Check that the mocked form is rendered
    const registerForm = screen.getByTestId("register-form");
    expect(registerForm).toBeInTheDocument();
  });
}); 