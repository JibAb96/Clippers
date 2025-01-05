import React, { useEffect } from "react";
import DashboardCard from "../Cards/DashboardCard";
import { useSearchContext } from "../../context/SearchContext";
import { Clip } from "../../model";
type Props = {
  filteredClips: Clip[];
};

const SubmittedClips = ({ filteredClips }: Props) => {
  const { status } = useSearchContext();

  useEffect(() => {
    // eslint-disable-next-line
  }, [status]);
  //Section of the dashboard displaying all submitted clips and their status

  return (
    <div className="flex flex-wrap justify-center gap-5 text-white sm:justify-start sm:mx-10">
      {filteredClips.map((clip) => (
        <DashboardCard
          key={clip.id}
          Image={clip.thumbnail}
          ClipperName={clip.user}
          ClipperTitle={clip.name}
          Platform={clip.platform}
          Status={clip.status}
        />
      ))}
    </div>
  );
};

export default SubmittedClips;
