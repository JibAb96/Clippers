import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import ClipperSpecificSection from "../../form-sections/ClipperSpecificSection";

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { register, control, formState: { errors } } = useForm<Registration>({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form>
      {React.cloneElement(children as React.ReactElement, {
        register,
        control,
        errors,
      })}
    </form>
  );
};

describe("ClipperSpecificSection", () => {
  it("renders nothing when role is not clipper", () => {
    const { container } = render(
      <ClipperSpecificSection 
        register={jest.fn()} 
        control={{} as any} 
        errors={{}} 
        selectedRole="creator"
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders clipper fields when role is clipper", () => {
    render(
      <ClipperSpecificSection 
        register={jest.fn()} 
        control={{} as any} 
        errors={{}} 
        selectedRole="clipper"
      />
    );

    expect(screen.getByLabelText("Follower Count")).toBeInTheDocument();
    expect(screen.getByLabelText("Price Per Post (£)")).toBeInTheDocument();
  });

  it("accepts user input for clipper fields", async () => {
    const user = userEvent.setup();
    
    render(
      <ClipperSpecificSection 
        register={jest.fn()} 
        control={{} as any} 
        errors={{}} 
        selectedRole="clipper"
      />
    );

    const followerInput = screen.getByLabelText("Follower Count");
    const priceInput = screen.getByLabelText("Price Per Post (£)");

    await user.type(followerInput, "10000");
    await user.type(priceInput, "50");

    expect(followerInput).toHaveValue(10000);
    expect(priceInput).toHaveValue(50);
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      followerCount: { message: "Follower count must be a number" },
      pricePerPost: { message: "Price must be positive" },
    };

    render(
      <ClipperSpecificSection 
        register={jest.fn()} 
        control={{} as any} 
        errors={mockErrors} 
        selectedRole="clipper"
      />
    );

    expect(screen.getByText("Follower count must be a number")).toBeInTheDocument();
    expect(screen.getByText("Price must be positive")).toBeInTheDocument();
  });

  it("has proper form field attributes", () => {
    render(
      <TestWrapper>
        <ClipperSpecificSection 
          register={jest.fn()} 
          control={{} as any} 
          errors={{}} 
          selectedRole="clipper"
        />
      </TestWrapper>
    );

    const followerInput = screen.getByLabelText("Follower Count");
    const priceInput = screen.getByLabelText("Price Per Post (£)");

    expect(followerInput).toHaveAttribute("type", "number");
    expect(followerInput).toHaveAttribute("id", "followerCount");
    expect(priceInput).toHaveAttribute("type", "number");
    expect(priceInput).toHaveAttribute("id", "pricePerPost");
  });

  it("has border styling when clipper role is selected", () => {
    render(
      <TestWrapper>
        <ClipperSpecificSection 
          register={jest.fn()} 
          control={{} as any} 
          errors={{}} 
          selectedRole="clipper"
        />
      </TestWrapper>
    );

    const container = screen.getByLabelText("Follower Count").closest(".grid");
    expect(container).toHaveClass("border-t", "pt-6", "mt-6");
  });

  it("handles different selectedRole values correctly", () => {
    const { rerender } = render(
      <TestWrapper>
        <ClipperSpecificSection 
          register={jest.fn()} 
          control={{} as any} 
          errors={{}} 
          selectedRole=""
        />
      </TestWrapper>
    );

    expect(screen.queryByLabelText("Follower Count")).not.toBeInTheDocument();

    rerender(
      <TestWrapper>
        <ClipperSpecificSection 
          register={jest.fn()} 
          control={{} as any} 
          errors={{}} 
          selectedRole="clipper"
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Follower Count")).toBeInTheDocument();
  });
}); 