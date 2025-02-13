"use client";
import { useAppSelector } from "@/app/hooks";
import React from "react";

const ClipperEngagementImages = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {user.engagementImages?.map((image, index) => (
          <div key={index} className="relative aspect-square group">
            <div className="relative h-full overflow-hidden rounded-xl">
              <img
                src={image.src}
                alt={`Engagement ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipperEngagementImages;
