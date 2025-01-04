import React from "react";

const ClipStatusHeadings = () => {
  //Heading displaying the number of clips with each status
  return (
    <div className="max-w-fit px-10 text-center m-auto border-2 border-paleblue bg-white rounded-lg sm:mx-10 sm:max-w-full sm:text-left sm:p-5">
      <div className="text-lg flex-col gap-10 sm:gap-36 mx-3 mt-3 items-center sm:flex sm:flex-row sm:m-0">
        <div>
          <h2>Total Clips</h2>
          <h3 className="font-bold text-3xl">8</h3>
        </div>
        <div>
          <h2>Published</h2>
          <h3 className="font-bold text-3xl text-green-400">3</h3>
        </div>
        <div>
          <h2>Pending</h2>
          <h3 className="font-bold text-3xl text-yellow-400">3</h3>
        </div>
        <div>
          <h2>Rejected</h2>
          <h3 className="font-bold text-3xl text-red-600">2</h3>
        </div>
      </div>
    </div>
  );
};

export default ClipStatusHeadings;
