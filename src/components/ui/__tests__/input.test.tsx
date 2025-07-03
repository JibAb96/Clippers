import { render, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
  });
});
