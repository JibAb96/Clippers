import React from "react";

const DashboardSections = () => {
  //Different headings for displaying different information
  return (
    <div className="max-w-fit px-10 m-auto my-5 border-2 border-paleblue bg-white sm:mx-0 sm:mx-10 sm:max-w-full sm:p-5">
      <div className="text-lg items-center mx-3 flex-col gap-10 sm:flex sm:flex-row">
        <div>
          <a href=".">
            <h2 className="hover:text-skyblue">All Clips</h2>
          </a>
        </div>
        <div>
          <a href=".">
            <h2 className="hover:text-skyblue">Messages</h2>
          </a>
        </div>
        <div>
          <a href=".">
            <h2 className="hover:text-skyblue">Analytics</h2>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardSections;
