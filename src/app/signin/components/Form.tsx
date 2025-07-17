"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginCreator, loginClipper } from "../../../state/User/userThunks";
import { RootState, AppDispatch } from "../../../state/store";
import { setForgotPassword } from "../../../state/Modal/isOpen";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { GoogleOAuthApi } from "@/lib/google-oauth";
import { useToast } from "@/hooks/use-toast";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userType, setUserType] = useState<"creator" | "clipper">("creator");
  const [googleLoading, setGoogleLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { toast } = useToast();
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

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { authUrl } = await GoogleOAuthApi.getGoogleOAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Google sign-in failed:', error);
      toast({
        title: "Google Sign-In Failed",
        description: error instanceof Error ? error.message : "Failed to initiate Google sign-in",
        variant: "destructive"
      });
      setGoogleLoading(false);
    }
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "Connecting..." : "Sign in with Google"}
          </button>
        </div>
      </form>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal />
    </>
  );
};

export default Form;
