import React from "react";
import { Clipper } from "../../model";
type Props = {
  Clipper: Clipper
}
const Guidlines = ({ Clipper }: Props) => {
  //Displaying guideline information for clippers
  return (
    <div className="ml-5 my-3 flex flex-col gap-5 lg:flex-row xl:text-lg xl:mx-20 xl:my-10">
      <div>
        <h2 className="text-secondary font-semibold text-xl sm:text-2xl  xl:text-3xl">
          Submission Guidlines
        </h2>
        <div className="xl:mt-5 font-medium flex flex-col gap-2 xl:gap-4 ">
          <p>
            <span className="font-bold">Video Length:</span> Maximum 90 seconds
          </p>
          <p>
            <span className="font-bold">Video Format:</span> MP4
          </p>
          <p>
            <span className="font-bold">Video Resolution:</span> Minimum 1080p
          </p>
          <p>
            All submissions <span className="font-bold">must</span> comply with
            copyright laws
          </p>
          <p>
            All submissions <span className="font-bold">must</span> comply with
            community guidlines
          </p>
          <p>
            Submissions only posted <span className="font-bold">after</span>{" "}
            full payment confirmation
          </p>
          <p>Clips will be posted at agreed scheduled date and time</p>
        </div>
      </div>
      <div>
        <h2 className="text-secondary text-xl font-semibold sm:text-2xl xl:text-3xl">Custom Guidlines</h2>
        <div className="xl:mt-5 font-medium flex flex-col xl:gap-4">
          {Clipper.guidelines.map((guideline, index) => (
            <p key={index}>{guideline}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guidlines;
