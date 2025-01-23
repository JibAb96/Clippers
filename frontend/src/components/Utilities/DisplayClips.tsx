import React, { useEffect } from "react";
import DashboardCard from "../Cards/DashboardCard";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
type Props = {
  setIsClipModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisplayClips = ({ setIsClipModalOpen }: Props) => {
  const status = useSelector((state: RootState) => state.status)
  const clips = useSelector((state: RootState) => state.clips)

  useEffect(() => {
  }, [status]);
  //Section of the dashboard displaying all submitted clips and their status

  return (
    <div className="flex flex-wrap justify-center gap-5 ">
      {clips.map((clip) => (
        <DashboardCard
          key={clip.id}
          clip={clip}
          openModal={setIsClipModalOpen}
        />
      ))}
    </div>
  );
};

export default DisplayClips;
