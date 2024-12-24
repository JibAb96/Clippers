import React from "react";
// Here we have a the structure of the cards each clipper will be displayed on styled with 
// tailwind and some javascript logic to display numbers in a user friendly way
const ClipperCard = ({
  Image,
  ClipperName,
  Niche,
  Platform,
  Followers,
  Price,
}) => {
  return (
    <div className="max-w-64 rounded overflow-hidden m-5 cursor-pointer">
      <div className="relative">
        <img
          className="w-64 h-64 object-cover rounded-2xl"
          src={Image}
          alt={ClipperName}
        />
        <div className="w-full absolute top-[-1.5rem] left-2 text-center mt-10">
          <div className="bg-white py-1 px-1 max-w-fit drop-shadow-2xl text-sm rounded-xl font-medium text-center">
            {Niche}
          </div>
        </div>
      </div>
      <div className="px-1 py-4">
        <div className="font-semibold text-xl">{ClipperName}</div>
        <div className="font-medium text-l">{Platform}</div>
        <div className="font-medium text-l">
          {Followers > 1000000
            ? Math.floor(Followers / 1000000) + "M+"
            : Followers > 100000
            ? Math.floor(Followers / 1000) + "K+"
            : Followers}
        </div>
        <div className="font-medium text-l mt-2">
          <span className="font-semibold">£{Price}</span> per post
        </div>
      </div>
    </div>
  );
};

export default ClipperCard;