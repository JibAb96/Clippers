"use client";
import React from "react";
import Image from "next/image";
import { Clip, ClipStatus } from "../../../state/Clips/clipsSlice"; // Assuming Clip and ClipStatus are exported from clipsSlice
import { useAppDispatch } from "@/app/hooks";
import { setSubmittedClip } from "@/state/Modal/isOpen"; // This is for opening the modal
import { setSelectedClip } from "../../../state/Clips/clipsSlice"; // Correct action for selected clip state
// Here we have the structure of the cards of each clip that will be displayed. Styled with
// tailwindcss.

const DashboardCard = ({ clip }: { clip: Clip }) => {
  const dispatch = useAppDispatch();
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
    dispatch(setSubmittedClip()); // Opens the modal (assuming this is its role)
    dispatch(setSelectedClip(clip)); // Sets the selected clip in our new clipsSlice state
  };

  return (
    <div
      className="max-w-72 rounded cursor-pointer sm:max-w-[17.5rem]"
      onClick={onClick}
    >
      <div className="relative h-56">
        <Image
          className="object-cover rounded-2xl"
          src={clip.thumbnailUrl}
          alt={"This is a a thumbnail for the clip " + clip.id}
          fill
        />
      </div>
      <div className="px-1 py-4">
        <div className={`text-xl ${statusStyle} font-bold py-1 inline-block`}>
          {statusText}
        </div>
        <div>
          <div className="font-semibold text-xl">{clip.status}</div>
          <div className="font-medium text-l text-tertiary">
            {clip.creatorId}
          </div>
          <div className="font-medium text-l">{clip.creatorId}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
