import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import CTAButton from "../CTAButton";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CTAButton Component", () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  const defaultProps = {
    CustomClass: "test-class",
    Text: "Test CTA Button",
    AriaLabel: "Test CTA button label",
  };

  describe("Rendering", () => {
    it("renders the button with correct text", () => {
      render(<CTAButton {...defaultProps} />);
      const button = screen.getByRole("button", {
        name: /test cta button label/i,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Test CTA Button");
    });

    it("applies custom classes correctly", () => {
      render(<CTAButton {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("test-class");
      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("rounded-full");
      expect(button).toHaveClass("bg-gradient-to-r");
    });

    it("has correct default button type", () => {
      render(<CTAButton {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("supports different button types", () => {
      render(<CTAButton {...defaultProps} type="submit" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Accessibility", () => {
    it("has proper aria-label", () => {
      render(<CTAButton {...defaultProps} AriaLabel="Custom CTA aria label" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom CTA aria label");
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      const mockClick = jest.fn();

      render(<CTAButton {...defaultProps} onClick={mockClick} />);
      const button = screen.getByRole("button");

      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Click Events - Function", () => {
    it("calls onClick function when clicked", async () => {
      const user = userEvent.setup();
      const mockClick = jest.fn();

      render(<CTAButton {...defaultProps} onClick={mockClick} />);
      const button = screen.getByRole("button");

      await user.click(button);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("handles multiple clicks correctly", async () => {
      const user = userEvent.setup();
      const mockClick = jest.fn();

      render(<CTAButton {...defaultProps} onClick={mockClick} />);
      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Click Events - Navigation", () => {
    it("navigates to correct route when onClick is a string", async () => {
      const user = userEvent.setup();

      render(<CTAButton {...defaultProps} onClick="/test-route" />);
      const button = screen.getByRole("button");

      await user.click(button);
      expect(mockPush).toHaveBeenCalledWith("/test-route");
    });

    it("handles different route paths", async () => {
      const user = userEvent.setup();
      const routes = ["/dashboard", "/profile", "/settings"];

      for (const route of routes) {
        const { rerender } = render(
          <CTAButton {...defaultProps} onClick={route} />
        );
        const button = screen.getByRole("button");

        await user.click(button);
        expect(mockPush).toHaveBeenCalledWith(route);

        rerender(<div />);
        mockPush.mockClear();
      }
    });
  });

  describe("Disabled State", () => {
    it("renders disabled button correctly", () => {
      render(<CTAButton {...defaultProps} disabled={true} />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const mockClick = jest.fn();

      render(
        <CTAButton {...defaultProps} onClick={mockClick} disabled={true} />
      );
      const button = screen.getByRole("button");

      await user.click(button);
      expect(mockClick).not.toHaveBeenCalled();
    });

    it("does not navigate when disabled", async () => {
      const user = userEvent.setup();

      render(
        <CTAButton {...defaultProps} onClick="/test-route" disabled={true} />
      );
      const button = screen.getByRole("button");

      await user.click(button);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("Props Validation", () => {
    it("handles empty custom class", () => {
      render(<CTAButton {...defaultProps} CustomClass="" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-white");
    });

    it("handles optional custom class", () => {
      render(<CTAButton Text="Test" AriaLabel="Test" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles different text values", () => {
      const testTexts = ["", "Short", "Very Long CTA Button Text Here"];

      testTexts.forEach((text) => {
        const { unmount } = render(<CTAButton {...defaultProps} Text={text} />);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(text);

        // Clean up after each render
        unmount();
      });
    });
  });

  describe("Styling", () => {
    it("applies all expected CSS classes", () => {
      render(<CTAButton {...defaultProps} />);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("rounded-full");
      expect(button).toHaveClass("bg-gradient-to-r");
      expect(button).toHaveClass("from-blue-700");
      expect(button).toHaveClass("to-secondary");
      expect(button).toHaveClass("font-medium");
      expect(button).toHaveClass("text-sm");
      expect(button).toHaveClass("px-3");
      expect(button).toHaveClass("h-12");
      expect(button).toHaveClass("text-center");
    });

    it("combines custom class with default classes", () => {
      render(
        <CTAButton {...defaultProps} CustomClass="custom-cta-style shadow-lg" />
      );
      const button = screen.getByRole("button");

      expect(button).toHaveClass("custom-cta-style");
      expect(button).toHaveClass("shadow-lg");
      expect(button).toHaveClass("text-white");
      expect(button).toHaveClass("bg-gradient-to-r");
    });
  });
});
