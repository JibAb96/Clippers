"use client";
import React, { useEffect } from "react";
import {
  X,
  Play,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { setSubmittedClip } from "@/state/Modal/isOpen";
import { ClipStatus } from "@/state/Clips/clipsSlice";
import { updateClipStatus } from "@/state/Clips/clipsThunks";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { selectClipperProfileById, selectCreatorProfileById } from "@/state/UserLookup/userLookupSlice";


const SubmittedClip = () => {
  const dispatch = useAppDispatch();
  const clip = useAppSelector((state) => state.clips.selectedClip);
  const { userType } = useAppSelector((state) => state.user);
  const { statusUpdateLoading } = useAppSelector((state) => state.clips);
  const creatorProfile = useAppSelector((state) =>
selectCreatorProfileById(state, (clip?.creatorId || ""))
    );
  const clipperProfile = useAppSelector((state) =>
      selectClipperProfileById(state, (clip?.clipperId || ""))
    );

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(setSubmittedClip());
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(setSubmittedClip());
  };

  const handleStatusUpdate = async (status: ClipStatus) => {
    if (!clip) return;

    try {
      await dispatch(
        updateClipStatus({
          clipId: clip.id,
          status: status,
        })
      ).unwrap();
      // Optionally close modal after successful update
      // dispatch(setSubmittedClip());
    } catch (error) {
      console.error("Failed to update clip status:", error);
    }
  };

  const getStatusConfig = (status: ClipStatus) => {
    switch (status) {
      case ClipStatus.APPROVED:
        return {
          text: "Posted",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-200",
        };
      case ClipStatus.REJECTED:
        return {
          text: "Rejected",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-200",
        };
      case ClipStatus.PENDING:
        return {
          text: "Pending Review",
          variant: "secondary" as const,
          className: "bg-blue-100 text-blue-800 border-blue-200",
        };
      default:
        return {
          text: String(status),
          variant: "outline" as const,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  };

  const profile = userType === "clipper" ? creatorProfile : clipperProfile;

  if (!clip) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No clip selected</p>
      </div>
    );
  }

  const statusConfig = getStatusConfig(clip.status);
  const isClipper = userType === "clipper";
  const isPending = clip.status === ClipStatus.PENDING;
  const showActionButtons = isClipper && isPending;

  return (
    <div className="relative max-w-6xl mx-auto p-6">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCloseModal}
        className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        aria-label="Close modal"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Video Section */}
        <div className="space-y-4">
          <div className="relative">
            <div className="aspect-[9/16] max-w-sm mx-auto bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                controls
                className="w-full h-full object-cover"
                poster={clip.thumbnailUrl}
              >
                <source src={clip.clipUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Status Badge Overlay */}
            <div className="absolute top-4 left-4">
              <Badge
                variant={statusConfig.variant}
                className={`${statusConfig.className} font-semibold px-3 py-1`}
              >
                {statusConfig.text}
              </Badge>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Clip Details</h2>
              <Badge variant="outline" className="text-xs">
                ID: {clip.id.slice(-8)}
              </Badge>
            </div>

            {/* Profile Information */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.brandProfilePicture || undefined} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile.brandName || "..."}
                </p>
                <p className="text-xs text-gray-500">{userType === "clipper" ? "Creator" : "Clipper"}</p>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {clip.description || "No description provided"}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <InfoItem
                      icon={<Calendar className="h-4 w-4" />}
                      label="Created"
                      value={new Date(clip.createdAt).toLocaleDateString()}
                    />
                    <InfoItem
                      icon={<Calendar className="h-4 w-4" />}
                      label="Last Updated"
                      value={new Date(clip.updatedAt).toLocaleDateString()}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Status Message */}
          {!showActionButtons && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                      Need Help?
                    </h4>
                    <p className="text-sm text-blue-700">
                      For any enquiries concerning this clip, email us at{" "}
                      <a
                        href="mailto:clippers@gmail.com"
                        className="font-medium underline hover:no-underline"
                      >
                        clippers@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons for Creators with Pending Clips */}
          {showActionButtons && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-amber-900">
                    Review Required
                  </h4>
                  <p className="text-sm text-amber-700 mb-4">
                    This clip is pending your review. Please approve or reject
                    it.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleStatusUpdate(ClipStatus.APPROVED)}
                      disabled={statusUpdateLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {statusUpdateLoading ? "Updating..." : "Approve & Post"}
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(ClipStatus.REJECTED)}
                      disabled={statusUpdateLoading}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {statusUpdateLoading ? "Updating..." : "Reject"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for info rows
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center space-x-2 text-gray-600">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm text-gray-900 font-medium">{value}</span>
  </div>
);

export default SubmittedClip;
