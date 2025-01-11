import React, { useEffect } from "react";
import ClippersDisplay from "./ClippersDisplay"; 
import Filter from "./Filter"; 
import { useSearchContext } from "../../context/SearchContext"; 
import { ACTIONS } from "../../model";

const SearchPage = () => {
  // Destructuring context values for dispatch function and selectedFilters from the SearchContext
  const { dispatch, selectedFilters } = useSearchContext();

  // Effect hook to ensure the page scrolls to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Effect hook to dispatch an action to filter clippers when selectedFilters change
  useEffect(() => {
    dispatch({
      type: ACTIONS.FILTER_CLIPPERS, // Dispatch the action to filter the clippers
      payload: { selectedFilters: selectedFilters }, // Pass the selected filters as payload
    });
    // eslint-disable-next-line
  }, [selectedFilters]); // Dependency array ensures this effect runs when selectedFilters change

  return (
    <div className="pt-10 lg:pt-56 bg-primary">
      <hr className="md:mt-5" /> {/* Horizontal line to separate sections */}
      <Filter /> {/* Render the Filter component for the user to select filters */}
      <ClippersDisplay /> {/* Render the ClippersDisplay component to show filtered clippers */}
    </div>
  );
};

export default SearchPage; 
