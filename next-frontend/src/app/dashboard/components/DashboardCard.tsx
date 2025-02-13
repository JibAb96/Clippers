import React from "react";
import { Clip } from "../../../../model";
import { useAppDispatch} from "@/app/hooks";
import { setIsOpen } from "@/state/Modal/isOpen";
import { selectClip } from "@/state/Clip/selectedClip";
// Here we have the structure of the cards of each clip that will be displayed. Styled with
// tailwindcss.



const DashboardCard = ({ clip }: {
  clip: Clip
}) => {
  const dispatch = useAppDispatch();
  // Function to set bg color corresponding with status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "posted":
        return "text-green-700";
      case "rejected":
        return "text-red-600";
      case "scheduled":
      case "ready for upload":
        return "text-[#B44800]";
      case "pending review":
      case "new submission":
        return "text-[#187AA0]";
      default:
        return "text-gray-400";
    }
  };
  const statusStyle = getStatusColor(clip.status);

  const onClick = () => {
    dispatch(setIsOpen())
    dispatch(selectClip(clip))
  };

  return (
    <div
      className="max-w-72 rounded cursor-pointer sm:max-w-[17.5rem]"
      onClick={onClick}
    >
      <div className="relative">
        <img
          className="h-56 object-cover rounded-2xl"
          src={clip.thumbnail.src}
          alt={"This is a a thumbnail for the clip " + clip.title}
        />
      </div>
      <div className="px-1 py-4">
        <div className={`text-xl ${statusStyle} font-bold py-1 inline-block`}>
          {clip.status}
        </div>
        <div>
          <div className="font-semibold text-xl">{clip.title}</div>
          <div className="font-medium text-l text-tertiary">
            {clip.platform}
          </div>
          <div className="font-medium text-l">{clip.user}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
