import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { FormSectionProps, nicheOptions } from "./types";

const NicheSection: React.FC<FormSectionProps> = ({ control, errors }) => {
  return (
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
              id="niche"
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
  );
};

export default NicheSection;
