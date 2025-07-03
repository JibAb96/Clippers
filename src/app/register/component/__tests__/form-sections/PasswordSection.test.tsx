import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import PasswordSection from "../../form-sections/PasswordSection";

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<Registration>({
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

describe("PasswordSection", () => {
  it("renders password and confirm password fields", () => {
    render(
      <TestWrapper>
        <PasswordSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("accepts user input for both password fields", async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <PasswordSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await user.type(passwordInput, "Password123");
    await user.type(confirmPasswordInput, "Password123");

    expect(passwordInput).toHaveValue("Password123");
    expect(confirmPasswordInput).toHaveValue("Password123");
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      password: {
        message: "Password must contain at least one letter and one number",
      },
      cPassword: { message: "Passwords do not match" },
    };

    render(
      <TestWrapper>
        <PasswordSection
          register={jest.fn()}
          control={{} as any}
          errors={mockErrors}
        />
      </TestWrapper>
    );

    expect(
      screen.getByText(
        "Password must contain at least one letter and one number"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("has proper form field attributes", () => {
    render(
      <TestWrapper>
        <PasswordSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("id", "password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("id", "cPassword");
  });

  it("has responsive grid layout", () => {
    render(
      <TestWrapper>
        <PasswordSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const gridContainer = screen.getByLabelText("Password").closest(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1", "md:grid-cols-2");
  });

  it("masks password input content", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <PasswordSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "secret123");

    // Password input should have type="password" which masks the input
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveValue("secret123");
  });
});
