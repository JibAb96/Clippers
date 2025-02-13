"use client"
import React from "react";
import ClipperEngagementImages from "./ClipperEngagementImages";
import ClipperGuidelines from "./ClipperGuidlines";
import ClipperStats from "./ClipperStats";
import { useAppSelector } from "@/app/hooks";

const ClipperSections = () => {
  const user = useAppSelector((state) => state.user)
  if(user.role === "creator"){
    return
  }
  return (
    <div className="flex flex-col gap-10">
      <ClipperEngagementImages />
      <ClipperGuidelines />
      <ClipperStats />
    </div>
  );
};

export default ClipperSections;
