"use client"
import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Loader } from "lucide-react";
import { setClipSubmission } from "@/state/Modal/isOpen";
import { useAppDispatch } from "@/app/hooks";

type Props = {
  recipientId: string;
};

type FormDataType = {
  title: string;
  description: string;
  date: string;
  videoFile: File | null;
};
const ClipSubmission = ({ recipientId }: Props) => {
  // State for form data and upload progress
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    date: "",
    videoFile: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isUploading) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line
  }, [isUploading]);

  const dispatch = useAppDispatch();

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
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

      video.onerror = () => reject(new Error("Failed to load video metadata"));
      video.src = URL.createObjectURL(file);
    });
  };

  // Constants for validation
  const MAX_FILE_SIZE_MB = 100;
  const TARGET_ASPECT_RATIO = 9 / 16;
  const ASPECT_RATIO_TOLERANCE = 0.01;

  // Function to validate video aspect ratio
  const isAspectRatioValid = (width: number, height: number): boolean => {
    const aspectRatio = width / height;
    return (
      Math.abs(aspectRatio - TARGET_ASPECT_RATIO) <= ASPECT_RATIO_TOLERANCE
    );
  };

  // Main file select handler
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file");
      e.target.value = ""; // Reset file input
      return;
    }

    // Validate file size
    const maxSizeInBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(`Please select a video file under ${MAX_FILE_SIZE_MB}MB`);
      e.target.value = ""; // Reset file input
      return;
    }

    try {
      // Get video dimensions and validate aspect ratio
      const { width, height } = await getVideoDimensions(file);
      if (!isAspectRatioValid(width, height)) {
        alert(
          "Please upload a video with a 9:16 aspect ratio (vertical video format)"
        );
        e.target.value = ""; // Reset file input
        return;
      }

      // If all validations pass
      setFormData((prev) => ({ ...prev, videoFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error validating video file:", error);
      alert("An error occurred while processing the video file.");
    }
  };

  // Simulate upload progress
  const simulateUpload = async () => {
    setIsUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setIsUploading(false);
  };

  // Handle modal close
  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      console.log(recipientId);
    }
    dispatch(setClipSubmission());
  };

  return (
    <div>
      {/* Modal content */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4"
        aria-label="Close modal"
        disabled={isUploading}
      >
        <X className="h-6 w-6" />
      </button>

      <label
        id="modal-title"
        className="text-xl text-secondary font-bold mb-4"
        htmlFor="video-file"
      >
        Send Video Clip
      </label>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          simulateUpload();
        }}
      >
        {/* Video upload area */}
        <div
          className="border-2 w-fit mx-auto border-dashed rounded-lg p-1 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            id="video-file"
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {previewUrl ? (
            <video src={previewUrl} className="max-h-64" controls />
          ) : (
            <div className="py-8">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p>Click to select or drag a video file here</p>
              <p className="text-sm text-gray-500">Maximum size: 100MB</p>
            </div>
          )}
        </div>
        {/* Thumbnail upload area */}
        <label
          className="block text-sm text-secondary font-semibold mb-1"
          htmlFor="thumbnail"
        >
          Upload Thumbnail:
        </label>
        <input
          type="file"
          id="thumbnail"
          accept=".jpg,.jpeg,.webp,.png"
          className="w-full p-2 border rounded"
        />
        {/* Title field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm text-secondary font-semibold mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 border rounded"
            required
            maxLength={100}
          />
        </div>
        {/* Schedule Date field */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm text-secondary font-semibold mb-1"
          >
            Post Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-1 text-secondary"
          >
            Description{" "}
            <span className="text-tertiary">(maximum 179 characters)</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full p-2 border rounded"
            rows={3}
            maxLength={179}
          />
        </div>

        {/* Upload progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-secondry rounded"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-center">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={
            isUploading ||
            !formData.videoFile ||
            !formData.title ||
            !formData.date ||
            !formData.description
          }
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin mr-2" />
              Uploading...
            </span>
          ) : (
            "Send Video"
          )}
        </button>
      </form>
    </div>
  );
};

export default ClipSubmission;
