"use client";
import React from "react";
import ProfileHeader from "./UserSections/ProfileHeader";
import ProfileSection from "./UserSections/ProfileSection";
import ProfileActionButtons from "./UserSections/ProfileActionButtons";
import ClipperPortfolio from "./ClipperPortfolio";
import { useAppSelector } from "../../hooks";

// Helper function to generate a display title from a key
const formatKeyToTitle = (key: string): string => {
  if (key === "portfolioImages") return "Portfolio"; // Handle special key for title
  const result = key.replace(/([A-Z])/g, " $1"); // Add space before uppercase letters
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase(); // Capitalize first, rest lowercase
};

const UserProfile = () => {
  const { user: currentUser, userType } = useAppSelector((state) => state.user);

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-6 md:pt-2 bg-primary flex items-center justify-center">
        Please log in to view your profile.
      </div>
    );
  }

  let profileDisplaySections: string[] = [];

  if (userType === "clipper") {
    // Fields from ClipperInterface
    profileDisplaySections = [
      "fullName",
      "brandName",
      "email",
      "socialMediaHandle",
      "platform",
      "niche",
      "country",
      "portfolioImages",
      "followerCount",
      "pricePerPost",
      // "brandProfilePicture" is usually in the header, not as a section
    ];
  } else if (userType === "creator") {
    // Fields from CreatorProfileInterface
    profileDisplaySections = [
      "fullName",
      "brandName",
      "email",
      "socialMediaHandle",
      "platform",
      "niche",
      "country",
      // "brandProfilePicture" is usually in the header
    ];
  }

  return (
    <div className="min-h-screen pt-6 md:pt-2 bg-primary">
      <div className="max-w-5xl mx-auto mt-8 bg-quarternary ">
        {/* Header */}
        <ProfileHeader />
        {/* Content */}
        <div className="-mt-32 p-8 flex flex-col gap-8">
          {profileDisplaySections.map((sectionKey) => {
            if (userType === "clipper" && sectionKey === "portfolioImages") {
              // currentUser.id should be the clipperId
              return (
                <ClipperPortfolio
                  key="clipper-portfolio"
                  clipperId={currentUser.id as string}
                />
              );
            }
            // currentUser is guaranteed to be non-null here due to the check above
            // ProfileSection will handle if the specific key doesn't exist or value is null/undefined
            return (
              <ProfileSection
                key={sectionKey}
                targetKey={sectionKey}
                sectionTitle={formatKeyToTitle(sectionKey)}
              />
            );
          })}
          {/* Action Buttons */}
          <ProfileActionButtons />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
