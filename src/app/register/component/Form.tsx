"use client";
import React, { useState } from "react";
import Select from "react-select";
import CTAButton from "../../../components/CTAButton";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, Registration } from "@/zodschema/schemas";
import { useAppDispatch } from "@/app/hooks";
import { AppDispatch } from "@/state/store";
import {
  registerCreator,
  registerClipper,
} from "../../../state/User/userThunks";
import {
  uploadCreatorImage,
  uploadClipperImage,
} from "../../../state/User/userProfileThunks";
import type { RegistrationApiResponse } from "../../../model";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteCurrentUserAccount } from "@/state/User/profileManagementThunks";

// Options for Platform select, derived from DTO/Schema
const platformOptions = [
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X" },
  { value: "tiktok", label: "Tiktok" },
];

// Options for Niche select, derived from DTO/Schema
const nicheOptions = [
  { value: "gaming", label: "Gaming" },
  { value: "sport", label: "Sport" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "technology", label: "Technology" }, // DTO was "Technology", form had "Tech"
  { value: "fitness", label: "Fitness" },
  { value: "travel", label: "Travel" },
  { value: "entertainment", label: "Entertainment" },
  { value: "food", label: "Food" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "creator", label: "Creator" },
  { value: "clipper", label: "Clipper" },
];

const Form = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Registration>({
    resolver: zodResolver(registrationSchema),
  });

  const selectedRole = useWatch({ control, name: "role" });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      setValue("brandProfilePicture", file, { shouldValidate: true });
    } else {
      setFileName(null);
      setValue("brandProfilePicture", undefined, { shouldValidate: true });
    }
  };
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit: SubmitHandler<Registration> = async (data) => {
    console.log(data);
    const { role, brandProfilePicture, ...apiData } = data;
    // Define expected registration response structure (adjust as needed)
    let registrationResponse: RegistrationApiResponse | undefined;

    try {
      // Step 1: Register Creator or Clipper
      if (role === "creator") {
        registrationResponse = await dispatch(
          registerCreator(apiData as Extract<Registration, { role: "creator" }>)
        ).unwrap();
  
      } else if (role === "clipper") {
        registrationResponse = await dispatch(
          registerClipper(apiData as Extract<Registration, { role: "clipper" }>)
        ).unwrap();
  
      } else {
        console.error("Invalid role selected");
        setError("root", { message: "Invalid role. Please select a role." });
        return;
      }

      // Step 2: Upload Brand Profile Picture if provided and registration was successful
      const token = registrationResponse?.data?.token;
      console.log(
        "Value of brandProfilePicture before upload dispatch:",
        brandProfilePicture
      );
      if (brandProfilePicture && token) {
        try {
          if (role === "creator") {
            await dispatch(
              uploadCreatorImage({ token, imageFile: brandProfilePicture })
            ).unwrap();
          } else if (role === "clipper") {
            await dispatch(
              uploadClipperImage({ token, imageFile: brandProfilePicture })
            ).unwrap();
          }
        } catch (imageUploadError) {
          console.error(
            "Brand profile picture upload failed:",
            imageUploadError
          );
          let uploadErrorMessage = "Image upload failed.";
          if (typeof imageUploadError === "string") {
            uploadErrorMessage = imageUploadError;
          } else if (
            imageUploadError &&
            typeof imageUploadError === "object" &&
            "message" in imageUploadError &&
            typeof (imageUploadError as { message: unknown }).message ===
              "string"
          ) {
            uploadErrorMessage = (imageUploadError as { message: string })
              .message;
          }
          setError("brandProfilePicture", {
            type: "manual",
            message: uploadErrorMessage,
          });
          setError("root", {
            message: "User registered, but profile picture upload failed.",
          });
          localStorage.setItem("token", token);
          dispatch(deleteCurrentUserAccount());
        }
      }
      router.push("/signin");
      
      toast({
        title: "Registration successful",
        description: "You have successfully registered",
      });
      
    } catch (registrationError) {
      console.error("Registration submission error:", registrationError);
      let errorMessage = "Registration failed. Please try again.";
      if (typeof registrationError === "string") {
        errorMessage = registrationError;
      } else if (
        registrationError &&
        typeof registrationError === "object" &&
        "message" in registrationError &&
        typeof (registrationError as { message: unknown }).message === "string"
      ) {
        errorMessage = (registrationError as { message: string }).message;
      }
      setError("root", {
        message: errorMessage,
      });
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      router.push("/register");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            {...register("fullName")}
            type="text"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.fullName && (
            <div className="text-secondary text-sm mt-1">
              {errors.fullName.message}
            </div>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="brandName"
          >
            Brand Name
          </label>
          <input
            {...register("brandName")}
            type="text"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.brandName && (
            <div className="text-secondary text-sm mt-1">
              {errors.brandName.message}
            </div>
          )}
        </div>
      </div>

      {/* Email & Social Media Handle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.email && (
            <div className="text-secondary text-sm mt-1">
              {errors.email.message}
            </div>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="socialMediaHandle"
          >
            Social Media Handle
          </label>
          <input
            {...register("socialMediaHandle")}
            type="text"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="khaby.lame"
          />
          {(errors as { socialMediaHandle?: { message?: string } })
            .socialMediaHandle?.message && (
            <div className="text-secondary text-sm mt-1">
              {
                (errors as { socialMediaHandle?: { message?: string } })
                  .socialMediaHandle?.message
              }
            </div>
          )}
        </div>
      </div>

      {/* Role Section */}
      <div className="grid md:grid-cols-2">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="role"
          >
            I am a
          </label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                value={roleOptions.find(
                  (option) => option.value === field.value
                )}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
                classNamePrefix="react-select"
                placeholder="Select your role..."
              />
            )}
          />
          {errors.role && (
            <div className="text-secondary text-sm mt-1">
              {errors.role.message}
            </div>
          )}
        </div>
      </div>

      {/* Brand Profile Picture Upload */}
      <div className="grid md:grid-cols-2">
        <div>
          <label
            htmlFor="brandProfilePicture"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Brand Profile Picture (Optional, &lt;2MB, .jpg, .png, .webp)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="brandProfilePictureFile"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="brandProfilePictureFile"
                    type="file"
                    className="sr-only"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {fileName && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected file: {fileName}
                </p>
              )}
              <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 2MB</p>
            </div>
          </div>
          {errors.brandProfilePicture && (
            <div className="text-secondary text-sm mt-1">
              {errors.brandProfilePicture.message}
            </div>
          )}
        </div>
      </div>

      {/* Platforms Section - Changed to Single Select */}
      <div className="grid md:grid-cols-2">
        <div>
          <label
            htmlFor="platform"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Platform
          </label>
          <Controller
            name="platform"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={platformOptions}
                value={platformOptions.find(
                  (option) => option.value === field.value
                )}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.platform && (
            <div className="text-secondary text-sm mt-1">
              {errors.platform.message}
            </div>
          )}
        </div>
      </div>

      {/* Niche Section - Adjusted for single string value */}
      <div className="grid md:grid-cols-2">
        <div>
          <label
            htmlFor="niche"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Which best describe your niche:
          </label>
          <Controller
            name="niche"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={nicheOptions}
                value={nicheOptions.find(
                  (option) => option.value === field.value
                )}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.niche && (
            <div className="text-secondary text-sm mt-1">
              {errors.niche.message}
            </div>
          )}
        </div>
      </div>

      {/* Clipper Specific Fields */}
      {selectedRole === "clipper" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t pt-6">
          <div>
            <label
              htmlFor="followerCount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Follower Count
            </label>
            <input
              {...register("followerCount", { valueAsNumber: true })}
              type="number"
              className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {(errors as { followerCount?: { message?: string } }).followerCount
              ?.message && (
              <div className="text-secondary text-sm mt-1">
                {
                  (errors as { followerCount?: { message?: string } })
                    .followerCount?.message
                }
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="pricePerPost"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price Per Post (£)
            </label>
            <input
              {...register("pricePerPost", { valueAsNumber: true })}
              type="number"
              className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {(errors as { pricePerPost?: { message?: string } }).pricePerPost
              ?.message && (
              <div className="text-secondary text-sm mt-1">
                {
                  (errors as { pricePerPost?: { message?: string } })
                    .pricePerPost?.message
                }
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            {...register("country")}
            type="text"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.country && (
            <div className="text-secondary text-sm mt-1">
              {errors.country.message}
            </div>
          )}
        </div>
      </div>

      {/* Password Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            autoComplete="new-password"
            type="password"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.password && (
            <div className="text-secondary text-sm mt-1">
              {errors.password.message}
            </div>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="cPassword"
          >
            Confirm Password
          </label>
          <input
            {...register("cPassword")}
            autoComplete="new-password"
            type="password"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.cPassword && (
            <div className="text-secondary text-sm mt-1">
              {errors.cPassword.message}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4 mx-auto">
        <CTAButton
          type="submit"
          CustomClass="mb-1"
          Text="Submit Registration"
          AriaLabel="Submit registration"
          disabled={isSubmitting}
        />
      </div>
      {errors.root && (
        <div className="text-secondary text-sm mt-1 text-center">
          {errors.root.message}
        </div>
      )}
    </form>
  );
};

export default Form;
