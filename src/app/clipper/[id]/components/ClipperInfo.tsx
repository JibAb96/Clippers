"use client";
import React from "react";
import Image from "next/image";
import CTAButton from "../../../../components/CTAButton";
import { followersDisplay } from "../../../find-clippers/components/ClipperCard";
import { Clipper, PortfolioImage } from "../../../../model";
import Modal from "@/components/Modal";
import ClipSubmission from "./ClipSubmission";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setClipSubmission } from "@/state/Modal/isOpen";
import Thumbnail from "../../../../assets/images/thumbnail.png";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
  const { user, userType, token } = useAppSelector((state) => state.user);
  const router = useRouter();
  const isSignedIn = !!token && !!user;
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 text-center sm:text-left sm:ml-10 md:ml-20 sm:pt-24 lg:pt-6 sm:mb-5">
        {clipper.brandName}
      </h1>
      {/* Responsive layout for images */}
      <div className="w-full flex flex-col gap-4 sm:mx-10 lg:mx-20 sm:h-[55vh] md:h-[30vh] lg:h-[55vh] sm:rounded-lg sm:flex-row sm:justify-between">
        {/* Main profile image */}
        <div className="relative w-full aspect-[16/9] sm:w-[49.5%] sm:h-full sm:rounded-l-xl">
          <Image
            src={clipper.brandProfilePicture || Thumbnail.src}
            alt={clipper.brandName}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none cursor-pointer"
            quality={95}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        {/* Portfolio images grid for desktop, horizontal scroll for mobile */}
        <div className="flex flex-row sm:flex-col w-full sm:w-[49.5%] gap-2 overflow-x-auto sm:h-full sm:flex-wrap sm:justify-between">
          {portfolioImages.length > 0 ? (
            portfolioImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`relative min-w-[45vw] h-40 sm:min-w-0 sm:w-[49.5%] sm:h-[49%] ${
                  index === 1
                    ? "sm:rounded-tr-xl"
                    : index === 3 || ""
                    ? "sm:rounded-br-xl"
                    : ""
                }`}
              >
                <Image
                  src={img.imageUrl || Thumbnail.src}
                  alt={`Social media post ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className={`rounded-xl sm:rounded-none cursor-pointer ${
                    index === 1
                      ? "sm:rounded-tr-xl"
                      : index === 3|| "" 
                      ? "sm:rounded-br-xl"
                      : ""
                  }`}
                  quality={95}
                  sizes="(max-width: 640px) 90vw, 50vw"
                />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-40 text-gray-400">
              No portfolio images
            </div>
          )}
        </div>
      </div>
      {/* Info and CTA section */}
      <div className="flex flex-col sm:flex-row justify-between p-3 sm:p-0 sm:mr-24 lg:mr-20 sm:ml-10 lg:ml-16 sm:gap-1 sm:mb-5 sm:mt-3">
        <div className="mt-2 md:p-3 md:m-0 md:text-left">
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
        <div className="mt-2 lg:mr-0 lg:flex lg:gap-20 xl:gap-48">
          <CTAButton
            CustomClass={"block"}
            Text={
              userType === "creator"
                ? "Submit clip for review"
                : userType === "clipper"
                ? "Clippers can't submit clips"
                : "Sign in for clip submission"
            }
            onClick={
              isSignedIn && userType === "creator"
                ? () => dispatch(setClipSubmission())
                : () => router.push("/signin")
            }
            disabled={userType === "clipper"}
            AriaLabel={"Submit clip for review"}
          />
          <p className="text-center md:text-2xl mt-2 sm:m-0 font-medium">
            £{clipper.pricePerPost} per post
          </p>
        </div>
      </div>
      <Modal isOpen={open}>
        <ClipSubmission clipperId={clipper.id} />
      </Modal>
    </div>
  );
};
export default ClipperInfo;
