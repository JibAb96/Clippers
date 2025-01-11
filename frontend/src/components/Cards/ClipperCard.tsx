import React from "react";

// Utility function to format followers count into a more readable format
// e.g., 1,000,000 becomes "1M+", 100,000 becomes "100K+", else show exact number
export const followersDisplay = (followers: number) => {
  return followers > 1000000
    ? Math.floor(followers / 1000000) + "M+"
    : followers > 100000
    ? Math.floor(followers / 1000) + "K+"
    : followers;
};

// Props type definition for the ClipperCard component to ensure strong typing and reusability
// This improves maintainability and helps prevent runtime errors

type Props = {
  Image: string; //URL for the clipper's image
  ClipperName: string; //Name of the clipper
  Niche: string; //Niche or category the clipper operates in
  Platform: string; //Social media platform the clipper uses
  Followers: number; //Number of followers the clipper has
  Price: number; //Cost per post charged by the clipper
  onClick: () => void; //Click handler function for user interactions
};

// ClipperCard Component: Displays information about a clipper, including their image, niche,
// followers, and price. Styled using Tailwind CSS for a responsive and modern look.
const ClipperCard = ({
  Image,
  ClipperName,
  Niche,
  Platform,
  Followers,
  Price,
  onClick,
}: Props) => {
  return (
    // Main container with Tailwind styling for card layout
    <div
      className="max-w-72 rounded overflow-hidden m-5 cursor-pointer"
      onClick={onClick} // Clickable card that triggers the provided onClick function
    >
      {/* Image section with an overlay badge displaying the clipper's niche */}
      <div className="relative">
        <img
          className="w-72 h-64 object-cover rounded-2xl"
          src={Image} // Image of the clipper
          alt={ClipperName} // Accessible alternative text for the image
        />
        <div className="w-full absolute top-[-1.5rem] left-2 text-center mt-10">
          {/* Badge to display the niche, styled with a shadow and rounded edges */}
          <div className="bg-white py-1 px-1 max-w-fit drop-shadow-2xl text-sm rounded-xl font-medium text-center">
            {Niche}
          </div>
        </div>
      </div>

      {/* Text section containing clipper details */}
      <div className="px-1 py-4">
        {/* Clipper name displayed prominently */}
        <div className="font-semibold text-xl">{ClipperName}</div>
        {/* Platform and follower count displayed in a secondary style */}
        <div className="flex font-medium text-l text-[#7A7A7A]">
          {Platform}, {" "}
          {followersDisplay(Followers)} followers
        </div>
        {/* Price per post displayed in bold for emphasis */}
        <div className="font-medium text-l mt-2">
          <span className="font-semibold">£{Price}</span> per post
        </div>
      </div>
    </div>
  );
};

export default ClipperCard;
