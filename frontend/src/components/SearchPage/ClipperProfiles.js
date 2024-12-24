import React, { useContext, useEffect } from "react";
import ClipperCard from "../Cards/ClipperCard";
import { SearchContext } from "../../context/SearchContext.js";

const ClipperProfiles = () => {
  const { search, filteredClippers, filterClippers, selectedFilters } = useContext(SearchContext);

  useEffect(() => {
    filterClippers();
    // eslint-disable-next-line
  }, [selectedFilters])
  
  return (
    /*Here we filter through the filteredClippers array by input in the search bar and then map
    through the filteredClippers array and display the clipper on the search page*/
    <div className="grid grid-cols-4 m-5">
      {filteredClippers
        .filter((clipper) =>
          search.toLowerCase() === ""
            ? clipper
            : clipper.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((clipper) => (
          <ClipperCard
            key={clipper.id}
            Image={clipper.thumbnail}
            Niche={clipper.niche}
            Platform={clipper.platform}
            Followers={clipper.followers}
            Price={clipper.price}
            ClipperName={clipper.name}
          />
        ))}
    </div>
  );
};

export default ClipperProfiles;
