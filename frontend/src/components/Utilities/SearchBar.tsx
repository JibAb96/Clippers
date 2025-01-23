import React from "react";
import { Search } from "lucide-react"; // Importing the Search icon from lucide-react library
import { useDispatch } from "react-redux";
import { setSearch } from "../../state/SearchClippers/searchClippers";

// Props definition for SearchBar component with type annotations for better TypeScript support
type Props = {
  isScrolled: boolean; // Boolean to determine if the page has been scrolled
  isSearchExpanded: boolean; // Boolean to control if the search bar is expanded
  handleSearchClick: () => void; // Function passed as prop to handle search bar clicks
};

const SearchBar = ({
  isScrolled,
  isSearchExpanded,
  handleSearchClick,
}: Props) => {
  // Use the redux useDispatch hook to manage the search state
  const dispatch = useDispatch();
  return (
    <div
      onClick={handleSearchClick} // Triggers the passed function when the search bar is clicked
      className={`
        bg-white py-2.5 px-2 flex items-center w-2/3 rounded-full 
        border border-gray-300 shadow-md drop-shadow-2xl mx-auto mb-2 font-sans 
        lg:transition-all lg:duration-300 
        ${isScrolled && !isSearchExpanded ? "lg:w-96" : "lg:max-w-2xl lg:w-1/2"}
      `} // Tailwind CSS class logic for responsive design, dynamic width and styling
    >
      <input
        type="text" // Standard input field for text search
        onChange={(e) => dispatch(setSearch(e.target.value))} // Update search state on text change
        placeholder="Search for clippers" // Placeholder text to guide the user
        className="w-full outline-none bg-transparent pl-4 text-base text-gray-700 placeholder-gray-400" // Tailwind styling for input field
        aria-label="search-bar"
      />
      <button
        type="button" // Button for submitting the search, although functionality is not implemented here
        className="ml-2 bg-secondary hover:bg-blue-600 text-white text-base rounded-full p-2 flex justify-center items-center" // Tailwind styling for button
        aria-label="search button added for styling"
      >
        {/*Search icon from lucide-react with styling*/}
        <Search className="text-white" size={20} aria-hidden="false" />
      </button>
    </div>
  );
};

export default SearchBar; // Default export of the SearchBar component
