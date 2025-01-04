import React, { useEffect } from "react";
import ClipStatusHeadings from "./ClipStatusHeadings";
import SubmittedClips from "./SubmittedClips";
import DashboardSections from "./DashboardSections";


const CreatorDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="bg-gradient-to-r from-blue-800 to-skyblue pt-20">
      <h1 className="text-3xl my-10 font-semibold text-white text-center sm:text-left sm:ml-10">
        Creator Dashboard
      </h1>
      <ClipStatusHeadings/>
      <DashboardSections/>
      <SubmittedClips/>
    </div>
  );
};

export default CreatorDashboard;
