import React, { createContext, useState } from "react";
import clippers from "../database/clippers";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // These states are for the search bar input, list of filters selected and list of clippers
  // after being filtered by category 
  
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredClippers, setFilteredClippers] = useState(clippers);
  

  // This is a function that filter the list of clippers based on the categories in the 
  // selectedFilters state.
  const filterClippers = () => {
    if (selectedFilters.length > 0) {
      let tempClippers = selectedFilters.map((selectedCategory) => {
        let temp = clippers.filter(
          (clipper) => clipper.niche === selectedCategory
        );
        return temp;
      });
      setFilteredClippers(tempClippers.flat());
    } else {
      setFilteredClippers([...clippers]);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        filteredClippers,
        setFilteredClippers,
        selectedFilters,
        setSelectedFilters,
        filterClippers,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
