"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/state/store";
import { getCurrentUserProfile } from "@/state/User/profileManagementThunks";
import { Loader2 } from "lucide-react"; // For loading spinner
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // ShadCN Alert
// Removed unused Card imports since they're not being used in the code
import ProfileDisplaySection from "./components/ProfileDisplaySection";
import ProfileUpdateFormSection from "./components/ProfileUpdateFormSection";
import ProfileImageManagementSection from "./components/ProfileImageManagementSection";
import PortfolioManagementSection from "./components/PortfolioManagementSection"; // Clipper specific
import AccountSettingsSection from "./components/AccountSettingsSection";
import { Clipper } from "../../model"; // Import Clipper type

const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const {
    user,
    userType,
    loading: userLoading, // General loading for user slice (includes getCurrentUserProfile)
    error: userError,
    portfolioImages, // For Clippers, managed in userSlice
    portfolioLoading,
    portfolioError,
  } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    // Fetch profile only if user data isn't already available or needs refresh
    // Consider if token exists as well before dispatching
    if (!user) {
      // Or some other condition to re-fetch if needed
      dispatch(getCurrentUserProfile());
    }
  }, [dispatch, user]);

  if (userLoading && !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading your profile...</p>
      </div>
    );
  }

  if (userError && !user) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load your profile: {userError}. Please try refreshing the
            page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user || !userType) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>User Not Found</AlertTitle>
          <AlertDescription>
            Could not find user information. You might need to log in again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // At this point, user and userType should be available
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>

      <ProfileDisplaySection user={user} userType={userType} />

      <ProfileImageManagementSection user={user} userType={userType} />

      <ProfileUpdateFormSection user={user} userType={userType} />

      {userType === "clipper" && (
        <PortfolioManagementSection
          clipperUser={user as Clipper} // More specific type assertion
          portfolioImages={portfolioImages || []}
          loading={portfolioLoading || false}
          error={portfolioError || null} // Ensure it's string | null
        />
      )}

      <AccountSettingsSection />
    </div>
  );
};

export default UserProfilePage;
