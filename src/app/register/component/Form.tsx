"use client";
import React, { useState } from "react";
import CTAButton from "../../../components/CTAButton";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
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
import NameSection from "./form-sections/NameSection";
import ContactSection from "./form-sections/ContactSection";
import RoleSection from "./form-sections/RoleSection";
import ProfilePictureSection from "./form-sections/ProfilePictureSection";
import PlatformSection from "./form-sections/PlatformSection";
import NicheSection from "./form-sections/NicheSection";
import ClipperSpecificSection from "./form-sections/ClipperSpecificSection";
import LocationSection from "./form-sections/LocationSection";
import PasswordSection from "./form-sections/PasswordSection";

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
      <NameSection register={register} control={control} errors={errors} />

      {/* Email & Social Media Handle Section */}
      <ContactSection register={register} control={control} errors={errors} />

      {/* Role Section */}
      <RoleSection register={register} control={control} errors={errors} />

      {/* Brand Profile Picture Upload */}
      <ProfilePictureSection
        register={register}
        control={control}
        errors={errors}
        fileName={fileName}
        handleFileChange={handleFileChange}
      />

      {/* Platforms Section */}
      <PlatformSection register={register} control={control} errors={errors} />

      {/* Niche Section */}
      <NicheSection register={register} control={control} errors={errors} />

      {/* Clipper Specific Fields */}
      <ClipperSpecificSection
        register={register}
        control={control}
        errors={errors}
        selectedRole={selectedRole}
      />

      {/* Location Section */}
      <LocationSection register={register} control={control} errors={errors} />

      {/* Password Section */}
      <PasswordSection register={register} control={control} errors={errors} />

      {/* Submit Button */}
      <div className="flex justify-center pt-4 mx-auto">
        <CTAButton
          type="submit"
          CustomClass="mb-1"
          AriaLabel="Submit registration"
          disabled={isSubmitting}
        >
          Submit Registration
        </CTAButton>
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
