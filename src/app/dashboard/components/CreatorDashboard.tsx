import React, { useEffect } from "react";
import ClipStatusHeadings from "./ClipStatusHeadings";
import DisplayClips from "./DisplayClips";
import DashboardSections from "./DashboardSections";
// import sentClips from "../../../sentClips"; // Remove mock data
import { useDispatch, useSelector } from "react-redux";
import { getClipsByCreatorId } from "../../../state/Clips/clipsThunks";
import { AppDispatch, RootState } from "../../../state/store"; // Assuming store types path

const CreatorDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clips, loading, error } = useSelector(
    (state: RootState) => state.clips
  );

  useEffect(() => {
    dispatch(getClipsByCreatorId());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="pt-24 lg:pt-4 bg-primary text-center">
        Loading clips...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 lg:pt-4 bg-primary text-center text-red-500">
        Error loading clips: {error}
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-4 bg-primary">
      <div className="flex flex-col gap-2 ml-10">
        <h1 className="text-2xl sm:text-3xl font-bold">Creator Dashboard</h1>
        <h2 className="text-sm sm:text-base text-tertiary">
          Manage and track all your submitted video clips in one place
        </h2>
      </div>
      <ClipStatusHeadings
        Clips={clips}
        HeadingOne="Pending Review"
        HeadingTwo="Posted"
        HeadingThree="Rejected"
      />
      <DashboardSections
        HeadingOne="Pending Review"
        HeadingTwo="Posted"
        HeadingThree="Rejected"
      />
      {/* Conditionally render message if clips array is empty */}
      {!loading && !error && clips.length === 0 && (
        <div className="text-center py-10 px-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Ready to share your awesome content?
          </h2>
          <p className="text-gray-500">
            You haven&apos;t submitted any clips yet. Click the button below to
            get started!
          </p>
          {/* TODO: Add a button/link here to the clip submission page/modal if available */}
          {/* For example: <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit Your First Clip</button> */}
        </div>
      )}
      <DisplayClips clips={clips} />
    </div>
  );
};

export default CreatorDashboard;
