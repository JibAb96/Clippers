import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import RoleSection from "../../form-sections/RoleSection";

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

describe("RoleSection", () => {
  it("renders role selection text and dropdown", () => {
    render(
      <TestWrapper>
        <RoleSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    expect(screen.getByText("I am a")).toBeInTheDocument();
    expect(screen.getByText("Select your role...")).toBeInTheDocument();
  });

  it("shows role options when dropdown is opened", async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <RoleSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const selectContainer = screen.getByRole("combobox");
    await user.click(selectContainer);

    expect(screen.getByText("Creator")).toBeInTheDocument();
    expect(screen.getByText("Clipper")).toBeInTheDocument();
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      role: { message: "Role is required" },
    };

    render(
      <TestWrapper>
        <RoleSection register={jest.fn()} control={{} as any} errors={mockErrors} />
      </TestWrapper>
    );

    expect(screen.getByText("Role is required")).toBeInTheDocument();
  });

  it("has proper select attributes", () => {
    render(
      <TestWrapper>
        <RoleSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveAttribute("id", "role");
  });
}); 