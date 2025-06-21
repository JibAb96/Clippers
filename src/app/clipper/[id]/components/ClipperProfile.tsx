"use client";
import React, { useEffect } from "react";
import ClipperInfo from "./ClipperInfo";
import Guidlines from "./Guidlines";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  getClipperById,
  getClipperPortfolioImages,
  getClipperGuidelines,
} from "@/state/Clippers/clipperThunks";

const ClipperProfile = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getClipperById(id));
      dispatch(getClipperPortfolioImages(id));
      dispatch(getClipperGuidelines(id));
    }
  }, [dispatch, id]);

  const {
    clipper,
    portfolioImages,
    loading,
    error,
    portfolioLoading,
    portfolioError,
    guidelinesLoading,
    guidelinesError,
  } = useAppSelector((state) => state.selectedClipper);

  if (loading === "pending") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        <p className="ml-3 text-lg">Loading clipper details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 min-h-screen">
        Error fetching clipper details: {error}
      </div>
    );
  }

  if (loading === "succeeded" && !clipper) {
    return (
      <div className="h-screen flex flex-col justify-center content-center flex-wrap items-center">
        <h1 className="text-4xl font-bold">Clipper Profile Not Found</h1>
        <p className="text-center mt-2">
          To find clippers click{" "}
          <Link href="/" className="text-skyblue">
            here
          </Link>
        </p>
      </div>
    );
  }

  if (!clipper) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Waiting for clipper data...</p>
      </div>
    );
  }

  return (
    <div className="bg-primary">
      <ClipperInfo clipper={clipper} portfolioImages={portfolioImages} />
      {portfolioLoading === "pending" && (
        <div className="text-center p-2">Loading portfolio...</div>
      )}
      {portfolioError && (
        <div className="text-red-500 text-center p-2">
          Error loading portfolio: {portfolioError}
        </div>
      )}
      <hr />
      {guidelinesLoading === "pending" && (
        <div className="text-center p-2">Loading guidelines...</div>
      )}
      {guidelinesError && (
        <div className="text-red-500 text-center p-2">
          Error loading guidelines: {guidelinesError}
        </div>
      )}
        <Guidlines />
      <hr />
    </div>
  );
};

export default ClipperProfile;
