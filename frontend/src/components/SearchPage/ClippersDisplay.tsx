import React from "react";
import ClipperCard from "../Cards/ClipperCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Clipper } from "../../model";

const ClippersDisplay = () => {
  // Extracting search term and filtered clippers data from the SearchContext
  const filteredClippers: Clipper[] = useSelector(
    (state: RootState) => state.clippers
  );
  const search = useSelector((state: RootState) => {
    return state.search.value;
  });
  // React Router's navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle click events on a ClipperCard, navigates to the clipper's profile page
  const handleClick = (id: number) => {
    navigate(`/profile/${id}`); // Navigates to the dynamic profile URL based on the clipper's ID
  };

  return (
    /*
      The parent container for the ClipperCard grid display. 
      Ensures the layout is centered and responsive for different screen sizes.
    */
    <div className="grid justify-center">
      {/* 
        Responsive grid layout for displaying ClipperCards.
        Uses Tailwind's utility classes to define grid behavior for different screen sizes.
      */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {filteredClippers
          .filter((clipper) =>
            search.toLowerCase() === ""
              ? clipper
              : clipper.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((clipper) => (
            // Render ClipperCard for each filtered clipper
            <ClipperCard
              key={clipper.id} // Unique key for React's reconciliation process
              Image={clipper.thumbnail} // Thumbnail image of the clipper
              Niche={clipper.niche} // The niche the clipper operates in
              Platform={clipper.platform} // Social media platform of the clipper
              Followers={clipper.followers} // Number of followers the clipper has
              Price={clipper.price} // Pricing for the clipper's services
              ClipperName={clipper.name} // Name of the clipper
              onClick={() => handleClick(clipper.id)} // Click handler to navigate to clipper's profile
            />
          ))}
      </div>
    </div>
  );
};

export default ClippersDisplay;
