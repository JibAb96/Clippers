import React from "react";
import { HiMenu, HiUser } from "react-icons/hi";

const NavigationButton = () => {
  return (
    <div className="flex cursor-pointer items-center gap-2 border border-gray-200 rounded-full px-2 py-1.5 hover:shadow-md transition-shadow w-24 h-14 justify-center">
      <HiMenu className="h-4 w-4 text-gray-800" />
      <div className="h-4 w-[1px] bg-gray-200"></div>
      <div className="flex items-center justify-center h-6 w-6 bg-gray-500 rounded-full text-white">
        <HiUser className="h-4 w-4" />
      </div>
    </div>
  );
};

export default NavigationButton;
