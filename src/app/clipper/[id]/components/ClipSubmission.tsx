"use client";
import React, { useState, useRef, useEffect, memo } from "react";
import Image from "next/image";
import { X, Loader, ImagePlus, Video, AlertTriangle } from "lucide-react";
import { setClipSubmission } from "@/state/Modal/isOpen";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useToast } from "@/hooks/use-toast";
// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { submitClip } from "@/state/Clips/clipsThunks";

// Completely separate FilePreviewArea component with memoization
const FilePreviewArea = memo(
  ({
    id,
    inputRef,
    onChange,
    previewUrl,
    Icon,
    accept,
    label,
    currentFile,
    maxSizeMB,
    aspectRatioText,
    error,
    imageDimensions,
    onRemove,
  }: {
    id: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string;
    Icon: React.ElementType;
    accept: string;
    label: string;
    currentFile: File | null;
    maxSizeMB: number;
    aspectRatioText: string;
    error?: string;
    imageDimensions?: { width: number; height: number } | null;
    onRemove: () => void;
  }) => {
    // Using a separate component prevents re-renders from parent state changes
    return (
      <div className="space-y-3">
        <Label htmlFor={id} className={error ? "text-destructive" : ""}>
          {label} <span className="text-destructive">*</span>
        </Label>
        <div
          className={`flex flex-col items-center justify-center w-full h-80 lg:h-96 border-2 ${
            error ? "border-destructive" : "border-border"
          } border-dashed rounded-lg ${
            currentFile ? "cursor-default" : "cursor-pointer"
          } bg-card ${
            !currentFile && !error ? "hover:border-primary/70" : ""
          } transition-colors`}
          onClick={() => !currentFile && inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full w-full">
            {previewUrl && currentFile ? (
              accept.startsWith("video/") ? (
                <video
                  src={previewUrl}
                  className="h-full w-auto rounded-md object-contain max-w-full"
                  controls
                />
              ) : imageDimensions && previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  className="max-h-full w-auto rounded-md object-contain"
                />
              ) : previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview loading..."
                  width={400}
                  height={600}
                  className="max-h-full w-auto rounded-md object-contain"
                />
              ) : null
            ) : (
              <>
                <Icon className="w-12 h-12 lg:w-14 lg:h-14 mb-4 text-muted-foreground" />
                <p className="mb-2 text-base lg:text-lg text-muted-foreground font-medium">
                  Click to upload
                </p>
                <p className="text-sm lg:text-base text-muted-foreground text-center px-4">
                  {aspectRatioText}. Max {maxSizeMB}MB.
                </p>
              </>
            )}
          </div>
          <input
            id={id}
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={onChange}
          />
        </div>
        {previewUrl && currentFile && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={onRemove}
          >
            Remove {accept.startsWith("video/") ? "Video" : "Thumbnail"}
          </Button>
        )}
        {error && (
          <p className="text-sm font-medium text-destructive flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            {error}
          </p>
        )}
      </div>
    );
  }
);
FilePreviewArea.displayName = "FilePreviewArea";

type Props = {
  clipperId: string;
};

type FormDataType = {
  videoFile: File | null;
  thumbnailFile: File | null;
  creatorId: string;
  clipperId: string;
};

// Constants for validation
const MAX_VIDEO_FILE_SIZE_MB = 50;
const MAX_THUMBNAIL_FILE_SIZE_MB = 2; // Max 2MB for thumbnail
const TARGET_ASPECT_RATIO = 9 / 16; // 9:16 as ideal
const ASPECT_RATIO_TOLERANCE = 0.15; // To allow more phone formats

const ClipSubmission = ({ clipperId }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const [textFields, setTextFields] = useState({
    title: "",
    description: "",
  });
  const [formData, setFormData] = useState<FormDataType>({
    videoFile: null,
    thumbnailFile: null,
    creatorId: user?.id || "",
    clipperId: clipperId,
  });

  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState("");
  const [thumbnailDimensions, setThumbnailDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailFileInputRef = useRef<HTMLInputElement | null>(null);
  const submitClipLoading = useAppSelector(
    (state) => state.clips.submitLoading
  );
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitClipLoading) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitClipLoading]);

  const clearError = (field: string) => {
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setError = (field: string, message: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: message }));
  };

  // Helper to get video dimensions
  const getVideoDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve({ width: video.videoWidth, height: video.videoHeight });
      };
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(
          new Error(
            "Failed to load video metadata. Please ensure it's a valid video file."
          )
        );
      };
      video.src = URL.createObjectURL(file);
    });
  };

  // Helper to get image dimensions
  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img: HTMLImageElement = new window.Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(
          new Error(
            "Failed to load image metadata. Please ensure it's a valid image file."
          )
        );
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Function to validate aspect ratio
  const isAspectRatioValid = (width: number, height: number): boolean => {
    if (height === 0) return false;
    const aspectRatio = width / height;
    return (
      Math.abs(aspectRatio - TARGET_ASPECT_RATIO) <= ASPECT_RATIO_TOLERANCE
    );
  };

  // Handle video file selection
  const handleVideoFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const fieldName = "videoFile";
    clearError(fieldName);

    if (!file.type.startsWith("video/")) {
      setError(fieldName, "Invalid file type. Please select a video.");
      if (e.target) e.target.value = "";
      return;
    }

    const maxSizeInBytes = MAX_VIDEO_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(
        fieldName,
        `File too large. Max size: ${MAX_VIDEO_FILE_SIZE_MB}MB`
      );
      if (e.target) e.target.value = "";
      return;
    }

    try {
      const { width, height } = await getVideoDimensions(file);
      if (!isAspectRatioValid(width, height)) {
        setError(
          fieldName,
          "Invalid aspect ratio. Please use vertical format (portrait orientation)."
        );
        if (e.target) e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, videoFile: file }));
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(URL.createObjectURL(file));
      clearError(fieldName);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(
          fieldName,
          error.message || "Error processing video. Please try another file."
        );
      } else {
        setError(
          fieldName,
          "An unknown error occurred while processing the video."
        );
      }
      if (e.target) e.target.value = "";
    }
  };

  // Handle thumbnail file selection
  const handleThumbnailSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const fieldName = "thumbnailFile";
    clearError(fieldName);

    const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!acceptedImageTypes.includes(file.type)) {
      setError(fieldName, "Invalid type. Use JPG, PNG, or WEBP.");
      if (e.target) e.target.value = "";
      setThumbnailDimensions(null);
      return;
    }

    const maxSizeInBytes = MAX_THUMBNAIL_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(
        fieldName,
        `File too large. Max size: ${MAX_THUMBNAIL_FILE_SIZE_MB}MB`
      );
      if (e.target) e.target.value = "";
      setThumbnailDimensions(null);
      return;
    }

    try {
      const { width, height } = await getImageDimensions(file);
      if (!isAspectRatioValid(width, height)) {
        setError(
          fieldName,
          "Invalid aspect ratio. Please use vertical format (portrait orientation)."
        );
        if (e.target) e.target.value = "";
        setThumbnailDimensions(null);
        return;
      }

      setFormData((prev) => ({ ...prev, thumbnailFile: file }));
      if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
      setThumbnailPreviewUrl(URL.createObjectURL(file));
      setThumbnailDimensions({ width, height });
      clearError(fieldName);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(
          fieldName,
          error.message ||
            "Error processing thumbnail. Please try another file."
        );
      } else {
        setError(
          fieldName,
          "An unknown error occurred while processing the thumbnail."
        );
      }
      if (e.target) e.target.value = "";
      setThumbnailDimensions(null);
    }
  };
  const { toast } = useToast();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasErrors = false;
    if (!textFields.title.trim()) {
      setError("title", "Title is required.");
      hasErrors = true;
    }
    if (!textFields.description.trim()) {
      setError("description", "Description is required.");
      hasErrors = true;
    }
    if (!formData.videoFile) {
      setError("videoFile", "Video file is required.");
      hasErrors = true;
    }
    if (!formData.thumbnailFile) {
      setError("thumbnailFile", "Thumbnail is required.");
      hasErrors = true;
    }

    if (hasErrors || Object.values(formErrors).some((err) => !!err)) {
      return;
    }
    let isSuccess = false;
    if (formData.videoFile && formData.thumbnailFile) {
      try {
        const result = await dispatch(
          submitClip({
            videoFile: formData.videoFile,
            thumbnailFile: formData.thumbnailFile,
            creatorId: formData.creatorId,
            clipperId: formData.clipperId,
            title: textFields.title,
            description: textFields.description,
          })
        );

        // Check if the action was rejected using unwrapResult pattern
        if (result.meta.requestStatus === "rejected") {
          const errorMessage =
            typeof result.payload === "string"
              ? result.payload
              : "Submission failed";
          throw new Error(errorMessage);
        }

        isSuccess = true;
      } catch (error) {
        isSuccess = false;
        console.error("Error submitting clip:", error);
      } finally {
        if (!submitClipLoading) {
          toast({
            title: isSuccess
              ? "Clip submitted successfully!"
              : "Clip submission failed!",
            description: isSuccess
              ? "Your clip has been submitted for review."
              : "Please try again.",
            variant: isSuccess ? "default" : "destructive",
          });
          handleClose();
        }
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (submitClipLoading) return; // Prevent closing during upload
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
    setVideoPreviewUrl("");
    setThumbnailPreviewUrl("");
    setThumbnailDimensions(null);
    setTextFields({
      title: "",
      description: "",
    });
    setFormData({
      videoFile: null,
      thumbnailFile: null,
      creatorId: user?.id || "",
      clipperId: clipperId,
    });

    setFormErrors({});
    dispatch(setClipSubmission());
  };

  // Handle video remove
  const handleVideoRemove = () => {
    if (videoFileInputRef.current) videoFileInputRef.current.value = "";
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    setVideoPreviewUrl("");
    setFormData((prev) => ({ ...prev, videoFile: null }));
    clearError("videoFile");
  };

  // Handle thumbnail remove
  const handleThumbnailRemove = () => {
    if (thumbnailFileInputRef.current) thumbnailFileInputRef.current.value = "";
    if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
    setThumbnailPreviewUrl("");
    setThumbnailDimensions(null);
    setFormData((prev) => ({ ...prev, thumbnailFile: null }));
    clearError("thumbnailFile");
  };

  return (
    <Card className="w-full max-w-7xl mx-auto relative border-none shadow-none sm:border sm:shadow-lg min-h-[80vh] lg:min-h-[85vh]">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute top-6 right-6 rounded-full z-10 h-10 w-10"
        aria-label="Close modal"
        disabled={submitClipLoading}
      >
        <X className="h-6 w-6" />
      </Button>
      <CardHeader className="text-center pt-12 sm:pt-8 pb-8">
        <CardTitle className="text-3xl lg:text-4xl xl:text-5xl font-bold">
          Submit Your Clip
        </CardTitle>
        <CardDescription className="text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
          Fill in the details below to send your video for review. Make sure
          your content follows our guidelines.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 lg:p-12">
        <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
          {/* File Upload Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <FilePreviewArea
              id="video-file"
              inputRef={videoFileInputRef}
              onChange={handleVideoFileSelect}
              previewUrl={videoPreviewUrl}
              Icon={Video}
              accept="video/*"
              label="Video File"
              currentFile={formData.videoFile}
              maxSizeMB={MAX_VIDEO_FILE_SIZE_MB}
              aspectRatioText="9:16 ratio (vertical/portrait)"
              error={formErrors.videoFile}
              onRemove={handleVideoRemove}
            />
            <FilePreviewArea
              id="thumbnail-file"
              inputRef={thumbnailFileInputRef}
              onChange={handleThumbnailSelect}
              previewUrl={thumbnailPreviewUrl}
              Icon={ImagePlus}
              accept="image/jpeg,image/png,image/webp"
              label="Thumbnail Image"
              currentFile={formData.thumbnailFile}
              maxSizeMB={MAX_THUMBNAIL_FILE_SIZE_MB}
              aspectRatioText="9:16 ratio (vertical/portrait)"
              error={formErrors.thumbnailFile}
              imageDimensions={thumbnailDimensions}
              onRemove={handleThumbnailRemove}
            />
          </div>

          {/* Text Fields Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className={`text-base lg:text-lg ${
                  formErrors.title ? "text-destructive" : ""
                }`}
              >
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                value={textFields.title}
                onChange={(e) => {
                  setTextFields((prev) => ({ ...prev, title: e.target.value }));
                  if (e.target.value.trim()) clearError("title");
                }}
                onBlur={(e) => {
                  if (!e.target.value.trim())
                    setError("title", "Title is required.");
                }}
                className={`h-12 lg:h-14 text-base lg:text-lg ${
                  formErrors.title
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
                maxLength={100}
                placeholder="e.g., My Awesome Gaming Moment"
              />
              {formErrors.title && (
                <p className="text-sm font-medium text-destructive flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  {formErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="description"
                className={`text-base lg:text-lg ${
                  formErrors.description ? "text-destructive" : ""
                }`}
              >
                Description <span className="text-destructive">*</span>
                <span className="text-sm text-muted-foreground ml-2">
                  (max 179 chars)
                </span>
              </Label>
              <Textarea
                id="description"
                value={textFields.description}
                onChange={(e) => {
                  setTextFields((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                  if (e.target.value.trim()) clearError("description");
                }}
                onBlur={(e) => {
                  if (!e.target.value.trim())
                    setError("description", "Description is required.");
                }}
                className={`min-h-[120px] lg:min-h-[140px] text-base lg:text-lg resize-none ${
                  formErrors.description
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
                maxLength={179}
                placeholder="Briefly describe your clip, what makes it special, the game you're playing, or any context that viewers should know..."
              />
              {formErrors.description && (
                <p className="text-sm font-medium text-destructive flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  {formErrors.description}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              size="lg"
              className="w-64 lg:w-80 h-14 lg:h-16 text-lg lg:text-xl font-semibold text-black mx-auto"
            >
              {submitClipLoading ? (
                <>
                  <Loader className="animate-spin mr-3 h-6 w-6 lg:h-7 lg:w-7" />
                  Processing...
                </>
              ) : (
                "Send Video for Review"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClipSubmission;
