"use client";
import React, { useState } from "react";
import { HiMenu, HiUser } from "react-icons/hi";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../hooks";
import Modal from "@/components/Modal";
import LogoutModal from "./LogoutModal";
import { setLogout } from "@/state/Modal/isOpen";
// Navigation button created using tailwind css and react icons

const NavigationButton = () => {
  // Toggle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, userType, token } = useAppSelector((state) => state.user);
  const open = useAppSelector((state) => state.isOpen.logout);
  const dispatch = useAppDispatch();


    const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    closeDropdown();
  };

  const isSignedIn = !!token && !!user;

  return (
    <div>
      <div className="flex-end">
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1.5 hover:shadow-md transition-shadow w-24 h-14 justify-center"
          aria-label="navigation button"
        >
          <HiMenu className="h-4 w-4 text-gray-800" aria-hidden="false" />
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <div className="flex items-center justify-center h-6 w-6 bg-gray-500 rounded-full text-white">
            <HiUser className="h-4 w-4" aria-hidden="false" />
          </div>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdown"
            className="z-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-5"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  onClick={closeDropdown}
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeDropdown}
                  href="/find-clippers"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Find A Clipper
                </Link>
              </li>
              {isSignedIn ? (
                <ul>
                  {userType === "creator" ? (
                    <li>
                      <Link
                        onClick={closeDropdown}
                        href="/dashboard/creator"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Creator Dashboard
                      </Link>
                    </li>
                  ) : userType === "clipper" ? (
                    <li>
                      <Link
                        onClick={closeDropdown}
                        href="/dashboard/clipper"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Clipper Dashboard
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <Link
                      onClick={closeDropdown}
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Log Out
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link
                      onClick={closeDropdown}
                      href="/register"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={closeDropdown}
                      href="/signin"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        )}
      </div>
      <Modal isOpen={open}>
        <LogoutModal />
      </Modal>
    </div>
  );
};

export default NavigationButton;
