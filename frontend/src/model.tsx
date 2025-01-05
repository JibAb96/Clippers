import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type Review = {
  creator: string;
  stars: number;
  review: string;
};

export type Clipper = {
  id: number;
  name: string;
  followers: number;
  platform: "Instagram" | "Twitter" | "TikTok" | "YouTube";
  niche: string;
  price: number;
  thumbnail: string;
  images: string[];
  guidelines: string[];
  reviews: Review[];
};

export type Category = {
  id: number;
  icon: IconDefinition;
  name: string;
};

export type SentClip = {
  status: "Rejected" | "Pending" | "Posted";
};

export type SubmittedClip = {
  status: "New Submission" | "Rejected" | "Ready For Upload" | "Posted";
};

type CombinedStatus = SentClip["status"] | SubmittedClip["status"];

export type Clip = {
  id: number;
  name: string;
  status: CombinedStatus;
  user: string;
  platform: string;
  thumbnail: string;
};
