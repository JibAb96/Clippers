import React from "react";
import { Clip } from "../../../state/Clips/clipsSlice";

type Props = {
  Clips: Clip[];
  HeadingOne: string;
  HeadingTwo: string;
  HeadingThree: string;
};

const ClipStatusHeadings = ({
  Clips,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
}: Props) => {
  return (
    <div className="max-w-fit my-5 rounded-xl mx-auto sm:mx-10 sm:max-w-full sm:p-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Clips */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 transition-all duration-300 border-2 hover:shadow-md">
          <h2 className="text-sm font-medium text-gray-600 mb-2 text-center">
            Total Clips
          </h2>
          <h3 className="text-center font-bold text-4xl text-gray-900">{Clips.length}</h3>
        </div>

        {/* HeadingOne */}
        <div className="hover:bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
          <h2 className="text-center text-sm font-medium text-blue-600 mb-2">
            {HeadingOne}
          </h2>
          <h3 className="text-center font-bold text-4xl text-blue-600">
            {Clips.filter((clip) => clip.status === "pending").length}
          </h3>
        </div>

        {/* HeadingTwo */}
        <div className="hover:bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
          <h2 className="text-center text-sm font-medium text-green-700 mb-2">
            {HeadingTwo}
          </h2>
          <h3 className="text-center font-bold text-4xl text-green-700">
            {Clips.filter((clip) => clip.status === "approved").length}
          </h3>
        </div>

        {/* HeadingThree */}
        <div className="hover:bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
          <h2 className="text-center text-sm font-medium text-secondary mb-2">
            {HeadingThree}
          </h2>
          <h3 className="text-center font-bold text-4xl text-secondary">
            {Clips.filter((clip) => clip.status === "rejected").length}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ClipStatusHeadings;
