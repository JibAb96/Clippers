import React from "react";
import { FormSectionProps } from "./types";

const NameSection: React.FC<FormSectionProps> = ({ register, errors }) => {
  return (
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
          id="fullName"
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
          id="brandName"
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
  );
};

export default NameSection; 