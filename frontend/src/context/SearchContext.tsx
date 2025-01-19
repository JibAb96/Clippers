import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useReducer,
} from "react";
import { Clipper, Category, Clip, ClippersReducer, Action } from "../model";
import clippers from "../database/clippers";
import { Profile } from "../model";

// Define the type for the context to ensure proper data structure and type safety
type SearchContextType = {
  search: string; // The current search query
  setSearch: React.Dispatch<React.SetStateAction<string>>; // Function to update the search query
  filteredClippers: Clipper[]; // List of filtered clippers
  selectedFilters: Category[]; // List of selected category filters
  setSelectedFilters: React.Dispatch<React.SetStateAction<Category[]>>; // Function to update selected filters
  filterClips: (clips: Clip[]) => void; // Function to filter the clips based on selected status
  filteredClips: Clip[]; // List of filtered clips after applying the filter
  setFilteredClips: React.Dispatch<React.SetStateAction<Clip[]>>; // Function to update filtered clips
  setStatus: React.Dispatch<React.SetStateAction<string>>; // Function to set status filter for clips
  status: string; // The current status filter for clips
  isSignedIn: boolean; // Boolean to track if the user is signed in
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function to update sign-in status
  dispatch: React.ActionDispatch<[actions: Action]>; // Function to dispatch actions for reducer
  user: Profile | null; // This state holds the information of the current user that is signed in
  setUser: React.Dispatch<React.SetStateAction<Profile | null>>;// Function to update current user signed in
  selectedClip: Clip;
  setSelectedClip: React.Dispatch<React.SetStateAction<Clip>>;
};

// Create a context for the search functionality with a defined type
export const SearchContext = createContext<SearchContextType>(null!);

// Custom hook to access the search context easily
export const useSearchContext = () => useContext(SearchContext);

// The SearchProvider component provides the context value to its children
export const SearchProvider = ({ children }: PropsWithChildren) => {
  // States for managing the search query, selected filters, filtered clippers, and other related functionality
  const [search, setSearch] = useState<string>(""); // Initialize search query state
  const [selectedFilters, setSelectedFilters] = useState<Category[]>([]); // Initialize selected filters state
  const [filteredClippers, dispatch] = useReducer(ClippersReducer, clippers); // Initialize filtered clippers with a reducer
  const [status, setStatus] = useState<string>(""); // Initialize status filter state
  const [filteredClips, setFilteredClips] = useState<Clip[]>([]); // Initialize filtered clips state
  const [isSignedIn, setIsSignedIn] = useState(false); // Initialize sign-in state
  const [user, setUser] = useState<Profile | null>(null) //State controlling the user that is currently signed in
  const [selectedClip, setSelectedClip] = useState<Clip>({
    id: 0,
    title: "",
    status: "Pending Review",
    user: "",
    platform: "Instagram",
    thumbnail: "",
  }); //State revealing information og clips that have been selected on a dashboard

  // Function to filter the clips based on the selected status
  const filterClips = (clips: Clip[]) => {
    
      // If status filter is set, filter clips based on the status
     if (clips && status) {
        let tempClips = clips.filter((clip: Clip) => clip.status === status);
        setFilteredClips(tempClips.flat()); // Set filtered clips after status filter
      } else {
        // If theres no status filter, revert to unfiltered clips
        setFilteredClips(clips);
      }
    }
  ;

  return (
    <SearchContext.Provider
      value={{
        search, // Provide current search query
        setSearch, // Provide function to update search query
        dispatch, // Provide dispatch function for the reducer
        filterClips, // Provide filterClips function
        filteredClippers, // Provide filtered clippers list
        filteredClips, // Provide filtered clips list
        setFilteredClips, // Provide function to update filtered clips
        selectedFilters, // Provide selected filters list
        setSelectedFilters, // Provide function to update selected filters
        setStatus, // Provide function to update status filter
        status, // Provide current status filter
        isSignedIn, // Provide sign-in status
        setIsSignedIn, // Provide function to update sign-in status
        user, //Provides user information
        setUser, //Provide function to set user information for user thats logged in
        selectedClip,//This state provide information on clips selected on dashboard
        setSelectedClip //This state allows for selectClip to be updated to the selected clip
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
