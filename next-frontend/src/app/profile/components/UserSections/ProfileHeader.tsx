"use client"
import React from "react";
import { useAppSelector } from "@/app/hooks";

const ProfileHeader = () => {
const user = useAppSelector((state) => state.user)
  return (
    <div className="relative pb-32">
      <div className="absolute inset-0 h-48 bg-[#D20B4E] rounded-xl opacity-95" />
      {/* Profile Header Image*/}
      <div className="relative pt-12">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-4 border-quarternary shadow-lg mx-auto overflow-hidden">
              <img
                src={user.brandImage.src}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold">{user.brand_name}</h1>
          <p className="text-quarternary/90 text-lg font-medium">
            {user.niche}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
