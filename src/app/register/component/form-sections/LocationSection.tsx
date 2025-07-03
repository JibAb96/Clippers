import React from "react";
import { FormSectionProps } from "./types";

const LocationSection: React.FC<FormSectionProps> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="country"
        >
          Country
        </label>
        <input
          id="country"
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
  );
};

export default LocationSection; 