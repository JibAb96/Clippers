"use client";
import React from "react";
import { useAppSelector } from "@/app/hooks"; // Assuming path is correct
import {
  Users,
  DollarSign,
  Mail,
  Link2,
  MapPin,
  Tag,
  TrendingUp,
  Type,
} from "lucide-react"; // Added more icons

interface ProfileSectionProps {
  targetKey: string; // Key to access data from the user object
  sectionTitle: string; // Title to display for the section
}

const iconMap: Record<string, React.ElementType> = {
  default: Type,
  email: Mail,
  followerCount: Users,
  pricePerPost: DollarSign,
  socialMediaHandle: Link2,
  country: MapPin,
  platform: Tag, // Using Tag as a generic platform icon for now
  niche: TrendingUp, // Using TrendingUp for niche
  fullName: Type,
  brandName: Type,
  role: Type,
};

const ProfileSection = ({ targetKey, sectionTitle }: ProfileSectionProps) => {
  const { user: currentUser } = useAppSelector((state) => state.user);

  if (!currentUser) {
    return null; // Or some placeholder if user is not loaded
  }

  const value = currentUser[targetKey as keyof typeof currentUser];
  const IconComponent = iconMap[targetKey] || iconMap.default;

  // Helper function to render value, can be expanded for different types
  const renderValue = (val: unknown, key: string) => {
    if (val === null || val === undefined) {
      return <p className="text-lg mt-1 text-gray-500">Not specified</p>;
    }

    if (key === "platform") {
      const platformMap: Record<string, string> = {
        x: "X (formerly Twitter)",
        youtube: "YouTube",
        instagram: "Instagram",
        tiktok: "TikTok",
      };
      const platformValue = String(val).toLowerCase();
      return (
        <p className="text-lg mt-1">
          {platformMap[platformValue] || platformValue}
        </p>
      );
    }

    if (key === "niche") {
      const nicheStr = String(val);
      // Capitalize first letter, assuming niche values are single words like 'gaming', 'sport'
      return (
        <p className="text-lg mt-1">
          {nicheStr.charAt(0).toUpperCase() + nicheStr.slice(1).toLowerCase()}
        </p>
      );
    }

    if (key === "followerCount" && typeof val === "number") {
      return <p className="text-lg">{val.toLocaleString()}</p>;
    }

    if (key === "pricePerPost" && typeof val === "number") {
      return <p className="text-lg">${val.toFixed(2)}</p>;
    }

    if (typeof val === "object") {
      return <p className="text-lg mt-1">{JSON.stringify(val)}</p>;
    }
    return <p className="text-lg mt-1">{String(val)}</p>;
  };

  return (
    <div className="bg-quarternary rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold p-4 md:p-6 border-b border-gray-200 flex items-center">
        <IconComponent size={22} className="mr-3 text-secondary opacity-80" />
        {sectionTitle}
      </h2>
      <div className="p-4 md:p-6">
        <div className="bg-quarternary border border-gray-100 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              {/* <p className="text-sm font-medium text-secondary">{sectionTitle}</p> */}{" "}
              {/* Title is now a header for the section box */}
              {renderValue(value, targetKey)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
