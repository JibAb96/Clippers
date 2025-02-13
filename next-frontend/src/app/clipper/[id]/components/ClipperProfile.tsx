import React from "react";
import ClipperInfo from "./ClipperInfo";
import Guidlines from "./Guidlines";
import Reviews from "./Reviews";
import Modal from "../../../../components/Modal";
import ClipSubmission from "./ClipSubmission";
import Link from "next/link"
import { useAppSelector } from "@/app/hooks";
const ClipperProfile = ({id}: {id: string}) => {
  //Clipper id passed on by search page based on clipper selected
  //Id passed on through url

  const clippers = useAppSelector((state) => state.clippers);
  const clipper = clippers.find((clipper) => clipper.id === Number(id));
  if (!clipper) {
    return (
      <div className="h-screen flex flex-col justify-center content-center flex-wrap">
        <h1 className="text-4xl font-bold">Clipper Profile Not Found</h1>
        <p className="text-center">
          To find clippers click{" "}
          <Link href="/" className="text-skyblue">
            here
          </Link>
        </p>
      </div>
    );
  }

  //Page renders the clippers information, guidelines and reviews
  return (
      <div className="bg-primary">
        <ClipperInfo clipper={clipper}/>
        <hr />
        <Guidlines Clipper={clipper} />
        <hr />
        <Reviews Clipper={clipper} />
        <Modal>
          <ClipSubmission
            recipientId="12345"
          />
        </Modal>
      </div>
  );
};

export default ClipperProfile;
