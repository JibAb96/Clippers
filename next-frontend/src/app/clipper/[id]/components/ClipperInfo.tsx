import React from "react";
import CTAButton from "../../../../components/CTAButton";
import { followersDisplay } from "../../../components/ClipperCard";
import { Clipper } from "../../../../../model";
import { useAppDispatch } from "@/app/hooks";
import { setIsOpen } from "@/state/Modal/isOpen";

const ClipperInfo = ({clipper}: {clipper: Clipper})=> {
  //This component displays the clippers information and images
  // Also a button to submit a clip to this particular clipper
const dispatch = useAppDispatch();
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 text-center sm:text-left sm:ml-10 md:ml-20 sm:pt-24 lg:pt-6 sm:mb-5">
        {clipper.name}
      </h1>
      <div className="max-w-screen sm:mx-10 lg:mx-20 sm:h-[55vh] md:h-[30vh] lg:h-[55vh] sm:rounded-lg sm:flex sm:justify-between">
        <img
          src={clipper.thumbnail.src}
          alt={clipper.name}
          className="object-fill sm:w-[49.5%] sm:rounded-l-xl cursor-pointer"
        />
        <div className=" hidden sm:w-[49.5%] sm:h-full sm:flex-end sm:flex sm:flex-wrap sm:justify-between">
          {clipper.images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              className={`sm:w-[49.5%] sm:h-[49%] object-cover cursor-pointer ${
                index === 1
                  ? "rounded-tr-xl"
                  : index === 3
                  ? "rounded-br-xl"
                  : ""
              }`}
              alt={`social media post ${index}`}
            />
          ))}
        </div>
      </div>
      <div className=" flex justify-between p-3 sm:p-0 sm:mr-24 lg:mr-20  sm:ml-10 lg:ml-16 sm:gap-1 sm:mb-5 sm:mt-3">
        <div className=" mt-2 md:p-3 sm:m-0 sm:text-left ">
          <p className="text-xl font-medium ">
            {clipper.platform},{" "}
            <span className="block sm:inline-block">
              {followersDisplay(clipper.followers)} followers
            </span>
          </p>
          <p className="text-xl font-medium">{clipper.niche}</p>
        </div>
        <div className=" mt-2 lg:mr-0  lg:flex lg:gap-20 xl:gap-48">
          <CTAButton
            CustomClass={"block"}
            Text={"Submit Clip For Review"}
            onClick={() => dispatch(setIsOpen())}
            AriaLabel="Submit clip for review"
          />
          <p className="text-center md:text-2xl mt-2 sm:m-0 font-medium">
            £{clipper.price} per post
          </p>
        </div>
      </div>
    </div>
  );
};
export default ClipperInfo;
