"use client";
import React, { useState } from "react";
import Select from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import CTAButton from "@/components/CTAButton";
import { Card } from "@/components/ui/card";
import {
  Form as FormUI,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileFormData, profileFormSchema } from "@/zodschema/schemas";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ImageUploadState, validateImage } from "./handleImages";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setProfileForm } from "@/state/Modal/isOpen";
import EmptyButton from "@/components/EmptyButton";
import { updateProfile } from "@/state/User/user";

const ProfileUpdateForm = () => {
  const profile = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [brandImage, setBrandImage] = useState<ImageUploadState>({
    file: null,
    preview: profile.thumbnail || "",
    uploading: false,
    error: null,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      brand_name: profile.brand_name,
      email: profile.email,
      role: profile.role,
      socialMediaHandles: profile.socialMediaHandles,
      niche: profile.niche,
      city: profile.city,
      country: profile.country,
      guidelines: profile.guidelines,
      followers: profile.followers,
      pricePerPost: profile.price,
    },
  });

  const niche = [
    { value: "entertainment", label: "Entertainment" },
    { value: "sport", label: "Sport" },
    { value: "food", label: "Food" },
    { value: "fashion", label: "Fashion" },
    { value: "beauty", label: "Beauty" },
    { value: "tech", label: "Tech" },
  ];
  const platforms = [
    { value: "Youtube", label: "Youtube" },
    { value: "X", label: "X" },
    { value: "Instagram", label: "Instagram" },
    { value: "TikTok", label: "TikTok" },
  ];
  const { toast } = useToast();
  const handleBrandImageUpload = async (file: File) => {
    const error = validateImage(file);
    if (error) {
      setBrandImage((prev) => ({ ...prev, error }));
      return;
    }

    setBrandImage((prev) => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      error: null,
    }));
    toast({
      title: "Brand image uploaded",
      description: "Your brand image has been successfully uploaded.",
    });
  };

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data);
    dispatch(setProfileForm());
    dispatch(
      updateProfile({
        ...data,
        brand_image: profile.thumbnail, // Keep old image if no new file
      })
    );
  };
  return (
    <Card className="p-6">
      <FormUI {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Image Section */}
            <div className="mb-8">
              <FormLabel>Brand Image</FormLabel>
              <div className="mt-2 space-y-4">
                {brandImage.preview && (
                  <div className="relative w-32 h-32">
                    <Image
                      src={brandImage.preview}
                      alt="Brand preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    {brandImage.uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="brand_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file); // Pass the file to react-hook-form
                              handleBrandImageUpload(file);
                            }
                          }}
                          className="cursor-pointer"
                          disabled={brandImage.uploading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name Field */}
            <FormField
              control={form.control}
              name="brand_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Media Handles */}
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Controller
                name="socialMediaHandles.platform"
                control={form.control}
                render={({ field }) => (
                  <Select
                    options={platforms}
                    value={platforms.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(option) => field.onChange(option?.value)}
                    onBlur={field.onBlur}
                    isDisabled={form.formState.isSubmitting}
                  />
                )}
              />
              {form.formState.errors.niche && (
                <FormMessage>{form.formState.errors.niche.message}</FormMessage>
              )}
            </FormItem>
            <FormField
              control={form.control}
              name="socialMediaHandles.handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Niche Field */}
          <FormItem>
            <FormLabel>Niche</FormLabel>
            <Controller
              name="niche"
              control={form.control}
              render={({ field }) => (
                <Select
                  options={niche}
                  value={niche.find((option) => option.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
                  onBlur={field.onBlur}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />
            {form.formState.errors.niche && (
              <FormMessage>{form.formState.errors.niche.message}</FormMessage>
            )}
          </FormItem>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Clipper-specific fields */}
          {profile.role === "clipper" && (
            <>
              {/* Guidelines */}
              <div className="space-y-4">
                <FormLabel>Guidelines (up to 4)</FormLabel>
                {[0, 1, 2, 3].map((index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`guidelines.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder={`Guideline ${index + 1}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Followers */}
              <FormField
                control={form.control}
                name="followers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Followers</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Per Post */}
              <FormField
                control={form.control}
                name="pricePerPost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Per Post</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <CTAButton
              type="submit"
              disabled={form.formState.isSubmitting}
              Text={
                form.formState.isSubmitting ? "Updating..." : "Update Profile"
              }
              AriaLabel="Update profile submit button"
            />
            <EmptyButton
              CustomClass="bg-black text-white w-fit"
              Text="Cancel"
              AriaLabel="Close Form Modal"
              onClick={() => dispatch(setProfileForm())}
            />
          </div>

          {form.formState.errors.root && (
            <p className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </FormUI>
    </Card>
  );
};

export default ProfileUpdateForm;
