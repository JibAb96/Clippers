import React, { useEffect } from "react";
import ClippersDisplay from "./ClippersDisplay"; 
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { filterClippers } from "../../state/Clippers/filterClippers";

const SearchPage = () => {
  // Destructuring contexts for dispatch function and selectedFilters from the SearchContext
  const selectedCategory = useSelector((state: RootState) => state.selectCategory)
  const dispatch = useDispatch();
  // Effect hook to ensure the page scrolls to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Effect hook to dispatch an action to filter clippers when selectedFilters change
  useEffect(() => {
    dispatch(filterClippers(selectedCategory))
    // eslint-disable-next-line
  }, [selectedCategory]); // Dependency array ensures this effect runs when selectedCategory change

  return (
    <div className="pt-10 lg:pt-56 bg-primary">
      <hr className="md:mt-5" /> {/* Horizontal line to separate sections */}
      <Filter /> {/* Render the Filter component for the user to select filters */}
      <ClippersDisplay /> {/* Render the ClippersDisplay component to show filtered clippers */}
    </div>
  );
};

export default SearchPage; 
