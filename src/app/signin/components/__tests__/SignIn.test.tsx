import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SignIn from "../SignIn";

// Mock the child components
jest.mock("../Background", () => {
  return function MockBackground({ children }: { children: React.ReactNode }) {
    return <div data-testid="background-component">{children}</div>;
  };
});

jest.mock("../Form", () => {
  return function MockForm() {
    return <div data-testid="form-component">Form Component</div>;
  };
});

// Create a mock store
const mockStore = configureStore({
  reducer: {
    user: (state = {}) => state,
    isOpen: (state = {}) => state,
  },
});

describe("SignIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main elements", () => {
    render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    expect(screen.getByTestId("background-component")).toBeInTheDocument();
    expect(screen.getByTestId("form-component")).toBeInTheDocument();
  });

  it("displays the correct heading text", () => {
    render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    expect(screen.getByText("Access Your Content Hub")).toBeInTheDocument();
    expect(screen.getByText("- Distribute Clips")).toBeInTheDocument();
  });

  it("displays the welcome back title", () => {
    render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  it("displays the descriptive paragraph", () => {
    render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    const description = screen.getByText(
      /Join thousands of creators and clippers/
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("marketplace for video clips");
  });

  it("has correct layout structure", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    // Check for grid layout
    const gridContainer = container.querySelector(".grid.md\\:grid-cols-2");
    expect(gridContainer).toBeInTheDocument();
  });

  it("has correct styling classes for the form container", () => {
    const { container } = render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    const formContainer = container.querySelector(".bg-white.sm\\:shadow-lg");
    expect(formContainer).toBeInTheDocument();
    expect(formContainer).toHaveClass(
      "sm:rounded-xl",
      "px-6",
      "py-8",
      "max-w-md"
    );
  });

  it("renders the secondary text styling correctly", () => {
    render(
      <Provider store={mockStore}>
        <SignIn />
      </Provider>
    );

    const secondaryText = screen.getByText("Access Your Content Hub");
    expect(secondaryText).toHaveClass("text-secondary");
  });
});
