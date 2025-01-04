import React,{ useEffect } from "react";
import SearchBar from "./SearchBar";
import ClippersDisplay from "./ClippersDisplay";
import Filter from "./Filter";

const SearchPage = () => {
  // Search Page so far includes a title, a searc bar, filter and section with clipper profiles

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-20">
      <h1 className="font-bold font-DM text-4xl text-center my-10">
        Discover
        <span className="text-skyblue font-DM font-bold tracking-wide">
          {" "}
          clippers
        </span>
        , Amplify Your Reach
      </h1>
      <SearchBar />
      <hr className="mt-5" />
      <Filter />
      <ClippersDisplay />
    </div>
  );
};

export default SearchPage;
