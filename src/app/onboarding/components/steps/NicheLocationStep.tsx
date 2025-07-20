"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NICHES, type Niche } from "@/lib/google-oauth";

interface NicheLocationStepProps {
  formData: { niche: Niche | ""; country: string };
  setFormData: (data: { niche: Niche | ""; country: string }) => void;
  onNext: () => void;
  submitting: boolean;
}

const NicheLocationStep: React.FC<NicheLocationStepProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  submitting 
}) => {
  const [errors, setErrors] = useState<{ niche?: string; country?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { niche?: string; country?: string } = {};
    
    if (!formData.niche) {
      newErrors.niche = "Niche selection is required";
    }
    
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    } else if (formData.country.length < 2 || formData.country.length > 50) {
      newErrors.country = "Country must be between 2 and 50 characters";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
    if (errors.country) setErrors(prev => ({ ...prev, country: undefined }));
  };

  const handleNicheChange = (value: Niche) => {
    setFormData(prev => ({ ...prev, niche: value }));
    if (errors.niche) setErrors(prev => ({ ...prev, niche: undefined }));
  };

  const getNicheDisplayName = (niche: string) => {
    return niche.charAt(0).toUpperCase() + niche.slice(1);
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Your Niche & Location
        </CardTitle>
        <CardDescription className="text-gray-600">
          Help us understand your content focus and location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Content Niche
            </Label>
            <Select 
              value={formData.niche} 
              onValueChange={handleNicheChange}
              disabled={submitting}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800">
                <SelectValue placeholder="Select your niche" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(NICHES).map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {getNicheDisplayName(niche)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.niche && (
              <p className="text-sm text-red-600">{errors.niche}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-gray-700">
              Country
            </Label>
            <Input
              id="country"
              type="text"
              value={formData.country}
              onChange={(e) => handleCountryChange(e.target.value)}
              placeholder="Enter your country"
              className="bg-gray-50 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
              disabled={submitting}
            />
            {errors.country && (
              <p className="text-sm text-red-600">{errors.country}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={submitting || !formData.niche || !formData.country.trim()}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            {submitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NicheLocationStep;