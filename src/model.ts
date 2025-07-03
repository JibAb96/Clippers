// Import necessary type definitions for the FontAwesome icon set
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Type definition for a review. Each review contains:
// - creator (name of the reviewer)
// - stars (rating out of 5)
// - review (text of the review)
export type Review = {
  creator: string;
  stars: number;
  review: string;
};

export type PortfolioImage = {
  imageUrl: string;
  id: string;
};
export type Guidelines = {
  id: string;
  createdAt: string;
  clipperId: string;
  guideline: string;
  updatedAt: string;
};

// Type definition for a Clipper (an entity that represents a clipper profile)
export type Clipper = {
  id: string;
  fullName: string;
  brandName: string;
  email: string;
  socialMediaHandle: string;
  platform: string;
  niche: string;
  country: string;
  followerCount: number;
  pricePerPost: number;
  brandProfilePicture: string | null;
};

// Type definition for a creator (an entity that represents a creator profile)
export type Creator = {
  id: string;
  fullName: string;
  brandName: string;
  email: string;
  socialMediaHandle: string;
  platform: string;
  niche: string;
  country: string;
  brandProfilePicture: string | null;
};

// Type definition for a Category, which includes an icon (FontAwesome) and a name
export type Category = {
  id: number;
  icon: IconDefinition; // FontAwesome icon associated with the category
  name: string;
};

// Type definition for SentClip status, representing the state of a sent clip
export type SentClip = {
  status: "Rejected" | "Pending Review" | "Posted"; // Possible states for a sent clip
};

// Type definition for SubmittedClip status, representing the state of a submitted clip
export type SubmittedClip = {
  status: "New Submission" | "Rejected" | "Posted"; // Possible states for a submitted clip
};

// CombinedStatus type, which includes the statuses from both SentClip and SubmittedClip

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

export interface RegistrationApiResponse {
  data?: {
    token: string;
  };
  // include other fields returned by your API if needed
  [key: string]: unknown;
}

// Generic API Response Type from your backend examples
export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

// DTO for updating Creator profile
export interface IUpdateCreator {
  fullName?: string;
  brandName?: string;
  socialMediaHandle?: string;
  platform?: string;
  niche?: string;
  country?: string;
}

// DTO for updating Clipper profile
export interface IUpdateClipper {
  fullName?: string;
  brandName?: string;
  socialMediaHandle?: string;
  platform?: string;
  niche?: string;
  country?: string;
  followerCount?: number;
}

// DTO for deleting a profile image
export interface IDeleteImage {
  brandName: string; // As per your backend endpoint
}

// Definition for API Error structure
export interface ApiError {
  message: string; // General error message
  response?: {
    // Optional response object, typically from Axios
    data?: {
      message?: string; // Message from backend error response
      status?: string; // Status from backend error response
      // You can add other specific fields your backend might return in an error
    };
    status?: number; // HTTP status code
  };
}
