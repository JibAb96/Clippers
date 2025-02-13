"use client";
import { useAppSelector } from "@/app/hooks";
import React from "react";
const ClipperGuidelines = () => {
  const user = useAppSelector((state) => state.user)
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center">
        Clipper Guidlines
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.guidelines?.map((guideline, index) => (
          <div
            key={index}
            className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-lg mt-1 font-semibold">{guideline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipperGuidelines;
