import React from "react";
import { useSearchContext } from "../../context/SearchContext";
// Search Bar for finding clippers, made using tailwind css

const SearchBar = () => {
  // Search Bar designed with tailwind and the input sets the search stat in SearchContext
  const { setSearch } = useSearchContext();
  return (
    <div className="bg-white flex items-center px-4 py-2 rounded-full border border-gray-300 shadow-md max-w-lg mx-auto font-sans">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for clippers"
        className="w-full outline-none bg-transparent pl-4 text-base text-gray-700 placeholder-gray-400"
      />
      <button
        type="button"
        className="ml-2 bg-skyblue hover:bg-blue-600 text-white text-base rounded-full p-2 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
