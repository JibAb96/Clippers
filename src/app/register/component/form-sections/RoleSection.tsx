import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { FormSectionProps, roleOptions } from "./types";

const RoleSection: React.FC<FormSectionProps> = ({ control, errors }) => {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        I am a
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              id="role"
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
  );
};

export default RoleSection; 