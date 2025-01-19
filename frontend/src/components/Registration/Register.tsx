import React, { useState } from "react";
import Select from "react-select";
import CTAButton from "../Buttons/CTAButton";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  return (
    <div className="pt-32 min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Register Now, Go Viral Tomorrow
            </h2>
            <p className="text-gray-600">
              Please fill out all the fields to complete your registration.
            </p>
          </div>

          <div className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="full_name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="brand_name"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand_name"
                  id="brand_name"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Email & Social Media Handle Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="email@domain.com"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="social_media_handle"
                >
                  Social Media Handle
                </label>
                <input
                  type="text"
                  name="social_media_handle"
                  id="social_media_handle"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="@khaby.lame"
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
                <Select options={role} />
              </div>
            </div>
            {/* Platforms Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Which platforms do you use: (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["X", "YouTube", "Instagram", "TikTok"].map((platform) => (
                  <div key={platform} className="relative">
                    <input
                      type="checkbox" // Changed from radio to checkbox
                      id={platform.toLowerCase()}
                      name="platforms" // Changed to plural to indicate multiple selections
                      value={platform}
                      className="peer hidden"
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which best describe your niche:
                </label>
                <Select options={niche} />
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
                  type="text"
                  name="city"
                  id="city"
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
                  type="text"
                  name="country"
                  id="country"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="zipcode"
                >
                  Zipcode
                </label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
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
                  type="password"
                  name="password"
                  id="password"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="creator_name"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="h-11 border border-gray-300 rounded-md px-4 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 mx-auto">
              <CTAButton
                CustomClass="mb-1"
                Text="Submit Registration"
                AriaLabel="Submit registration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
