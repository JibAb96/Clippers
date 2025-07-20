"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClipperDetailsStepProps {
  formData: { followerCount: number; pricePerPost: number };
  setFormData: (data: { followerCount: number; pricePerPost: number }) => void;
  onNext: () => void;
  submitting: boolean;
}

const ClipperDetailsStep: React.FC<ClipperDetailsStepProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  submitting 
}) => {
  const [errors, setErrors] = useState<{ followerCount?: string; pricePerPost?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { followerCount?: string; pricePerPost?: string } = {};
    
    if (formData.followerCount < 0 || formData.followerCount > 500000000) {
      newErrors.followerCount = "Follower count must be between 0 and 500,000,000";
    }
    
    if (formData.pricePerPost < 0 || formData.pricePerPost > 500000000) {
      newErrors.pricePerPost = "Price per post must be between 0 and 500,000,000";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  const handleFollowerCountChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, followerCount: numValue }));
    if (errors.followerCount) setErrors(prev => ({ ...prev, followerCount: undefined }));
  };

  const handlePriceChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, pricePerPost: numValue }));
    if (errors.pricePerPost) setErrors(prev => ({ ...prev, pricePerPost: undefined }));
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Clipper Details
        </CardTitle>
        <CardDescription className="text-gray-600">
          Tell us about your following and pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="followerCount" className="text-sm font-medium text-gray-700">
              Follower Count
            </Label>
            <Input
              id="followerCount"
              type="number"
              min="0"
              max="500000000"
              value={formData.followerCount || ""}
              onChange={(e) => handleFollowerCountChange(e.target.value)}
              placeholder="Enter your follower count"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {errors.followerCount && (
              <p className="text-sm text-red-600">{errors.followerCount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerPost" className="text-sm font-medium text-gray-700">
              Price Per Post ($)
            </Label>
            <Input
              id="pricePerPost"
              type="number"
              min="0"
              max="500000000"
              value={formData.pricePerPost || ""}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="Enter your price per post"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {errors.pricePerPost && (
              <p className="text-sm text-red-600">{errors.pricePerPost}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            {submitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClipperDetailsStep;