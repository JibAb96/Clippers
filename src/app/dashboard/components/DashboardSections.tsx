"use client";
import React from "react";
import { setStatus } from "@/state/Clips/statusSlice";
import { useAppDispatch } from "@/app/hooks";

type Props = {
  HeadingOne: string;
  HeadingTwo: string;
  HeadingThree: string;
};

const DashboardSections = ({ HeadingOne, HeadingTwo, HeadingThree }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <nav className="max-w-fit bg-white px-10 m-auto rounded-xl mb-3 sm:mx-10 sm:max-w-full sm:p-5">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
        {/* All Clips */}
        <button
          onClick={() => dispatch(setStatus(null))}
          className="group relative w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
        >
          <span className="font-medium group-hover:text-gray-900">
            All Clips
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
        </button>
        {/* HeadingOne */}
        <button
          onClick={() => {
            dispatch(setStatus("pending"));
          }}
          className="group relative w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
        >
          <span className=" font-medium group-hover:text-blue-700">
            {HeadingOne}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
        </button>

        {/* HeadingTwo */}
        <button
          onClick={() => dispatch(setStatus("approved"))}
          className="group relative w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-200 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
        >
          <span className="font-medium group-hover:text-green-700">
            {HeadingTwo}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
        </button>

        {/* HeadingThree */}
        <button
          onClick={() => dispatch(setStatus("rejected"))}
          className="group relative w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-200 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:ring-offset-2"
        >
          <span className="font-medium group-hover:text-red-600">
            {HeadingThree}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D20B4E] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
        </button>
      </div>
    </nav>
  );
};

export default DashboardSections;
