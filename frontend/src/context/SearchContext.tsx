import React, { createContext,useContext, useState, PropsWithChildren } from "react";
import { Clipper, Category } from "../model"; 
import clippers from "../database/clippers";
type SearchContextType = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  filteredClippers: Clipper[]
  setFilteredClippers: React.Dispatch<React.SetStateAction<Clipper[]>>
  selectedFilters: Category[]
  setSelectedFilters: React.Dispatch<React.SetStateAction<Category[]>>
  filterClippers: () => void
};
export const SearchContext = createContext<SearchContextType>(null!);

export const useSearchContext = () => useContext(SearchContext)

export const SearchProvider = ({ children }: PropsWithChildren) => {
  // These states are for the search bar input, list of filters selected and list of clippers
  // after being filtered by category

  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Category[]>([]);
  const [filteredClippers, setFilteredClippers] = useState(clippers);

  // This is a function that filter the list of clippers based on the categories in the
  // selectedFilters state.
  const filterClippers = () => {
    if (selectedFilters.length > 0) {
      let tempClippers = selectedFilters.map((selectedCategory) => {
        let temp = clippers.filter(
          (clipper) => clipper.niche === selectedCategory.name
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
        filterClippers,
        filteredClippers,
        setFilteredClippers,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
