import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clippers from "../../database/clippers";
import ClipperInfo from "./ClipperInfo";
import Guidlines from "./Guidlines";
import Reviews from "./Reviews";
import Modal from "../Modals/Modal";
import VideoSubmission from "../Modals/VideoSubmission";

const ClipperProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //Clipper id passed on by search page based on clipper selected
  //Id passed on through url
  const { id } = useParams();
  const clipper = clippers.find((clipper) => clipper.id === Number(id));
  if (!clipper) {
    return (
      <div className="h-screen flex flex-col justify-center content-center flex-wrap">
        <h1 className="text-4xl font-bold">Clipper Profile Not Found</h1>
        <p className="text-center">
          To find clippers click{" "}
          <a href="/" className="text-skyblue">
            here
          </a>
        </p>
      </div>
    );
  }

  //Page renders the clippers information, guidelines and reviews
  return (
    <div className="pt-14 bg-primary">
      <div>
        <ClipperInfo Clipper={clipper} setIsModalOpen={setIsModalOpen} />
        <hr />
        <Guidlines Clipper={clipper} />
        <hr />
        <Reviews Clipper={clipper} />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <VideoSubmission
            recipientId="12345"
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ClipperProfile;
