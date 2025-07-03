import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfilePictureSection from "../../form-sections/ProfilePictureSection";

const mockHandleFileChange = jest.fn();

describe("ProfilePictureSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders file upload section with correct elements", () => {
    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={{}}
        fileName={null}
        handleFileChange={mockHandleFileChange}
      />
    );

    expect(screen.getByText(/Brand Profile Picture/)).toBeInTheDocument();
    expect(screen.getByText("Upload a file")).toBeInTheDocument();
    expect(screen.getByText("PNG, JPG, WEBP up to 2MB")).toBeInTheDocument();
  });

  it("displays selected file name when provided", () => {
    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={{}}
        fileName="test-image.jpg"
        handleFileChange={mockHandleFileChange}
      />
    );

    expect(
      screen.getByText("Selected file: test-image.jpg")
    ).toBeInTheDocument();
  });

  it("calls handleFileChange when file is selected", async () => {
    const user = userEvent.setup();

    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={{}}
        fileName={null}
        handleFileChange={mockHandleFileChange}
      />
    );

    const fileInput = screen.getByLabelText(/brand profile picture/i);
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

    await user.upload(fileInput, file);

    expect(mockHandleFileChange).toHaveBeenCalledTimes(1);
  });

  it("displays validation errors when provided", () => {
    const mockErrors = {
      brandProfilePicture: { message: "File size too large" },
    };

    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={mockErrors}
        fileName={null}
        handleFileChange={mockHandleFileChange}
      />
    );

    expect(screen.getByText("File size too large")).toBeInTheDocument();
  });

  it("has proper file input attributes", () => {
    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={{}}
        fileName={null}
        handleFileChange={mockHandleFileChange}
      />
    );

    const fileInput = screen.getByLabelText(/brand profile picture/i);
    expect(fileInput).toHaveAttribute("type", "file");
    expect(fileInput).toHaveAttribute("accept", ".jpg, .jpeg, .png, .webp");
    expect(fileInput).toHaveAttribute("id", "brandProfilePicture");
  });

  it("renders upload icon", () => {
    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={{}}
        fileName={null}
        handleFileChange={mockHandleFileChange}
      />
    );

    const uploadIcon = screen.getByRole("img", { hidden: true });
    expect(uploadIcon).toBeInTheDocument();
  });

  it("shows file size and format requirements", () => {
    render(
      <ProfilePictureSection
        register={jest.fn()}
        control={{} as any}
        errors={{}}
        fileName={null}
        handleFileChange={mockHandleFileChange}
      />
    );

    expect(screen.getByText("PNG, JPG, WEBP up to 2MB")).toBeInTheDocument();
    expect(
      screen.getByText(/Optional, <2MB, .jpg, .png, .webp/)
    ).toBeInTheDocument();
  });
});
