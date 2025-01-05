import React, { useEffect } from "react";
import ClipStatusHeadings from "../Utilities/ClipStatusHeadings";
import DashboardSections from "../Utilities/DashboardSections";
import SubmittedClips from "../Utilities/DisplayClips";
import { useSearchContext } from "../../context/SearchContext";
import submittedClips from "../../database/submittedClips";

const ClipperDashboard = () => {
  const { filteredClips, filterClips, status } = useSearchContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterClips(submittedClips);
    // eslint-disable-next-line
  }, [status]);

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-300 to-blue-500  pt-20">
        <h1 className="text-3xl my-10 font-semibold text-white text-center sm:text-left sm:ml-10">
          Clipper Dashboard
        </h1>
        <ClipStatusHeadings
          Clips={submittedClips}
          HeadingOne="Ready For Upload"
          HeadingTwo="Posted"
          HeadingThree="Rejected"
          HeadingFour="New Submission"
        />
        <DashboardSections
          HeadingOne="New Submission"
          HeadingTwo="Ready For Upload"
          HeadingThree="Posted"
          HeadingFour="Rejected"
        />
        <SubmittedClips filteredClips={filteredClips} />
      </div>
    </div>
  );
};

export default ClipperDashboard;
