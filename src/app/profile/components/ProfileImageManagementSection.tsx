"use client";
import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // For file input
import { Loader2, UploadCloud, Trash2, UserCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/state/store";
import {
  uploadCreatorProfileImage,
  uploadClipperProfileImage,
  deleteCreatorProfileImage,
  deleteClipperProfileImage,
} from "@/state/User/profileManagementThunks";
import { Creator, Clipper, IDeleteImage } from "../../../model";
import { useToast } from "@/hooks/use-toast"; // Import custom hook
import { Alert, AlertDescription } from "@/components/ui/alert";

// Combine with specific types if needed, or use a more generic approach
// if Creator and Clipper have significantly different structures beyond these core fields.
// For this component, we mainly care about brandName, fullName, and brandProfilePicture.

interface Props {
  user: Creator | Clipper; // Ensures these core props are expected
  userType: "creator" | "clipper";
}

const ProfileImageManagementSection: React.FC<Props> = ({ user, userType }) => {
  const { toast } = useToast(); // Use the custom hook
  const dispatch = useAppDispatch();
  const {
    imageUploadLoading,
    imageUploadError,
    // user object itself from props might be stale after an update,
    // so rely on the one from selector for the most current image URL if possible,
    // or ensure the parent page re-fetches/re-renders with updated user prop.
    // For simplicity, we use the user prop and Redux handles updating its source.
  } = useAppSelector((state: RootState) => state.user);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const currentProfilePictureUrl = (user as Clipper | Creator)
    .brandProfilePicture;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "No file selected.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    let uploadAction;
    if (userType === "creator") {
      uploadAction = uploadCreatorProfileImage(formData);
    } else if (userType === "clipper") {
      uploadAction = uploadClipperProfileImage(formData);
    } else {
      toast({
        title: "Error",
        description: "Invalid user type for image upload.",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(uploadAction).unwrap();
      toast({
        title: "Success",
        description: "Profile picture uploaded successfully!",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload profile picture.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async () => {
    if (!currentProfilePictureUrl) {
      toast({ title: "Info", description: "No profile picture to delete." });
      return;
    }
    if (!user.brandName) {
      toast({
        title: "Error",
        description: "Brand name is missing, cannot delete image.",
        variant: "destructive",
      });
      return;
    }
    const deleteDto: IDeleteImage = { brandName: user.brandName };

    let deleteAction;
    if (userType === "creator") {
      deleteAction = deleteCreatorProfileImage(deleteDto);
    } else if (userType === "clipper") {
      deleteAction = deleteClipperProfileImage(deleteDto);
    } else {
      toast({
        title: "Error",
        description: "Invalid user type for image deletion.",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(deleteAction).unwrap();
      toast({
        title: "Success",
        description: "Profile picture deleted successfully!",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete profile picture.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const displayImageUrl = previewUrl || currentProfilePictureUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Manage your profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32 border-2 border-muted">
            {displayImageUrl ? (
              <AvatarImage
                src={displayImageUrl}
                alt={user.brandName || user.fullName || "Profile"}
              />
            ) : (
              <UserCircle className="h-full w-full text-muted-foreground p-2" /> // Placeholder Icon
            )}
            <AvatarFallback className="text-4xl">
              {getInitials(user.brandName || user.fullName)}
            </AvatarFallback>
          </Avatar>

          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden" // Hide the default input
            id="profilePictureInput"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-xs"
          >
            <UploadCloud className="mr-2 h-4 w-4" />{" "}
            {selectedFile ? "Change File" : "Select Image"}
          </Button>
          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {imageUploadError && (
          <Alert variant="destructive">
            <AlertDescription>{imageUploadError}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || imageUploadLoading}
            className="flex-1"
          >
            {imageUploadLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-4 w-4" />
            )}
            Upload New Picture
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteImage}
            disabled={!currentProfilePictureUrl || imageUploadLoading} // Also disable if an upload is in progress
            className="flex-1"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete Current Picture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageManagementSection;
