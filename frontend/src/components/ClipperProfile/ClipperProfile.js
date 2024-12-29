import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import clippers from "../../database/clippers.js";
import ClipperInfo from "./ClipperInfo.js";
import Guidlines from "./Guidlines.js";
import Reviews from "./Reviews.js";

const ClipperProfile = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //Clipper id passed on by search page based on clipper selected
  //Id passed on through url 
  const { id } = useParams();
  const clipper = clippers.find((clipper) => clipper.id === Number(id));

  //Page renders the clippers information, guidelines and reviews
  return (
    <div className="pt-20">
        <ClipperInfo Clipper={clipper} />
        <hr />
        <Guidlines Clipper={clipper} />
        <hr />
        <Reviews Clipper={clipper} />
    </div>
  );
};

export default ClipperProfile;
