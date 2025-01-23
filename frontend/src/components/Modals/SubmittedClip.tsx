import React from "react";
import { X } from "lucide-react";
import EmptyButton from "../Buttons/EmptyButton";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

type Props = {
  onClose: () => void;
};

const SubmittedClip = ({ onClose }: Props) => {
  // State for form data and upload progress

  // Handle escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  window.addEventListener("keydown", handleEscape);
  window.removeEventListener("keydown", handleEscape);

  const clip = useSelector((state: RootState) => state.clip)

  return (
    <div>
      {/* Modal content */}

      <button
        onClick={onClose}
        className="absolute top-4 right-4"
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="sm:flex sm:flex-col sm:gap-6">
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {clip.title}
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {/*Video Display*/}
          <div className="w-full aspect-9/16">
            {clip.video ? (
              <video
                className="rounded-xl"
                controls
                src={clip.video}
                aria-label={clip.title}
              />
            ) : (
              <img
                className="rounded-xl"
                src={clip.thumbnail}
                aria-label={clip.title}
              />
            )}
          </div>
          <div className="flex flex-col gap-1 mt-4 sm:mt-0">
            {clip.status !== "New Submission" && (
              <h2 className="font-medium">
                For any enquiries concerning this clip email us at
                clippers@gmail.com
              </h2>
            )}
            {/* Info panel with card effect */}
            <div className="space-y-4 bg-gray-50 dark:bg-neutral-800/50 p-6 rounded-xl">
              <InfoRow label="Creator" value={clip.user} />
              <InfoRow label="Platform" value={clip.platform} />
              <InfoRow label="Purpose" value="Marketing" />
              <div className="font-medium text-gray-600 dark:text-gray-400">
                Description
              </div>
              <div className="text-gray-900 dark:text-white">
                This is a video to go viral, This is a video to go viral, This
                is a video to go viral, this is a
              </div>
            </div>
            {clip.status === "New Submission" && (
              <div className="mx-auto flex gap-2">
                <EmptyButton
                  Text="Accept"
                  AriaLabel="Accept submitted clip for posting"
                  CustomClass="bg-green-700 px-8"
                />
                <EmptyButton
                  Text="Reject"
                  AriaLabel="Reject submitted clip for posting"
                  CustomClass="bg-secondary px-8"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for info rows
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border-b border-gray-200 dark:border-neutral-700 pb-3 last:border-0 last:pb-0">
    <span className="font-medium text-gray-600 dark:text-gray-400">
      {label}
    </span>
    <span className="text-gray-900 dark:text-white">{value}</span>
  </div>
);
export default SubmittedClip;
