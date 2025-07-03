import React from "react";
import { FormSectionProps } from "./types";

const ContactSection: React.FC<FormSectionProps> = ({ register, errors }) => {
  return (
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
          id="email"
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
          id="socialMediaHandle"
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
  );
};

export default ContactSection; 