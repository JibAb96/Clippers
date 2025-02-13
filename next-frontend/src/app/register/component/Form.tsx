"use client"
import React from "react";
import Select from "react-select";
import CTAButton from "../../../components/CTAButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const Form = () => {
  const schema = z
    .object({
      name: z.string().min(1, "Name is required"),
      brandName: z.string().min(1, "Brand name is required"),
      emailAddress: z.string().email("Invalid email address"),
      socialMediaHandle: z.string().optional(),
      role: z.object({
        value: z.string().min(1, "Role value is required"),
        label: z.string().min(1, "Role label is required"),
      }),
      platform: z.array(z.string()).min(1, "At least one platform is required"),
      niche: z.object({
        value: z.string().min(1, "Niche value is required"),
        label: z.string().min(1, "Niche label is required"),
      }),
      city: z.string().min(1, "City is required"),
      country: z.string().min(1, "Country is required"),
      password: z
        .string()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one letter, one number, and be at least 8 characters long"
        ),
      cPassword: z.string(),
    })
    .refine((data) => data.password === data.cPassword, {
      message: "Passwords do not match",
      path: ["cPassword"],
    });

  type Registration = z.infer<typeof schema>;
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Registration>({ resolver: zodResolver(schema) });

  const role = [
    { value: "clipper", label: "Clipper" },
    { value: "creator", label: "Creator" },
  ];

  const niche = [
    { value: "entertainment", label: "Entertainment" },
    { value: "sport", label: "Sport" },
    { value: "food", label: "Food" },
    { value: "fashion", label: "Fashion" },
    { value: "beauty", label: "Beauty" },
    { value: "tech", label: "Tech" },
  ];

  const onSubmit: SubmitHandler<Registration> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch {
      setError("root", {
        message: "There was a server side error, please try again later",
      });
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
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
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Email & Social Media Handle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="emailAddress"
          >
            Email Address
          </label>
          <input
            {...register("emailAddress")}
            type="email"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.emailAddress && (
            <div className="text-secondary">{errors.emailAddress.message}</div>
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
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="khaby.lame"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue={role[0]}
            render={({ field }) => (
              <Select
                {...field}
                options={role}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.label}
              />
            )}
          />
        </div>
      </div>
      {/* Platforms Section */}
      <div className="space-y-3">
        <label
          htmlFor="platform"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          Which platforms do you use: (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["X", "YouTube", "Instagram", "TikTok"].map((platform) => (
            <div key={platform} className="relative">
              <input
                type="checkbox"
                id={platform.toLowerCase()}
                value={platform}
                className="peer hidden"
                {...register("platform")}
              />
              <label
                htmlFor={platform.toLowerCase()}
                className="block cursor-pointer select-none rounded-lg border border-gray-300 p-3 text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition-colors"
              >
                {platform}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Niche Section */}
      <div className="grid md:grid-cols-2">
        <div className="space-y-3">
          <label
            htmlFor="niche"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Which best describe your niche:
          </label>
          <Controller
            name="niche"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={niche}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.label}
              />
            )}
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            {...register("city")}
            type="text"
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
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
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
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
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
         {errors.password && (
          <div className="text-secondary">{errors.password.message}</div>
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
            className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.cPassword && (
            <div className="text-secondary">{errors.cPassword.message}</div>
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
      {errors.root && (<div className="text-secondary">{errors.root.message}</div>)}
    </form>
  );
};

export default Form;
