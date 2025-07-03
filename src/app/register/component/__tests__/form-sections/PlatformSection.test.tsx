import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import PlatformSection from "../../form-sections/PlatformSection";

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

describe("PlatformSection", () => {
  it("renders platform selection label", () => {
    render(
      <TestWrapper>
        <PlatformSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    expect(screen.getByText("Platform")).toBeInTheDocument();
  });

  it("shows platform options when dropdown is opened", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <PlatformSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const selectElement = screen.getByRole("combobox");
    await user.click(selectElement);

    expect(screen.getByText("YouTube")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("Tiktok")).toBeInTheDocument();
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      platform: { message: "Platform is required" },
    };

    render(
      <TestWrapper>
        <PlatformSection
          register={jest.fn()}
          control={{} as any}
          errors={mockErrors}
        />
      </TestWrapper>
    );

    expect(screen.getByText("Platform is required")).toBeInTheDocument();
  });
});
