import React from "react";
import { ConditionalSectionProps } from "./types";

const ClipperSpecificSection: React.FC<ConditionalSectionProps> = ({
  register,
  errors,
  selectedRole,
}) => {
  if (selectedRole !== "clipper") {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t pt-6">
      <div>
        <label
          htmlFor="followerCount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Follower Count
        </label>
        <input
          {...register("followerCount", { valueAsNumber: true })}
          id="followerCount"
          type="number"
          className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {(errors as { followerCount?: { message?: string } }).followerCount
          ?.message && (
          <div className="text-secondary text-sm mt-1">
            {
              (errors as { followerCount?: { message?: string } }).followerCount
                ?.message
            }
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="pricePerPost"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Price Per Post (£)
        </label>
        <input
          id="pricePerPost"
          {...register("pricePerPost", { valueAsNumber: true })}
          type="number"
          className="h-11 border border-gray-300 rounded-md px-4 w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {(errors as { pricePerPost?: { message?: string } }).pricePerPost
          ?.message && (
          <div className="text-secondary text-sm mt-1">
            {
              (errors as { pricePerPost?: { message?: string } }).pricePerPost
                ?.message
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default ClipperSpecificSection;
