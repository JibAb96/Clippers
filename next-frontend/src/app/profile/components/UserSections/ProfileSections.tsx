"use client";
import React from "react";
import { Profile } from "../../../../../model";
import CreatorSections from "./ProfileSection";
import PlatformsSection from "./PlatformsSection";
import { useAppSelector } from "@/app/hooks";
const UserProfileSection = ({ targetKey }: { targetKey: keyof Profile }) => {
  const user = useAppSelector((state) => state.user); 
  const sectionTitle: string = `${targetKey
    .charAt(0)
    .toUpperCase()}${targetKey.slice(1)}`;

  const value = user[targetKey as keyof Profile];

  if (value === undefined || value === null) {
    return null;
  }

  // Check the type and render appropriate component
  switch (typeof value) {
    case "string":
      return <CreatorSections sectionTitle={sectionTitle} value={value} />;

    case "object":
      if (Array.isArray(value)) {
        if (targetKey === "socialMediaHandles") {
          return <PlatformsSection profile={user}/>;
        }
      }
    default:
      return null;
  }
};

export default UserProfileSection;
