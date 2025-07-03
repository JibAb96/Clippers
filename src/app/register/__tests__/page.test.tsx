import { render, screen } from "@testing-library/react";
import Page from "../page";

// Mock the Register component
jest.mock("../component/Register", () => {
  return function MockedRegister() {
    return <div data-testid="register-component">Register Component</div>;
  };
});

describe("Registration Page", () => {
  it("renders the Register component", () => {
    render(<Page />);

    const registerComponent = screen.getByTestId("register-component");
    expect(registerComponent).toBeInTheDocument();
    expect(registerComponent).toHaveTextContent("Register Component");
  });
});
