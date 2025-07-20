import React, { useEffect } from "react";
import ClipStatusHeadings from "./ClipStatusHeadings";
import DashboardSections from "./DashboardSections";
import DisplayClips from "./DisplayClips";
// import submittedClips from "../../../submittedClips"; // Remove mock data
import { useDispatch, useSelector } from "react-redux";
import { getClipsByClipperId } from "../../../state/Clips/clipsThunks";
import { AppDispatch, RootState } from "../../../state/store"; // Assuming store types path
import { useTutorialTrigger } from "../../../hooks/useTutorialTrigger";

const ClipperDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clips, loading, error } = useSelector(
    (state: RootState) => state.clips
  );

  // Get userType from Redux state instead of hardcoding
  const { userType } = useSelector((state: RootState) => state.user);

  // Trigger tutorial for newly onboarded users - using actual userType from state
  useTutorialTrigger({ userType });

  useEffect(() => {
    dispatch(getClipsByClipperId());
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
        <div className="dashboard-status-headings">
          <ClipStatusHeadings
            Clips={clips}
            HeadingOne="New Submission"
            HeadingTwo="Posted"
            HeadingThree="Rejected"
          />
        </div>
        <DashboardSections
          HeadingOne="New Submission"
          HeadingTwo="Posted"
          HeadingThree="Rejected"
        />
        {/* Conditionally render message if clips array is empty */}
        {!loading && !error && clips.length === 0 && (
          <div className="text-center py-10 px-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No clips here yet!
            </h2>
            <p className="text-gray-500">
              Looks like creators haven&apos;t submitted any clips to you.
            </p>
            <p className="text-gray-500">
              Hang tight, new content might be on its way!
            </p>
          </div>
        )}
        <DisplayClips clips={clips} />
      </div>
    </div>
  );
};

export default ClipperDashboard;
