import React, { useEffect } from "react";
import ClipStatusHeadings from "../Utilities/ClipStatusHeadings";
import SubmittedClips from "../Utilities/SubmittedClips";
import DashboardSections from "../Utilities/DashboardSections";
import sentClips from "../../database/sentClips";
import { useSearchContext } from "../../context/SearchContext";

const CreatorDashboard = () => {
  const { filteredClips, filterClips, status } = useSearchContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterClips(sentClips);
    // eslint-disable-next-line
  }, [status]);

  return (
    <div className="bg-gradient-to-r from-blue-800 to-skyblue pt-20">
      <h1 className="text-3xl my-10 font-semibold text-white text-center sm:text-left sm:ml-10">
        Creator Dashboard
      </h1>
      <ClipStatusHeadings
        Clips={sentClips}
        HeadingOne="Pending"
        HeadingTwo="Posted"
        HeadingThree="Rejected"
      />
      <DashboardSections
        HeadingOne="Pending"
        HeadingTwo="Posted"
        HeadingThree="Rejected"
      />
      <SubmittedClips filteredClips={filteredClips} />
    </div>
  );
};

export default CreatorDashboard;
