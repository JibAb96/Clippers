import React from "react";
import SearchBar from "./SearchBar";
import ClipperProfiles from "./ClipperProfiles";
import Filter from "./Filter";
const SearchPage = () => {
  // Search Page so far includes a title, a searc bar, filter and section with clipper profiles
    return (
    <div>
      <h1 className="font-bold font-DM text-4xl text-center mb-10">
        Discover
        <span className="text-skyblue font-DM font-bold tracking-wide">
          {" "}
          clippers
        </span>
        , Amplify Your Reach
      </h1>
      <SearchBar />
      <hr className="mt-5" />
      <Filter/>
      <ClipperProfiles/>
    </div>
  );
};

export default SearchPage;
