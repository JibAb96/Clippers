import React, { useEffect } from "react";
import DashboardCard from "./DashboardCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { filterClips } from "@/state/Clips/clips";
import { Clip } from "../../../../model";

const DisplayClips = ({ clips }: { clips: Clip[] }) => {
  const status = useAppSelector((state) => state.status);
  const filteredClips = useAppSelector((state) => state.clips)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterClips({clips: clips, status: status}))
  // eslint-disable-next-line
  }, [status]);
  //Section of the dashboard displaying all submitted clips and their status

  return (
    <div className="flex flex-wrap justify-center gap-5 ">
      {filteredClips.map((clip) => (
        <DashboardCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
};

export default DisplayClips;
