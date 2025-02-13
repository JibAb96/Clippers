import React from "react";
import ClipStatusHeadings from "./ClipStatusHeadings";
import DashboardSections from "./DashboardSections";
import DisplayClips from "./DisplayClips";
import submittedClips from "../../../submittedClips";
import Modal from "../../../components/Modal";
import SubmittedClip from "./SubmittedClip";

const ClipperDashboard = () => {
  
  return (
    <div>
      <div className="bg-primary pt-24 lg:pt-4">
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
        clips={submittedClips}
        />
      </div>
      <Modal >
        <SubmittedClip />
      </Modal>
    </div>
  );
};

export default ClipperDashboard;
