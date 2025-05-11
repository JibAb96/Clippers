"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import EmptyButton from "../../../components/EmptyButton";
import { setSubmittedClip } from "@/state/Modal/isOpen";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const SubmittedClip = () => {
  // State for form data and upload progress
  const dispatch = useAppDispatch();
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

  const clip = useAppSelector((state) => state.clip);
  console.log(clip);
  return (
    <div>
      {/* Modal content */}

      <button
        onClick={() => dispatch(setSubmittedClip())}
        className="absolute top-4 right-4"
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="sm:flex sm:flex-col sm:gap-6">
        <h2 id="modal-title" className="text-xl text-center font-bold mb-4">
          {clip.title}
        </h2>
        <div className="flex sm:flex-cols gap-2">
          {/*Video Display*/}
          <div className="aspect-9/16 max-w-xs">
            <video controls>
              <source src={clip.clipUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col gap-4 mt-4 sm:mt-0">
            <div className="sm:ml-6">
              {clip.status !== "New Submission" && (
                <h2 className="font-medium">
                  For any enquiries concerning this <hr />
                  clip email us at clippers@gmail.com
                </h2>
              )}
            </div>
            {/* Info panel with card effect */}
            <div className="space-y-4 bg-primary p-6 rounded-xl shadow-sm flex-grow">
              <InfoRow label="Creator" value={clip.user} />
              <InfoRow label="Platform" value={clip.platform} />
              <InfoRow label="Purpose" value="Marketing" />
              <div className="font-bold text-[#D20B4E]/80 mt-4">
                Description
              </div>
              <div className="font-normal">
                This video is going to be viral, This video is going to be
                viral, This video is going to be viral, This video is going to
                be viral, This video is going to be viral, This video is.
              </div>
            </div>
            {clip.status === "New Submission" && (
              <div className="mx-auto flex gap-2 sticky bottom-0">
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
  <div className="flex justify-between gap-48 items-center border-b pb-3 last:border-0 last:pb-0">
    <span className="font-bold text-secondary">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
export default SubmittedClip;
