"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PLATFORMS, type Platform } from "@/lib/google-oauth";

interface SocialMediaStepProps {
  formData: { socialMediaHandle: string; platform: Platform | "" };
  setFormData: (data: any) => void;
  onNext: () => void;
  submitting: boolean;
}

const SocialMediaStep: React.FC<SocialMediaStepProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  submitting 
}) => {
  const [errors, setErrors] = useState<{ handle?: string; platform?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { handle?: string; platform?: string } = {};
    
    if (!formData.socialMediaHandle.trim()) {
      newErrors.handle = "Social media handle is required";
    } else if (formData.socialMediaHandle.length < 3 || formData.socialMediaHandle.length > 50) {
      newErrors.handle = "Handle must be between 3 and 50 characters";
    } else if (!/^[a-zA-Z0-9._]+$/.test(formData.socialMediaHandle)) {
      newErrors.handle = "Handle can only contain letters, numbers, dots, and underscores";
    }
    
    if (!formData.platform) {
      newErrors.platform = "Platform selection is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  const handleHandleChange = (value: string) => {
    setFormData(prev => ({ ...prev, socialMediaHandle: value }));
    if (errors.handle) setErrors(prev => ({ ...prev, handle: undefined }));
  };

  const handlePlatformChange = (value: Platform) => {
    setFormData(prev => ({ ...prev, platform: value }));
    if (errors.platform) setErrors(prev => ({ ...prev, platform: undefined }));
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Social Media Details
        </CardTitle>
        <CardDescription className="text-gray-600">
          Tell us about your social media presence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="handle" className="text-sm font-medium text-gray-700">
              Social Media Handle
            </Label>
            <Input
              id="handle"
              type="text"
              value={formData.socialMediaHandle}
              onChange={(e) => handleHandleChange(e.target.value)}
              placeholder="your_handle"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {errors.handle && (
              <p className="text-sm text-red-600">{errors.handle}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Platform
            </Label>
            <Select 
              value={formData.platform} 
              onValueChange={handlePlatformChange}
              disabled={submitting}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800">
                <SelectValue placeholder="Select your platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PLATFORMS.INSTAGRAM}>Instagram</SelectItem>
                <SelectItem value={PLATFORMS.TIKTOK}>TikTok</SelectItem>
                <SelectItem value={PLATFORMS.YOUTUBE}>YouTube</SelectItem>
                <SelectItem value={PLATFORMS.X}>X (Twitter)</SelectItem>
              </SelectContent>
            </Select>
            {errors.platform && (
              <p className="text-sm text-red-600">{errors.platform}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={submitting || !formData.socialMediaHandle.trim() || !formData.platform}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            {submitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SocialMediaStep;