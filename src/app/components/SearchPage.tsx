import React from "react";
import ClippersDisplay from "./ClippersDisplay";
import Filter from "./Filter";
import DynamicTitleSection from "./DynamicTitleSection";

const SearchPage = () => {
  
  return (
    <div>
      <DynamicTitleSection />
      <hr/>
      {/* Horizontal line to separate sections */}
      <div className="mt-16 md:mt-24 lg:mt-64">
        <Filter />
        {/* Render the Filter component for the user to select filters */}
        <ClippersDisplay />
        {/* Render the ClippersDisplay component to show filtered clippers */}
      </div>
    </div>
  );
};

export default SearchPage;
