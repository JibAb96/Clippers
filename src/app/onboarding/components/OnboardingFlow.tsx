"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Background from "../../signin/components/Background";
import { GoogleOAuthApi, type Platform, type Niche } from "@/lib/google-oauth";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "../../../state/User/usersSlice";
import { AppDispatch } from "../../../state/store";
import { Clipper, Creator } from "@/model";
import RoleSelectionStep from "./steps/RoleSelectionStep";
import { markUserAsJustOnboarded } from "../../../hooks/useTutorialTrigger";

interface OnboardingCompletionResponse {
  user: Creator | Clipper;
  role: "creator" | "clipper";
  token: string;
  refreshToken: string;
}
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

interface OnboardingState {
  onboardingToken: string;
  currentStep: number;
  totalSteps: number;
  role: "creator" | "clipper" | "";
}

const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    onboardingToken: "",
    currentStep: 0,
    totalSteps: 4,
    role: "",
  });
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
    password: "",
  });

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast({
        title: "Invalid Access",
        description: "No onboarding token found. Redirecting to sign in.",
        variant: "destructive",
      });
      router.push("/signin");
      return;
    }

    // Validate the token exists but don't get step status since we're managing steps locally
    const validateToken = async () => {
      try {
        // Just verify the token is valid
        await GoogleOAuthApi.getOnboardingStatus(token);
        setOnboardingState((prev) => ({
          ...prev,
          onboardingToken: token,
        }));
      } catch (error) {
        console.error("Invalid onboarding token:", error);
        toast({
          title: "Invalid Token",
          description:
            "Your onboarding session has expired. Please sign in again.",
          variant: "destructive",
        });
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [searchParams, router, toast]);

  const handleRoleSelection = (role: "creator" | "clipper") => {
    setOnboardingState((prev) => ({
      ...prev,
      role,
      currentStep: 1,
      totalSteps: role === "clipper" ? 5 : 4,
    }));
  };

  const goToNextStep = () => {
    setOnboardingState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const completeOnboarding = async () => {
    if (!onboardingState.onboardingToken) return;

    // Validate all required fields are filled
    const { brandName, socialMediaHandle, platform, niche, country, password } =
      formData;

    if (!brandName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a brand name.",
        variant: "destructive",
      });
      return;
    }

    if (!socialMediaHandle.trim() || !platform) {
      toast({
        title: "Missing Information",
        description: "Please provide your social media handle and platform.",
        variant: "destructive",
      });
      return;
    }

    if (!niche || !country.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select your niche and provide your country.",
        variant: "destructive",
      });
      return;
    }

    if (
      onboardingState.role === "clipper" &&
      (formData.followerCount <= 0 || formData.pricePerPost <= 0)
    ) {
      toast({
        title: "Missing Information",
        description: "Please provide your follower count and price per post.",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please create a password.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Prepare the complete onboarding data
      const onboardingData = {
        onboardingToken: onboardingState.onboardingToken,
        role: onboardingState.role,
        brandName: formData.brandName,
        socialMediaHandle: formData.socialMediaHandle,
        platform: formData.platform as Platform,
        niche: formData.niche as Niche,
        country: formData.country,
        password: formData.password,
        ...(onboardingState.role === "clipper" && {
          followerCount: formData.followerCount,
          pricePerPost: formData.pricePerPost,
        }),
      };

      const result = (await GoogleOAuthApi.completeOnboarding(
        onboardingData
      )) as unknown as OnboardingCompletionResponse;

      if (result.user && result.token && result.refreshToken && result.role) {
        // Use consistent token names with auth callback
        localStorage.setItem("token", result.token);
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userType", result.role);

        // Update Redux store with user info
        dispatch(
          setUser({
            user: result.user,
            token: result.token,
            refreshToken: result.refreshToken,
            role: result.role,
          })
        );

        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });

        // Mark user as just onboarded to trigger tutorial
        markUserAsJustOnboarded();

        // Redirect to role-specific dashboard for better UX
        const dashboardPath =
          result.role === "creator"
            ? "/dashboard/creator"
            : "/dashboard/clipper";
        router.push(dashboardPath);
      }
    } catch (error) {
      console.error("Onboarding completion failed:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to complete onboarding",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      setFormData,
      onNext: goToNextStep,
      submitting,
    };

    switch (onboardingState.currentStep) {
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
        return onboardingState.role === "clipper" ? (
          <ClipperDetailsStep {...stepProps} />
        ) : (
          <PasswordStep {...stepProps} onComplete={completeOnboarding} />
        );
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
          {onboardingState.role && (
            <div className="mb-6 text-center p-10">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  {Array.from(
                    { length: onboardingState.totalSteps },
                    (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i <= onboardingState.currentStep
                            ? "bg-gray-800"
                            : "bg-gray-300"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Step {onboardingState.currentStep + 1} of{" "}
                {onboardingState.totalSteps}
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
