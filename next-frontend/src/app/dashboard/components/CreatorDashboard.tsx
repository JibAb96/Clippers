import React from "react";
import ClipStatusHeadings from "./ClipStatusHeadings";
import DisplayClips from "./DisplayClips";
import DashboardSections from "./DashboardSections";
import sentClips from "../../../sentClips";

const CreatorDashboard = () => {
  return (
    <div className="pt-24 lg:pt-4 bg-primary">
      <div className="flex flex-col gap-2 ml-10">
        <h1 className="text-2xl sm:text-3xl font-bold">Creator Dashboard</h1>
        <h2 className="text-sm sm:text-base text-tertiary">
          Manage and track all your submitted video clips in one place
        </h2>
      </div>
      <ClipStatusHeadings
        Clips={sentClips}
        HeadingOne="Pending Review"
        HeadingTwo="Posted"
        HeadingThree="Rejected"
      />
      <DashboardSections
        HeadingOne="Pending Review"
        HeadingTwo="Posted"
        HeadingThree="Rejected"
      />
      <DisplayClips clips={sentClips} />
    </div>
  );
};

export default CreatorDashboard;
