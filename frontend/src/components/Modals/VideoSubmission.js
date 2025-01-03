import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { X, Upload, Loader } from "lucide-react";

const VideoSubmission = ({ recipientId, onClose, onSubmit }) => {
  // State for form data and upload progress
  const [formData, setFormData] = useState({
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
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isUploading) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line
  }, [isUploading]);

  // Ref for file input
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    // Validate file type and size
    if (file && file.type.startsWith("video/")) {
      if (file.size <= 100 * 1024 * 1024) {
        // 100MB limit
        setFormData((prev) => ({ ...prev, videoFile: file }));
        // Create preview URL
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        alert("Please select a video file under 100MB");
      }
    } else {
      alert("Please select a valid video file");
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
    }
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    simulateUpload();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={isUploading ? undefined : handleClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        role="dialog"
        aria-labelledby="modal-title"
        className="relative bg-white rounded-lg p-6 w-full max-w-lg"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4"
          aria-label="Close modal"
          disabled={isUploading}
        >
          <X className="h-6 w-6" />
        </button>

        <h2 id="modal-title" className="text-xl font-bold mb-4">
          Send Video Clip
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Video upload area */}
          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {previewUrl ? (
              <video
                src={previewUrl}
                className="max-h-48 mx-auto mb-2"
                controls
              />
            ) : (
              <div className="py-8">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p>Click to select or drag a video file here</p>
                <p className="text-sm text-gray-500">Maximum size: 100MB</p>
              </div>
            )}
          </div>

          {/* Title field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
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
            <label htmlFor="date" className="block text-sm font-medium mb-1">
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
              className="block text-sm font-medium mb-1"
            >
              Description
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
              maxLength={500}
            />
          </div>

          {/* Upload progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-full bg-blue-500 rounded"
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
            disabled={isUploading || !formData.videoFile || !formData.title || !formData.date || !formData.description}
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
    </div>
  );
};

export default VideoSubmission;
