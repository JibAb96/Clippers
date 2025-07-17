"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Background from "../../signin/components/Background";
import { GoogleOAuthApi, type OnboardingData, type Platform, type Niche } from "@/lib/google-oauth";
import { useToast } from "@/hooks/use-toast";
import RoleSelectionStep from "./steps/RoleSelectionStep";
import BrandNameStep from "./steps/BrandNameStep";
import SocialMediaStep from "./steps/SocialMediaStep";
import NicheLocationStep from "./steps/NicheLocationStep";
import ClipperDetailsStep from "./steps/ClipperDetailsStep";
import PasswordStep from "./steps/PasswordStep";

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

const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    brandName: "",
    socialMediaHandle: "",
    platform: "",
    niche: "",
    country: "",
    followerCount: 0,
    pricePerPost: 0,
    password: ""
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      toast({
        title: "Invalid Access",
        description: "No onboarding token found. Redirecting to sign in.",
        variant: "destructive"
      });
      router.push('/signin');
      return;
    }

    const initializeOnboarding = async () => {
      try {
        const status = await GoogleOAuthApi.getOnboardingStatus(token);
        setOnboardingData({
          onboardingToken: token,
          currentStep: status.currentStep,
          totalSteps: status.totalSteps,
          role: status.role
        });
      } catch (error) {
        console.error('Failed to get onboarding status:', error);
        toast({
          title: "Error",
          description: "Failed to load onboarding data. Please try again.",
          variant: "destructive"
        });
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    initializeOnboarding();
  }, [searchParams, router, toast]);

  const handleRoleSelection = (role: 'creator' | 'clipper') => {
    if (onboardingData) {
      setOnboardingData({
        ...onboardingData,
        role,
        currentStep: 1,
        totalSteps: role === 'clipper' ? 5 : 4
      });
    }
  };

  const processStep = async (stepNumber: number) => {
    if (!onboardingData) return;

    setSubmitting(true);
    try {
      let result;
      
      switch (stepNumber) {
        case 1:
          result = await GoogleOAuthApi.submitOnboardingStep1(
            onboardingData.onboardingToken,
            formData.brandName
          );
          break;
        case 2:
          result = await GoogleOAuthApi.submitOnboardingStep2(
            onboardingData.onboardingToken,
            formData.socialMediaHandle,
            formData.platform as Platform
          );
          break;
        case 3:
          result = await GoogleOAuthApi.submitOnboardingStep3(
            onboardingData.onboardingToken,
            formData.niche as Niche,
            formData.country
          );
          break;
        case 4:
          if (onboardingData.role === 'clipper') {
            result = await GoogleOAuthApi.submitOnboardingStep4Clipper(
              onboardingData.onboardingToken,
              formData.followerCount,
              formData.pricePerPost
            );
          } else {
            return completeOnboarding();
          }
          break;
      }

      if (result?.success) {
        setOnboardingData(prev => prev ? {
          ...prev,
          currentStep: result.currentStep
        } : null);
      }
    } catch (error) {
      console.error(`Step ${stepNumber} failed:`, error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit step",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const completeOnboarding = async () => {
    if (!onboardingData) return;

    setSubmitting(true);
    try {
      const result = await GoogleOAuthApi.completeOnboarding(
        onboardingData.onboardingToken,
        formData.password
      );

      if (result.accessToken && result.refreshToken) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });

        const dashboardPath = onboardingData.role === 'creator' 
          ? '/dashboard/creator' 
          : '/dashboard/clipper';
        router.push(dashboardPath);
      }
    } catch (error) {
      console.error('Onboarding completion failed:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete onboarding",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    if (!onboardingData) return null;

    const stepProps = {
      formData,
      setFormData,
      onNext: () => processStep(onboardingData.currentStep + 1),
      submitting
    };

    switch (onboardingData.currentStep) {
      case 0:
        return (
          <RoleSelectionStep 
            onRoleSelect={handleRoleSelection}
            submitting={submitting}
          />
        );
      case 1:
        return <BrandNameStep {...stepProps} />;
      case 2:
        return <SocialMediaStep {...stepProps} />;
      case 3:
        return <NicheLocationStep {...stepProps} />;
      case 4:
        return onboardingData.role === 'clipper' ? 
          <ClipperDetailsStep {...stepProps} /> :
          <PasswordStep {...stepProps} onComplete={completeOnboarding} />;
      case 5:
        return <PasswordStep {...stepProps} onComplete={completeOnboarding} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  if (loading) {
    return (
      <Background>
        <div className="min-h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="min-h-full flex flex-col items-center justify-center pt-28 lg:pt-8">
        <div className="w-full max-w-md mx-auto">
          {onboardingData && (
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  {Array.from({ length: onboardingData.totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i <= onboardingData.currentStep
                          ? 'bg-gray-800'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Step {onboardingData.currentStep + 1} of {onboardingData.totalSteps}
              </p>
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </Background>
  );
};

export default OnboardingFlow;