"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Clip, ClipStatus } from "../../../state/Clips/clipsSlice"; // Assuming Clip and ClipStatus are exported from clipsSlice
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSubmittedClip } from "@/state/Modal/isOpen"; // This is for opening the modal
import { setSelectedClip } from "../../../state/Clips/clipsSlice"; // Correct action for selected clip state

import {
  getCreatorProfileById,
  getClipperProfileById,
} from "@/state/UserLookup/userLookupThunks";
import {
  selectCreatorProfileById,
  selectClipperProfileById,
} from "@/state/UserLookup/userLookupSlice";

// Here we have the structure of the cards of each clip that will be displayed. Styled with
// tailwindcss.

const DashboardCard = ({ clip }: { clip: Clip }) => {
  const dispatch = useAppDispatch();
  const { userType } = useAppSelector((state) => state.user);
  // Selectors for profile by ID
  const creatorProfile = useAppSelector((state) =>
    selectCreatorProfileById(state, clip.creatorId)
  );
  const clipperProfile = useAppSelector((state) =>
    selectClipperProfileById(state, clip.clipperId)
  );
  const creatorsLoading = useAppSelector(
    (state) => state.creatorProfile.loading
  );
  const clippersLoading = useAppSelector(
    (state) => state.clipperProfile.loading
  );
  const creatorsError = useAppSelector(
    (state) => state.creatorProfile.error
  );
  const clippersError = useAppSelector(
    (state) => state.clipperProfile.error
  );

  useEffect(() => {
    if (userType === "clipper" && clip.creatorId && !creatorProfile) {
      dispatch(getCreatorProfileById(clip.creatorId));
    } else if (userType === "creator" && clip.clipperId && !clipperProfile) {
      dispatch(getClipperProfileById(clip.clipperId));
    }
  }, [
    dispatch,
    userType,
    clip.creatorId,
    clip.clipperId,
    creatorProfile,
    clipperProfile,
  ]);

  // Function to set bg color corresponding with status
  const getStatusTextAndColor = (status: ClipStatus) => {
    switch (status) {
      case ClipStatus.APPROVED: // "approved"
        return { text: "Posted", color: "text-green-700" };
      case ClipStatus.REJECTED: // "rejected"
        return { text: "Rejected", color: "text-red-600" };
      case ClipStatus.PENDING: // "pending"
        // Differentiating for display purposes if needed, though headings handle it mostly
        // For the card itself, "Pending" is clear.
        return { text: "Pending", color: "text-[#187AA0]" };
      default:
        // Fallback for any other statuses that might exist or if clip.status is not strictly one of the enums
        const statusStr = status as string;
        if (
          statusStr.toLowerCase() === "scheduled" ||
          statusStr.toLowerCase() === "ready for upload"
        ) {
          return {
            text: statusStr.charAt(0).toUpperCase() + statusStr.slice(1),
            color: "text-[#B44800]",
          };
        }
        return { text: statusStr, color: "text-gray-400" };
    }
  };
  const { text: statusText, color: statusStyle } = getStatusTextAndColor(
    clip.status
  );

  const onClick = () => {
    dispatch(setSubmittedClip()); // Opens the modal
    dispatch(setSelectedClip(clip)); // Sets the selected clip in our new clipsSlice state
  };

  const profile = userType === "clipper" ? creatorProfile : clipperProfile;
  const isLoadingProfile =
    userType === "clipper" ? creatorsLoading : clippersLoading;
  const profileError = userType === "clipper" ? creatorsError : clippersError;

  return (
    <div
      className="w-full max-w-[320px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Thumbnail container - optimized for vertical content */}
      <div className="relative w-full h-[400px] bg-gray-100">
        <Image
          className="object-cover"
          src={clip.thumbnailUrl}
          alt={`Thumbnail for clip ${clip.id}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Status badge overlay */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold bg-white/90 backdrop-blur-sm ${statusStyle}`}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-5">
        <div className="space-y-3">
          {/* Clip title/description */}
          <div>
            <h3
              className="font-bold text-lg text-gray-900 leading-tight line-clamp-2"
              title={clip.title}
            >
              {clip.title || "Clip Title Placeholder"}
            </h3>
          </div>

          {/* Profile information */}
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              {profile?.brandProfilePicture ? (
                <Image
                  className="w-full h-full object-cover rounded-full"
                  src={profile.brandProfilePicture}
                  alt={`${profile.brandName || "Profile"} picture`}
                  width={32}
                  height={32}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              {isLoadingProfile ? (
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ) : profileError ? (
                <span className="text-red-500 text-sm">
                  Unable to find user name
                </span>
              ) : profile?.brandName ? (
                <span className="text-gray-600 font-medium truncate block">
                  {profile.brandName}
                </span>
              ) : (
                <span className="text-gray-500 text-sm truncate block">
                  {userType === "clipper"
                    ? `Creator ${clip.creatorId}`
                    : `Clipper ${clip.clipperId}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
