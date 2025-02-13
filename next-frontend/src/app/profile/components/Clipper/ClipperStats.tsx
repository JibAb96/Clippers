"use client";
import React from "react";
import { followersDisplay } from "../../../components/ClipperCard";
import { useAppSelector } from "@/app/hooks";


const ClipperStats = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Clipper Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium">Followers</h3>
          <p className="mt-2 text-3xl font-bold text-secondary">
            {followersDisplay(user.followers || 0)}
          </p>
        </div>
        <div className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium">Price Per Post</h3>

          <p className="mt-2 text-3xl font-bold text-secondary">
            £{user.pricePerPost}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClipperStats;
