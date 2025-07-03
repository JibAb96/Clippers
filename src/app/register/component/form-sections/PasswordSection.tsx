import React from "react";
import { FormSectionProps } from "./types";

const PasswordSection: React.FC<FormSectionProps> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
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
          id="cPassword"
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
  );
};

export default PasswordSection; 