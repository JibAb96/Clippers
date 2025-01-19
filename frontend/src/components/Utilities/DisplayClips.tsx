import React, { useEffect } from "react";
import DashboardCard from "../Cards/DashboardCard";
import { useSearchContext } from "../../context/SearchContext";
import { Clip } from "../../model";
type Props = {
  filteredClips: Clip[];
  setIsClipModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisplayClips = ({ filteredClips, setIsClipModalOpen }: Props) => {
  const { status } = useSearchContext();

  useEffect(() => {
    // eslint-disable-next-line
  }, [status]);
  //Section of the dashboard displaying all submitted clips and their status

  return (
    <div className="flex flex-wrap justify-center gap-5 ">
      {filteredClips.map((clip) => (
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
