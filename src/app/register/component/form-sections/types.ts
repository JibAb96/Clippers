import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Registration } from "@/zodschema/schemas";

export interface FormSectionProps {
  register: UseFormRegister<Registration>;
  control: Control<Registration>;
  errors: FieldErrors<Registration>;
  setValue?: UseFormSetValue<Registration>;
}

export interface FileUploadProps extends FormSectionProps {
  fileName: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ConditionalSectionProps extends FormSectionProps {
  selectedRole: string;
}

export const platformOptions = [
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X" },
  { value: "tiktok", label: "Tiktok" },
];

export const nicheOptions = [
  { value: "gaming", label: "Gaming" },
  { value: "sport", label: "Sport" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "technology", label: "Technology" },
  { value: "fitness", label: "Fitness" },
  { value: "travel", label: "Travel" },
  { value: "entertainment", label: "Entertainment" },
  { value: "food", label: "Food" },
  { value: "other", label: "Other" },
];

export const roleOptions = [
  { value: "creator", label: "Creator" },
  { value: "clipper", label: "Clipper" },
]; 