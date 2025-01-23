import React from "react";
import { Clip } from "../../model";
import { useDispatch } from "react-redux";
import { selectClip } from "../../state/Clip/selectedClip";
// Here we have the structure of the cards of each clip that will be displayed. Styled with
// tailwindcss.

type Props = {
  clip: Clip
  openModal?: React.Dispatch<React.SetStateAction<boolean>> //This will be set to true if card is clicked and will display a modal with information concerning the card
};

const DashboardCard = ({
  clip,
  openModal,
}: Props) => {
  const dispatch = useDispatch();
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
    openModal && dispatch(selectClip(clip));
    openModal && openModal(true);
  }

  return (
    <div className="max-w-72 rounded cursor-pointer sm:max-w-[17.5rem]"
    onClick={onClick}>
      <div className="relative">
        <img
          className="h-56 object-cover rounded-2xl"
          src={clip.thumbnail}
          alt={ "This is a a thumbnail for the clip " + clip.title}
        />
      </div>
      <div className="px-1 py-4">
        <div
          className={`text-xl ${statusStyle} font-bold py-1 inline-block`}
        >
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
