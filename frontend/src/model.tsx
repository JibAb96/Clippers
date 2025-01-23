// Import necessary type definitions for the FontAwesome icon set
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// Import the 'clippers' data from a local database
import clippers from "./database/clippers";

// Type definition for a review. Each review contains:
// - creator (name of the reviewer)
// - stars (rating out of 5)
// - review (text of the review)
export type Review = {
  creator: string;
  stars: number;
  review: string;
};

// Type definition for a Clipper (an entity that represents a clipper profile)
export type Clipper = {
  id: number;
  name: string;
  followers: number;
  platform: "Instagram" | "X" | "TikTok" | "YouTube"; // Platform on which the clipper operates
  niche: string; // The category/niche the clipper is in
  price: number; // Price of the clipper's service
  thumbnail: string; // URL to the thumbnail image for the clipper
  images: string[]; // Array of image URLs representing the clipper
  guidelines: string[]; // Array of guidelines that the clipper follows
  reviews: Review[]; // Reviews related to the clipper
};

// Type definition for a Category, which includes an icon (FontAwesome) and a name
export type Category = {
  id: number;
  icon: IconDefinition; // FontAwesome icon associated with the category
  name: string;
};

// Type definition for SentClip status, representing the state of a sent clip
export type SentClip = {
  status: "Rejected" | "Pending Review" | "Posted" ; // Possible states for a sent clip
};

// Type definition for SubmittedClip status, representing the state of a submitted clip
export type SubmittedClip = {
  status: "New Submission" | "Rejected" | "Posted"; // Possible states for a submitted clip
};

// CombinedStatus type, which includes the statuses from both SentClip and SubmittedClip
export type CombinedStatus = SentClip["status"] | SubmittedClip["status"];

// Type definition for a Clip, which represents a submitted or sent clip with its status
export type Clip = {
  id: number;
  title: string; //The title of the clip
  status: CombinedStatus; // The status of the clip (can be one of the combined statuses)
  user: string; // The user who submitted the clip
  platform: "Instagram" | "X" | "TikTok" | "YouTube"; // Platform where the clip is posted
  video?: string; //This will contain the video clip
  thumbnail: string; // Thumbnail image for the clip
};

// Action types definition to be used in the reducer. 
// 'FILTER_CLIPPERS' and 'SORT_CLIPPERS' are the only action types handled in the reducer.
export const ACTIONS = {
  FILTER_CLIPPERS: "filter", // Action for filtering clippers
  SORT_CLIPPERS: "sort", // Action for sorting clippers
} as const; // 'as const' is used to infer the string literal types for the action types

// Type definition for the possible actions that the reducer can handle
export type Action =
  | {
      type: typeof ACTIONS.FILTER_CLIPPERS; // Action to filter clippers
      payload: { selectedFilters: Category[] }; // Payload contains the selected categories for filtering
    }
  | { 
      type: typeof ACTIONS.SORT_CLIPPERS; // Action to sort clippers
      payload: { isAscending: boolean }; // Payload contains whether the sorting is ascending or descending
    };

// The reducer function that handles filtering and sorting of clippers
export const ClippersReducer = (filteredClippers: Clipper[], actions: Action) => {
  switch (actions.type) {
    case ACTIONS.FILTER_CLIPPERS:
      // If filters are selected, filter the clippers based on the selected categories
      if (actions.payload.selectedFilters.length > 0) {
        let tempClippers = actions.payload.selectedFilters.map((selectedCategory) => {
          // Filter clippers by matching niche or platform with selected category
          let temp = clippers.filter(
            (clipper) =>
              clipper.niche === selectedCategory.name ||
              clipper.platform === selectedCategory.name
          );
          return temp; // Return the filtered list for this category
        });

        // Return the filtered clippers by flattening the array of arrays
        return tempClippers.flat();
      } else {
        // If no filters are selected, return the full list of clippers
        return [...clippers];
      }

    case ACTIONS.SORT_CLIPPERS:
      // Sort the filtered clippers by price, based on the ascending flag
      return [...filteredClippers].sort((a, b) =>
        actions.payload.isAscending ? a.price - b.price : b.price - a.price
      );

    default:
      // If no known action type, return the clippers unchanged
      return clippers;
  }
};
export type Profile = {
  id: number;
  role: "clipper" | "creator";
  name: string;
  brand_name: string;
  brandImage: string;
  socialMediaHandles: { platform: string; handle: string }[];
  email: string;
  niche: string;
  guidelines?: string[]; // Only for Clippers - Up to 4 guidlines
  engagementImages?: string[]; // Only for Clippers - Up to 4 images 
  followers?: number; // Only for Clippers
  pricePerPost?: number; // Only for Clippers
};