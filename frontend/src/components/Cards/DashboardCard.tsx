import React from "react";
// Here we have the structure of the cards of each clip that will be displayed. Styled with
// tailwindcss.

type Props = {
  Image: string;
  ClipperName: string;
  Status: string;
  Platform: string;
  ClipperTitle: string;
};

const DashboardCard = ({
  Image,
  ClipperName,
  Status,
  Platform,
  ClipperTitle,
}: Props) => {
  // Function to set bg color corresponding with status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "posted":
        return "bg-green-400";
      case "rejected":
        return "bg-red-600";
      case "pending":
      case "ready for upload":
        return "bg-yellow-400";
      case "new submission":
        return "bg-skyblue";
      default:
        return "bg-gray-400";
    }
  };
  const statusStyle = getStatusColor(Status);
  return (
    <div className="max-w-72 rounded cursor-pointer sm:max-w-[17.5rem]">
      <div className="relative">
        <img
          className="h-56 object-cover rounded-2xl"
          src={Image}
          alt={ClipperName}
        />
      </div>
      <div className="px-1 py-4">
        <div
          className={`text-xl ${statusStyle} rounded-full px-3 py-1 text-white inline-block`}
        >
          {Status}
        </div>
        <div className="font-semibold text-xl">{ClipperTitle}</div>
        <div className="font-medium text-l">{ClipperName}</div>
        <div className="font-medium text-l">{Platform}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
