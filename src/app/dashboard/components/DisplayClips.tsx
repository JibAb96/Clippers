"use client";
import React, { useEffect } from "react";
import DashboardCard from "./DashboardCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { filterClips } from "../../../state/Clips/clipsSlice";
import { Clip } from "../../../state/Clips/clipsSlice";
import { RootState } from "@/state/store";

const DisplayClips = ({ clips }: { clips: Clip[] }) => {
  const status = useAppSelector((state) => state.status);
  const { filteredClips } = useAppSelector((state: RootState) => state.clips);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterClips({ clips, status }));
  }, [status, clips, dispatch]);

  return (
    <div className="flex flex-wrap justify-center gap-5 ">
      {filteredClips.map((clip) => (
        <DashboardCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
};

export default DisplayClips;
