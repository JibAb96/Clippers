"use client";
import React, { useEffect } from "react";
import ClipperCard from "./ClipperCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { filterClippers } from "@/state/Clippers/clippers";
import { Clipper } from "../../../model";

const ClippersDisplay = () => {
  const search = useAppSelector((state) => state.search);
  const category = useAppSelector((state) => state.selectCategory);
  const clippers = useAppSelector((state) => state.clippers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterClippers(category));
  }, [category, dispatch]);

  return (
    <div className="grid justify-center">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {clippers
          .filter(
            (clipper: Clipper) =>
              search.toLowerCase() === "" ||
              clipper.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((clipper: Clipper) => (
            <ClipperCard
              key={clipper.id}
              id={clipper.id}
              src={clipper.thumbnail.src}
              Niche={clipper.niche}
              Platform={clipper.platform}
              Followers={clipper.followers}
              Price={clipper.price}
              ClipperName={clipper.name}
            />
          ))}
      </div>
    </div>
  );
};

export default ClippersDisplay;
