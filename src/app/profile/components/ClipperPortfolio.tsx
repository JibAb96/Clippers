"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Image from "next/image";
import { getClipperPortfolioImages } from "@/state/Clippers/clipperThunks";
import { PortfolioImage } from "../../../model";
import { RootState } from "@/state/store";

interface ClipperPortfolioProps {
  clipperId: string;
}

const ClipperPortfolio: React.FC<ClipperPortfolioProps> = ({ clipperId }) => {
  const dispatch = useAppDispatch();
  const { portfolioImages, portfolioLoading, portfolioError } = useAppSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (clipperId) {
      dispatch(getClipperPortfolioImages(clipperId));
    }
  }, [clipperId, dispatch]);

  if (portfolioLoading) {
    return (
      <div className="bg-quarternary rounded-xl shadow-sm p-4 md:p-6 text-center">
        <p className="text-lg text-gray-500">Loading portfolio...</p>
      </div>
    );
  }

  if (portfolioError) {
    return (
      <div className="bg-quarternary rounded-xl shadow-sm p-4 md:p-6 text-center">
        <p className="text-lg text-red-500">
          Error loading portfolio: {portfolioError}
        </p>
      </div>
    );
  }

  if (!portfolioImages || portfolioImages.length === 0) {
    return (
      <div className="bg-quarternary rounded-xl shadow-sm p-4 md:p-6">
        <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
          Portfolio
        </h3>
        <p className="text-lg text-gray-500 text-center">
          No portfolio images to display.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-quarternary rounded-xl shadow-sm p-4 md:p-6">
      <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {portfolioImages.map((image: PortfolioImage) => (
          <div
            key={image.id}
            className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Image
              src={image.imageUrl}
              alt={`Portfolio image ${image.id}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipperPortfolio;
