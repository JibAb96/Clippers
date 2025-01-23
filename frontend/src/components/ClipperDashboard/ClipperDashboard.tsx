import React, { useEffect, useState } from "react";
import ClipStatusHeadings from "../Utilities/ClipStatusHeadings";
import DashboardSections from "../Utilities/DashboardSections";
import DisplayClips from "../Utilities/DisplayClips";
import submittedClips from "../../database/submittedClips";
import Modal from "../Modals/Modal";
import SubmittedClip from "../Modals/SubmittedClip";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { filterClips } from "../../state/Clips/clips";

const ClipperDashboard = () => {
  const [isClipModalOpen, setIsClipModalOpen] = useState(false);
  const status = useSelector((state: RootState) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterClips({ status: status, clips: submittedClips }));
  }, [status, dispatch]);

  return (
    <div>
      <div className="bg-primary pt-24">
        <div className="flex flex-col gap-2 ml-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Clipper Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and track all the video clips submitted to you in one place
          </p>
        </div>
        <ClipStatusHeadings
          Clips={submittedClips}
          HeadingOne="New Submission"
          HeadingTwo="Posted"
          HeadingThree="Rejected"
        />
        <DashboardSections
          HeadingOne="New Submission"
          HeadingTwo="Posted"
          HeadingThree="Rejected"
        />
        <DisplayClips
          setIsClipModalOpen={setIsClipModalOpen}
        />
      </div>
      <Modal isOpen={isClipModalOpen}>
        <SubmittedClip onClose={() => setIsClipModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ClipperDashboard;
