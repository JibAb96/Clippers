import { render, screen } from "@testing-library/react";
import Background from "../Background";

describe("Background Component", () => {
  it("renders children correctly", () => {
    render(
      <Background>
        <div data-testid="test-child">Test Child Content</div>
      </Background>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });

  it("renders the animated circles", () => {
    const { container } = render(
      <Background>
        <div>Content</div>
      </Background>
    );

    // Check if the circles container exists
    const circlesContainer = container.querySelector(".circles");
    expect(circlesContainer).toBeInTheDocument();

    // Check if all 10 circles are rendered
    const circles = container.querySelectorAll(".circles li");
    expect(circles).toHaveLength(10);
  });

  it("has correct CSS classes for background area", () => {
    const { container } = render(
      <Background>
        <div>Content</div>
      </Background>
    );

    const backgroundDiv = container.firstChild;
    expect(backgroundDiv).toHaveClass(
      "area",
      "min-h-screen",
      "flex",
      "flex-col",
      "relative"
    );
  });

  it("has correct CSS classes for content wrapper", () => {
    const { container } = render(
      <Background>
        <div data-testid="content">Content</div>
      </Background>
    );

    const contentWrapper = screen.getByTestId("content").parentElement;
    expect(contentWrapper).toHaveClass("relartive", "z-10", "flex-1");
  });

  it("renders multiple children correctly", () => {
    render(
      <Background>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </Background>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByTestId("child-3")).toBeInTheDocument();
  });
});
