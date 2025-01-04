import React, { useContext, useEffect } from "react";
import ClipperCard from "../Cards/ClipperCard.js";
import { SearchContext } from "../../context/SearchContext.js";
import { useNavigate } from "react-router-dom";

const ClippersDisplay = () => {
  const { search, filteredClippers, filterClippers, selectedFilters } =
    useContext(SearchContext);

  useEffect(() => {
    filterClippers();
    // eslint-disable-next-line
  }, [selectedFilters]);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    /*Here we filter through the filteredClippers array by input in the search bar and then map
    through the filteredClippers array and display the clipper on the search page*/
    <div className="grid justify-center">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
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
              onClick={() => handleClick(clipper.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default ClippersDisplay;
