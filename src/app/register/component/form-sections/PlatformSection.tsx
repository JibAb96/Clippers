import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { FormSectionProps, platformOptions } from "./types";

const PlatformSection: React.FC<FormSectionProps> = ({ control, errors }) => {
  return (
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
              id="platform"
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
  );
};

export default PlatformSection; 