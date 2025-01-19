import React, { useEffect, useState } from "react";
import ClipStatusHeadings from "../Utilities/ClipStatusHeadings";
import DashboardSections from "../Utilities/DashboardSections";
import DisplayClips from "../Utilities/DisplayClips";
import { useSearchContext } from "../../context/SearchContext";
import submittedClips from "../../database/submittedClips";
import Modal from "../Modals/Modal";
import SubmittedClip from "../Modals/SubmittedClip";

const ClipperDashboard = () => {
  const { filteredClips, filterClips, status } = useSearchContext();
  const [isClipModalOpen, setIsClipModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterClips(submittedClips);
    // eslint-disable-next-line
  }, [status]);

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
          filteredClips={filteredClips}
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
