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
import { OnboardingFormData } from "../types";

interface BrandNameStepProps {
  formData: OnboardingFormData;
  setFormData: Dispatch<SetStateAction<OnboardingFormData>>;
  onNext: () => void;
  submitting: boolean;
}

const BrandNameStep: React.FC<BrandNameStepProps> = ({
  formData,
  setFormData,
  onNext,
  submitting,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.brandName.trim()) {
      setError("Brand name is required");
      return;
    }

    if (formData.brandName.length < 2 || formData.brandName.length > 50) {
      setError("Brand name must be between 2 and 50 characters");
      return;
    }

    setError("");
    onNext();
  };

  const handleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, brandName: value }));
    if (error) setError("");
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          What&apos;s your brand name?
        </CardTitle>
        <CardDescription className="text-gray-600">
          This will be displayed on your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="brandName"
              className="text-sm font-medium text-gray-700"
            >
              Brand Name
            </Label>
            <Input
              id="brandName"
              type="text"
              value={formData.brandName}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter your brand name"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={submitting || !formData.brandName.trim()}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            {submitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BrandNameStep;
