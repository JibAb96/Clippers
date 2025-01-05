import React from "react";
import { HiMenu, HiUser } from "react-icons/hi";

// Navigation button created using tailwind css and react icons

const NavigationButton = () => {
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };
  return (
    <div className="flex-end">
      <button
        id="dropdownButton"
        onClick={toggleDropdown}
        type="button"
        className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1.5 hover:shadow-md transition-shadow w-24 h-14 justify-center"
      >
        <HiMenu className="h-4 w-4 text-gray-800" />
        <div className="h-4 w-[1px] bg-gray-200"></div>
        <div className="flex items-center justify-center h-6 w-6 bg-gray-500 rounded-full text-white">
          <HiUser className="h-4 w-4" />
        </div>
      </button>
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-5"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="/"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Find A Clipper
            </a>
          </li>
          <li>
            <a
              href="."
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Register
            </a>
          </li>
          <li>
            <a
              href="/signin"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationButton;
