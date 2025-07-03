import { render, screen } from "@testing-library/react";
import EmptyButton from "../EmptyButton";

describe("EmptyButton", () => {
  it("renders correctly", () => {
    render(<EmptyButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
