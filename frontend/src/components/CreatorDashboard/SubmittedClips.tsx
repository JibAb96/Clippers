import React from "react";
import DashboardCard from "../Cards/DashboardCard";
import submittedClips from "../../database/submittedClips";
const SubmittedClips = () => {
  //Section of the dashboard displaying all submitted clips and their status
  return (
    <div className="flex flex-wrap justify-center gap-5 text-white sm:justify-start sm:mx-10">
      {submittedClips.map((clip) => (
        <DashboardCard
          key={clip.id}
          Image={clip.thumbnail}
          ClipperName={clip.clipper}
          ClipperTitle={clip.name}
          Platform={clip.platform}
          Status={clip.status}
        />
      ))}
    </div>
  );
};

export default SubmittedClips;
