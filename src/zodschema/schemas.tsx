"use client";
import { z } from "zod";

// Define Platform and Niche enums/types based on DTO
const platformValues = ["youtube", "instagram", "x", "tiktok"] as const;
const PlatformEnum = z.enum(platformValues, {
  errorMap: () => ({
    message: 'Platform must be either "YouTube", "Instagram", "X", or "Tiktok"',
  }),
});

const nicheValues = [
  "gaming",
  "sport",
  "fashion",
  "beauty",
  "technology",
  "fitness",
  "travel",
  "entertainment",
  "food",
  "other",
] as const;
const NicheEnum = z.enum(nicheValues, {
  errorMap: () => ({
    message:
      'Niche must be from "Gaming", "Sport", "Fashion", "Beauty", "Technology", "Fitness", "Travel", "Entertainment", "Food", or "Other"',
  }),
});

// Base schema for fields common to both roles
const commonRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters")
    .nonempty("Full name is required"),
  brandName: z
    .string()
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name must be at most 50 characters")
    .nonempty("Brand name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .min(2, "Email must be at least 2 characters")
    .max(100, "Email must be at most 100 characters") // Accommodating DTO MaxLength
    .nonempty("Email is required"),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be at most 50 characters")
    .nonempty("Country is required"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and be at least 8 characters long"
    )
    .nonempty("Password is required"),
  cPassword: z.string().nonempty("Confirm password is required"),
  socialMediaHandle: z.string().nonempty("Social media handle is required").regex(
    /^[a-zA-Z0-9._-]{3,50}$/, "Social media handle must be 3-50 characters long and can include letters, numbers, dots, underscores, and hyphens."),
  brandProfilePicture: z
    .instanceof(File, { message: "Please upload a file." })
    .optional()
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024, // 2MB
      `File size should be less than 2MB.`
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

// Schema for Creator role
const creatorSchema = commonRegistrationSchema.extend({
  role: z.literal("creator"),
  platform: PlatformEnum,
  niche: NicheEnum,
});

// Schema for Clipper role
const clipperSchema = commonRegistrationSchema.extend({
  role: z.literal("clipper"),
  platform: PlatformEnum,
  niche: NicheEnum,
  followerCount: z
    .number({ invalid_type_error: "Follower count must be a number" })
    .min(0, "Follower count cannot be negative")
    .max(500000000, "Follower count too high"),
  pricePerPost: z
    .number({ invalid_type_error: "Price per post must be a number" })
    .min(0, "Price per post cannot be negative")
    .max(500000000, "Price per post too high"),
});

// Discriminated union schema for registration
export const registrationSchema = z
  .discriminatedUnion("role", [creatorSchema, clipperSchema])
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"], // Path for the error on the discriminated union
  });

export type Registration = z.infer<typeof registrationSchema>;

export const profileFormSchema = z.object({
  brand_image: z
    .union([z.instanceof(File), z.string().url()])
    .optional()
    .default(""),
  name: z.string().min(1, "Name is required"),
  brand_name: z.string().min(1, "Brand name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["clipper", "creator"]),
  socialMediaHandles: z.object({
    platform: z.string(),
    handle: z.string().optional().default(""),
  }),
  niche: z.string().min(1, "Niche is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  guidelines: z.array(z.string().optional()).optional(),
  followers: z.number().optional(),
  pricePerPost: z.number().min(0, "Price must be positive").optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
