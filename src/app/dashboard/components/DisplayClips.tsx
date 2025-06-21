"use client";
import React, { useEffect } from "react";
import DashboardCard from "./DashboardCard";
import SubmittedClip from "./SubmittedClip";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { filterClips } from "../../../state/Clips/clipsSlice";
import { Clip } from "../../../state/Clips/clipsSlice";
import { RootState } from "@/state/store";

const DisplayClips = ({ clips }: { clips: Clip[] }) => {
  const status = useAppSelector((state) => state.status);
  const { filteredClips } = useAppSelector((state: RootState) => state.clips);
  const isSubmittedClipModalOpen = useAppSelector(
    (state: RootState) => state.isOpen.submittedClips
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterClips({ clips, status }));
  }, [status, clips, dispatch]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredClips.map((clip) => (
            <DashboardCard key={clip.id} clip={clip} />
          ))}
        </div>
      </div>

      {/* SubmittedClip Modal */}
      <Modal isOpen={isSubmittedClipModalOpen}>
        <SubmittedClip />
      </Modal>
    </>
  );
};

export default DisplayClips;
