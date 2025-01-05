import React from "react";
import { Clip } from "../../model";
type Props = {
  Clips: Clip[];
  HeadingOne: string;
  HeadingTwo: string;
  HeadingThree: string;
  HeadingFour?: string;
};

const ClipStatusHeadings = ({
  Clips,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
}: Props) => {
  //Heading displaying the number of clips with each status
  return (
    <div className="max-w-fit px-10 text-center m-auto border-2 border-paleblue bg-white rounded-lg sm:mx-10 sm:max-w-full sm:text-left sm:p-5">
      <div className="text-lg flex-col gap-10 sm:gap-36 mx-3 mt-3 items-center sm:flex sm:flex-row sm:m-0">
        <div>
          <h2>Total Clips</h2>
          <h3 className="font-bold text-3xl">{Clips.length}</h3>
        </div>
        {HeadingFour ? (
          <div>
            <h2>{HeadingFour}</h2>
            <h3 className="font-bold text-3xl text-skyblue">
              {Clips.filter((clip) => clip.status === HeadingFour).length}
            </h3>
          </div>
        ) : (
          ""
        )}
        <div>
          <h2>{HeadingOne}</h2>
          <h3 className="font-bold text-3xl text-yellow-400">
            {Clips.filter((clip) => clip.status === HeadingOne).length}
          </h3>
        </div>
        <div>
          <h2>{HeadingTwo}</h2>
          <h3 className="font-bold text-3xl text-green-400">
            {Clips.filter((clip) => clip.status === HeadingTwo).length}
          </h3>
        </div>
        <div>
          <h2>{HeadingThree}</h2>
          <h3 className="font-bold text-3xl text-red-600">
            {Clips.filter((clip) => clip.status === HeadingThree).length}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ClipStatusHeadings;
