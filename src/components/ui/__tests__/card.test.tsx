import { render, screen } from "@testing-library/react";
import { Card, CardContent } from "../card";

describe("Card", () => {
  it("renders correctly", () => {
      render(
      <Card>
        <CardContent>Test content</CardContent>
        </Card>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});
