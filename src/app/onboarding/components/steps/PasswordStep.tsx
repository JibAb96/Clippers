"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Platform, type Niche } from "@/lib/google-oauth";

interface FormData {
  brandName: string;
  socialMediaHandle: string;
  platform: Platform | "";
  niche: Niche | "";
  country: string;
  followerCount: number;
  pricePerPost: number;
  password: string;
}

interface PasswordStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onComplete: () => void;
  submitting: boolean;
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  formData,
  setFormData,
  onComplete,
  submitting,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one letter and one number";
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onComplete();
  };

  const handlePasswordChange = (value: string) => {
    setFormData((prev) => ({ ...prev, password: value }));
    if (errors.password)
      setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Create Your Password
        </CardTitle>
        <CardDescription className="text-gray-600">
          Choose a secure password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Enter your password"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500">
              Must be at least 8 characters with letters and numbers
            </p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              placeholder="Confirm your password"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting || !formData.password || !confirmPassword}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            {submitting ? "Creating Account..." : "Complete Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordStep;
