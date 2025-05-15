"use client";
import React, { useEffect } from "react";
import ClipperCard from "./ClipperCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { filterClippers } from "@/state/Clippers/clippers";
import { fetchClippers } from "@/state/Clippers/clipperThunks";
import { Clipper } from "../../model";
import Thumbnail from "../../assets/images/thumbnail.png";

const ClippersDisplay = () => {
  const search = useAppSelector((state) => state.search);
  const category = useAppSelector((state) => state.selectCategory);
  const {
    items: clippers,
    loading,
    error,
  } = useAppSelector((state) => state.clippers);
  const dispatch = useAppDispatch();

  // Fetch clippers from API on component mount
  useEffect(() => {
    dispatch(fetchClippers());
  }, [dispatch]);

  // Apply category filtering
  useEffect(() => {
    dispatch(filterClippers(category));
  }, [category, dispatch]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="grid justify-center">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center">
        {clippers
          .filter(
            (clipper: Clipper) =>
              search.toLowerCase() === "" ||
              clipper.brandName.toLowerCase().includes(search.toLowerCase())
          )
          .map((clipper: Clipper) => (
            <ClipperCard
              key={clipper.id}
              id={clipper.id}
              src={clipper.brandProfilePicture || Thumbnail.src}
              Niche={clipper.niche}
              Platform={clipper.platform}
              Followers={clipper.followerCount}
              Price={clipper.pricePerPost}
              ClipperName={clipper.brandName}
            />
          ))}
      </div>
      {clippers.length === 0 && !loading && !error && (
        <div className="text-gray-500 text-center p-4">No clippers found</div>
      )}
    </div>
  );
};

export default ClippersDisplay;
