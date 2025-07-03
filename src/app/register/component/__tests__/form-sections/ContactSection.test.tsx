import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import ContactSection from "../../form-sections/ContactSection";

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

describe("ContactSection", () => {
  it("renders email and social media handle fields", () => {
    render(
      <TestWrapper>
        <ContactSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Social Media Handle")).toBeInTheDocument();
  });

  it("accepts user input for both fields", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ContactSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText("Email Address");
    const handleInput = screen.getByLabelText("Social Media Handle");

    await user.type(emailInput, "test@example.com");
    await user.type(handleInput, "testhandle");

    expect(emailInput).toHaveValue("test@example.com");
    expect(handleInput).toHaveValue("testhandle");
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      email: { message: "Invalid email address" },
      socialMediaHandle: { message: "Social media handle is required" },
    };

    render(
      <TestWrapper>
        <ContactSection
          register={jest.fn()}
          control={{} as any}
          errors={mockErrors}
        />
      </TestWrapper>
    );

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(
      screen.getByText("Social media handle is required")
    ).toBeInTheDocument();
  });

  it("has proper form field attributes", () => {
    render(
      <TestWrapper>
        <ContactSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText("Email Address");
    const handleInput = screen.getByLabelText("Social Media Handle");

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("id", "email");
    expect(handleInput).toHaveAttribute("type", "text");
    expect(handleInput).toHaveAttribute("id", "socialMediaHandle");
    expect(handleInput).toHaveAttribute("placeholder", "khaby.lame");
  });

  it("displays the placeholder text", () => {
    render(
      <TestWrapper>
        <ContactSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const handleInput = screen.getByLabelText("Social Media Handle");
    expect(handleInput).toHaveAttribute("placeholder", "khaby.lame");
  });
});
