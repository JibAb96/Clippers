"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginCreator, loginClipper } from "../../../state/User/userThunks";
import { RootState, AppDispatch } from "../../../state/store";
import { setForgotPassword } from "../../../state/Modal/isOpen";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState<"creator" | "clipper">("creator");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    loading,
    error,
    user,
    userType: loggedInUserType,
  } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userType === "creator") {
      dispatch(loginCreator(formData));
    } else {
      dispatch(loginClipper(formData));
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(setForgotPassword());
  };

  useEffect(() => {
    if (user && !loading && !error && loggedInUserType) {
      if (loggedInUserType === "creator") {
        router.push("/dashboard/creator");
      } else if (loggedInUserType === "clipper") {
        router.push("/dashboard/clipper"); 
      } else {
        router.push("/");
      }
    }
  }, [user, loading, error, loggedInUserType, router]);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Log in as:
          </label>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setUserType("creator")}
              className={`px-4 py-2 border border-gray-300 text-sm font-medium 
                              ${
                                userType === "creator"
                                  ? "bg-gray-800 text-white z-10 ring-2 ring-gray-700"
                                  : "bg-white text-gray-700 hover:bg-gray-50"
                              }
                              rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150 ease-in-out`}
            >
              Creator
            </button>
            <button
              type="button"
              onClick={() => setUserType("clipper")}
              className={`-ml-px px-4 py-2 border border-gray-300 text-sm font-medium 
                              ${
                                userType === "clipper"
                                  ? "bg-gray-800 text-white z-10 ring-2 ring-gray-700"
                                  : "bg-white text-gray-700 hover:bg-gray-50"
                              }
                              rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150 ease-in-out`}
            >
              Clipper
            </button>
          </div>
        </div>

        <div>
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
            placeholder="Email address"
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
            placeholder="Password"
          />
        </div>
        <div className="text-sm text-right">
          <a
            href="#"
            onClick={handleForgotPassword}
            className="text-secondary font-semibold hover:underline"
          >
            Forgot your password?
          </a>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-100 border border-red-400 p-3 rounded-md">
            {error ===
            "There was an internal server error during login process."
              ? "Invalid email or password."
              : error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </form>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal />
    </>
  );
};

export default Form;
