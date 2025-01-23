import React, { useEffect } from "react";
import ClipStatusHeadings from "../Utilities/ClipStatusHeadings";
import DisplayClips from "../Utilities/DisplayClips";
import DashboardSections from "../Utilities/DashboardSections";
import sentClips from "../../database/sentClips";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { filterClips } from "../../state/Clips/clips";

const CreatorDashboard = () => {
  const status = useSelector((state: RootState) => state.status)
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(filterClips({status: status, clips: sentClips}))
  }, [status, dispatch]);

  return (
    <div className="bg-primary pt-10">
      <div className="flex flex-col gap-2 mt-16 ml-10">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Creator Dashboard
        </h1>
        <h2 className="text-sm sm:text-base text-tertiary">
          Manage and track all your submitted video clih2s in one place
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
      <DisplayClips />
    </div>
  );
};

export default CreatorDashboard;
