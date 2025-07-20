"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { GoogleOAuthApi } from "@/lib/google-oauth";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "../../../state/User/usersSlice";
import { AppDispatch } from "../../../state/store";
import { Clipper, Creator } from "@/model";
import Background from "../../signin/components/Background";

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");

      if (error) {
        toast({
          title: "Authentication Error",
          description: "Google authentication was cancelled or failed.",
          variant: "destructive",
        });
        router.push("/signin");
        return;
      }

      if (!code) {
        toast({
          title: "Invalid Request",
          description: "No authorization code received from Google.",
          variant: "destructive",
        });
        router.push("/signin");
        return;
      }

      try {
        const result = await GoogleOAuthApi.handleGoogleCallback(
          code,
          state || undefined
        );

        if (result.requiresOnboarding) {
          router.push(`/onboarding?token=${result.onboardingToken}`);
        } else if (result.user && result.token && result.refreshToken) {
          // Use consistent token names
          localStorage.setItem("token", result.token);
          localStorage.setItem("refreshToken", result.refreshToken);

          // Transform the user object to match expected structure
          const transformedUser: Clipper | Creator =
            result.user.role === "clipper"
              ? ({
                  id: result.user.id,
                  email: result.user.email,
                  fullName: result.user.profile.fullName || "",
                  brandName: result.user.profile.brandName || "",
                  socialMediaHandle:
                    result.user.profile.socialMediaHandle || "",
                  platform: result.user.profile.platform || "",
                  niche: result.user.profile.niche || "",
                  country: result.user.profile.country || "",
                  brandProfilePicture:
                    result.user.profile.brandProfilePicture || null,
                  followerCount: result.user.profile.followerCount || 0,
                  pricePerPost: result.user.profile.pricePerPost || 0,
                } as Clipper)
              : ({
                  id: result.user.id,
                  email: result.user.email,
                  fullName: result.user.profile.fullName || "",
                  brandName: result.user.profile.brandName || "",
                  socialMediaHandle:
                    result.user.profile.socialMediaHandle || "",
                  platform: result.user.profile.platform || "",
                  niche: result.user.profile.niche || "",
                  country: result.user.profile.country || "",
                  brandProfilePicture:
                    result.user.profile.brandProfilePicture || null,
                } as Creator);

          // Update Redux store with user info
          dispatch(
            setUser({
              user: transformedUser,
              token: result.token,
              refreshToken: result.refreshToken,
              role: result.user.role as "creator" | "clipper",
            })
          );

          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in.",
          });

          const dashboardPath =
            result.user.role === "creator"
              ? "/dashboard/creator"
              : "/dashboard/clipper";
          router.push(dashboardPath);
        } else {
          throw new Error("Invalid response from authentication service");
        }
      } catch (error) {
        console.error("Google callback error:", error);
        toast({
          title: "Authentication Failed",
          description:
            error instanceof Error
              ? error.message
              : "Failed to authenticate with Google",
          variant: "destructive",
        });
        router.push("/signin");
      }
    };

    handleCallback();
  }, [searchParams, router, toast, dispatch]);

  return (
    <Background>
      <div className="min-h-full flex items-center justify-center p-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authenticating...
          </h2>
          <p className="text-gray-600">
            Please wait while we complete your Google sign-in.
          </p>
        </div>
      </div>
    </Background>
  );
};

export default AuthCallbackPage;
