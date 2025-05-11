"use client";
import React from "react";
import { useAppSelector } from "@/app/hooks";
import { User as UserIcon } from "lucide-react"; // Corrected: UserProfile -> User
import Image from "next/image"; // Import next/image

// Define a type for the common fields needed by the header
interface CommonHeaderData {
  brandProfilePicture?: string | null;
  brandName?: string;
  fullName?: string;
  niche?: string;
  // Include other fields if userData accesses them directly, e.g. 'role' for creator subtitle if used
}

const ProfileHeader = () => {
  const { user: currentUser, userType } = useAppSelector((state) => state.user);

  if (!currentUser) {
    // Should ideally not happen if UserProfile.tsx already checks
    return null;
  }

  // Cast to the more specific common type for header data
  const userData = currentUser as CommonHeaderData;

  const profileImageUrl: string | null | undefined =
    userData.brandProfilePicture;
  const displayName: string | undefined =
    userData.brandName || userData.fullName;
  const subtitle: string | undefined = userData.niche; // Both interfaces have 'niche'

  // Fallback if essential names are missing
  const finalDisplayName =
    displayName ||
    (userType === "creator" ? userData.fullName : userData.brandName) ||
    "User Profile";

  return (
    <div className="relative pb-32">
      <div className="absolute inset-0 h-48 bg-[#D20B4E] rounded-xl opacity-95" />
      {/* Profile Header Image*/}
      <div className="relative pt-12">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-4 border-quarternary shadow-lg mx-auto overflow-hidden bg-gray-200 flex items-center justify-center">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={`${finalDisplayName} Profile Picture`}
                  width={128}
                  height={128}
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <UserIcon size={64} className="text-gray-500" /> // Fallback icon
              )}
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold">{finalDisplayName}</h1>
          {subtitle && (
            <p className="text-quarternary/90 text-lg font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
