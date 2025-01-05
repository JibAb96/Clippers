import React from "react";
import { useSearchContext } from "../../context/SearchContext";

type Props = {
  HeadingOne: string;
  HeadingTwo: string;
  HeadingThree: string;
  HeadingFour?: string;
};

const DashboardSections = ({
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
}: Props) => {
  const { setStatus } = useSearchContext();
  //Different headings for displaying different information
  return (
    <div className="max-w-fit px-10 m-auto my-5 border-2 border-paleblue bg-white sm:mx-0 sm:mx-10 sm:max-w-full sm:p-5">
      <div className="text-lg items-center mx-3 flex-col gap-10 sm:flex sm:flex-row">
        <div>
          <button onClick={() => setStatus("")}>
            <h2 className="hover:text-skyblue">All Clips</h2>
          </button>
        </div>
        <div>
          <button onClick={() => setStatus(HeadingOne)}>
            <h2 className="hover:text-skyblue">{HeadingOne}</h2>
          </button>
        </div>
        <div>
          <button onClick={() => setStatus(HeadingTwo)}>
            <h2 className="hover:text-skyblue">{HeadingTwo}</h2>
          </button>
        </div>
        <div>
          <button onClick={() => setStatus(HeadingThree)}>
            <h2 className="hover:text-skyblue">{HeadingThree}</h2>
          </button>
        </div>
        {HeadingFour ? (
          <div>
            <button onClick={() => setStatus(HeadingFour)}>
              <h2 className="hover:text-skyblue">{HeadingFour}</h2>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashboardSections;
