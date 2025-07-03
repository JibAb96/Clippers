import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import LocationSection from "../../form-sections/LocationSection";

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

describe("LocationSection", () => {
  it("renders country field", () => {
    render(
      <TestWrapper>
        <LocationSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("accepts user input for country field", async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <LocationSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const countryInput = screen.getByLabelText("Country");
    await user.type(countryInput, "United Kingdom");

    expect(countryInput).toHaveValue("United Kingdom");
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      country: { message: "Country is required" },
    };

    render(
      <TestWrapper>
        <LocationSection register={jest.fn()} control={{} as any} errors={mockErrors} />
      </TestWrapper>
    );

    expect(screen.getByText("Country is required")).toBeInTheDocument();
  });

  it("has proper form field attributes", () => {
    render(
      <TestWrapper>
        <LocationSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const countryInput = screen.getByLabelText("Country");
    expect(countryInput).toHaveAttribute("type", "text");
    expect(countryInput).toHaveAttribute("id", "country");
  });

  it("applies correct CSS classes", () => {
    render(
      <LocationSection register={jest.fn()} control={{} as any} errors={{}} />
    );

    const countryInput = screen.getByLabelText("Country");
    expect(countryInput).toHaveClass("h-11", "border", "border-gray-300", "rounded-md");
  });

  it("has responsive grid layout", () => {
    render(
      <LocationSection register={jest.fn()} control={{} as any} errors={{}} />
    );

    const gridContainer = screen.getByLabelText("Country").closest(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
  });
}); 