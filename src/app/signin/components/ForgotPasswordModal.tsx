"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setForgotPassword } from "@/state/Modal/isOpen";
import Modal from "@/components/Modal";
import { X, Mail, Check } from "lucide-react";
import { supabase } from "@/services/supabase";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.isOpen.forgotPassword);

  const handleClose = () => {
    dispatch(setForgotPassword());
    // Reset state when closing
    setEmail("");
    setIsSubmitted(false);
    setError(null);
  };
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the reset link",
      });
      dispatch(setForgotPassword());
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send password reset email. Please try again.";
      setError(errorMessage);
      dispatch(setForgotPassword());
      toast({
        title: "Password reset email failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Forgot Password?
                </h2>
              </div>
              <p className="text-gray-600">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:border-gray-800 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !isValidEmail(email)}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Didn&apos;t receive the email? Check your spam folder or try
                  again.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
