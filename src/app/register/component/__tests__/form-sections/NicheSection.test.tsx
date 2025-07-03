import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import NicheSection from "../../form-sections/NicheSection";

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

describe("NicheSection", () => {
  it("renders niche selection label", () => {
    render(
      <TestWrapper>
        <NicheSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    expect(
      screen.getByText("Which best describe your niche:")
    ).toBeInTheDocument();
  });

  it("shows niche options when dropdown is opened", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <NicheSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const selectElement = screen.getByRole("combobox");
    await user.click(selectElement);

    expect(screen.getByText("Gaming")).toBeInTheDocument();
    expect(screen.getByText("Sport")).toBeInTheDocument();
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      niche: { message: "Niche is required" },
    };

    render(
      <TestWrapper>
        <NicheSection
          register={jest.fn()}
          control={{} as any}
          errors={mockErrors}
        />
      </TestWrapper>
    );

    expect(screen.getByText("Niche is required")).toBeInTheDocument();
  });

  it("has proper select attributes", () => {
    render(
      <TestWrapper>
        <NicheSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveAttribute("id", "niche");
  });

  it("shows all available niche options", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <NicheSection register={jest.fn()} control={{} as any} errors={{}} />
      </TestWrapper>
    );

    const selectElement = screen.getByRole("combobox");
    await user.click(selectElement);

    const expectedNiches = [
      "Gaming",
      "Sport",
      "Fashion",
      "Beauty",
      "Technology",
      "Fitness",
      "Travel",
      "Entertainment",
      "Food",
      "Other",
    ];

    expectedNiches.forEach((niche) => {
      expect(screen.getByText(niche)).toBeInTheDocument();
    });
  });
});
