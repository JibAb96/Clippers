"use client";
import React from "react";
import Image from "next/image";
import CTAButton from "../../../../components/CTAButton";
import { followersDisplay } from "../../../components/ClipperCard";
import { Clipper, PortfolioImage } from "../../../../model";
import Modal from "@/components/Modal";
import ClipSubmission from "./ClipSubmission";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setClipSubmission } from "@/state/Modal/isOpen";
import Thumbnail from "../../../../assets/images/thumbnail.png";
import { capitalizeFirstLetter } from "@/lib/utils";

const ClipperInfo = ({
  clipper,
  portfolioImages,
}: {
  clipper: Clipper;
  portfolioImages: PortfolioImage[];
}) => {
  //This component displays the clippers information and images
  // Also a button to submit a clip to this particular clipper
  const open = useAppSelector((state) => state.isOpen.clipSubmission);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 text-center sm:text-left sm:ml-10 md:ml-20 sm:pt-24 lg:pt-6 sm:mb-5">
        {clipper.brandName}
      </h1>
      <div className="max-w-screen sm:mx-10 lg:mx-20 sm:h-[55vh] md:h-[30vh] lg:h-[55vh] sm:rounded-lg sm:flex sm:justify-between">
        <div className="relative sm:w-[49.5%] h-full sm:rounded-l-xl">
          <Image
            src={clipper.brandProfilePicture || Thumbnail.src}
            alt={clipper.brandName}
            layout="fill"
            objectFit="cover"
            className="sm:rounded-l-xl cursor-pointer"
            quality={95}
          />
        </div>
        <div className="hidden sm:w-[49.5%] sm:h-full sm:flex-end sm:flex sm:flex-wrap sm:justify-between">
          {portfolioImages.slice(0, 4).map((image, index) => (
            <div
              key={image.id || index}
              className={`relative sm:w-[49.5%] sm:h-[49%]`}
            >
              <Image
                src={image.imageUrl}
                alt={`Social media post ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className={`cursor-pointer ${
                  index === 0
                    ? "sm:rounded-tl-none"
                    : index === 1
                    ? "sm:rounded-tr-xl"
                    : index === 2
                    ? "sm:rounded-bl-none"
                    : index === 3
                    ? "sm:rounded-br-xl"
                    : ""
                }`}
                quality={95}
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-between p-3 sm:p-0 sm:mr-24 lg:mr-20  sm:ml-10 lg:ml-16 sm:gap-1 sm:mb-5 sm:mt-3">
        <div className=" mt-2 md:p-3 sm:m-0 sm:text-left ">
          <p className="text-xl font-medium ">
            {capitalizeFirstLetter(clipper.platform)},{" "}
            <span className="block sm:inline-block">
              {followersDisplay(clipper.followerCount)} followers
            </span>
          </p>
          <p className="text-xl font-medium">
            {capitalizeFirstLetter(clipper.niche)}
          </p>
        </div>
        <div className=" mt-2 lg:mr-0  lg:flex lg:gap-20 xl:gap-48">
          <CTAButton
            CustomClass={"block"}
            Text={"Submit Clip For Review"}
            onClick={() => dispatch(setClipSubmission())}
            AriaLabel="Submit clip for review"
          />
          <p className="text-center md:text-2xl mt-2 sm:m-0 font-medium">
            £{clipper.pricePerPost} per post
          </p>
        </div>
      </div>
      <Modal isOpen={open}>
        <ClipSubmission recipientId="12345" />
      </Modal>
    </div>
  );
};
export default ClipperInfo;
