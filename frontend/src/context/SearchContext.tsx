import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import { Clipper, Category, Clip } from "../model";
import clippers from "../database/clippers";
type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredClippers: Clipper[];
  setFilteredClippers: React.Dispatch<React.SetStateAction<Clipper[]>>;
  selectedFilters: Category[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<Category[]>>;
  filterClippers: () => void;
  filterClips: (clips: Clip[]) => void;
  filteredClips: Clip[];
  setFilteredClips: React.Dispatch<React.SetStateAction<Clip[]>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
};
export const SearchContext = createContext<SearchContextType>(null!);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  // These states are for the search bar input, list of filters selected and list of clippers
  // after being filtered by category

  const [search, setSearch] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Category[]>([]);
  const [filteredClippers, setFilteredClippers] = useState<Clipper[]>(clippers);
  const [status, setStatus] = useState<string>("");
  const [filteredClips, setFilteredClips] = useState<Clip[]>([]);
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

  const filterClips = (clips: Clip[]) => {
    if (clips) {
      if (status) {
        let tempClips = clips.filter((clip: Clip) => clip.status === status);
        setFilteredClips(tempClips.flat());
      } else {
        setFilteredClips(clips);
      }
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        filterClippers,
        filterClips,
        filteredClippers,
        filteredClips,
        setFilteredClips,
        setFilteredClippers,
        selectedFilters,
        setSelectedFilters,
        setStatus,
        status,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
