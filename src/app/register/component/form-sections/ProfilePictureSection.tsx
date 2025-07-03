import React from "react";
import { FileUploadProps } from "./types";

const ProfilePictureSection: React.FC<FileUploadProps> = ({ 
  errors, 
  fileName, 
  handleFileChange 
}) => {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <label
          htmlFor="brandProfilePicture"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Brand Profile Picture (Optional, &lt;2MB, .jpg, .png, .webp)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="brandProfilePictureFile"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                id="brandProfilePictureFile"
              >
                <span>Upload a file</span>
                <input
                  id="brandProfilePicture"
                  type="file"
                  className="sr-only"
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {fileName && (
              <p className="text-xs text-gray-500 mt-1">
                Selected file: {fileName}
              </p>
            )}
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 2MB</p>
          </div>
        </div>
        {errors.brandProfilePicture && (
          <div className="text-secondary text-sm mt-1">
            {errors.brandProfilePicture.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureSection; 