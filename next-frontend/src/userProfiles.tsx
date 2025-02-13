import { Profile } from "../model";
import ImJustBait from "./assets/images/IMJUSTBAIT-Thumb.jpg";
import IJB1 from "./assets/images/ImJustBait_post1.png";
import IJB2 from "./assets/images/Imjustbait_post2.png";
import IJB3 from "./assets/images/Imjustbait_post3.png";
import IJB4 from "./assets/images/Imjustbait_post4.png";
import thumbnail from "./assets/images/thumbnail.png";

export const userProfiles: Profile[] = [
  {
    id: 1,
    role: "clipper",
    name: "John Doe",
    city: "Zurich",
    country: "Switzerland",
    brand_name: "ImJustBait",
    brandImage: ImJustBait,
    socialMediaHandles: [
      { platform: "Instagram", handle: "@ImJustBait" },
      { platform: "X", handle: "@ImJustBait" },
      { platform: "YouTube", handle: "@ImJustBait" },
    ],
    email: "imjustbait@gmail.com",
    engagementImages: [IJB1, IJB2, IJB3, IJB4],
    niche: "Entertainment",
    guidelines: [
      "Must be objective popular news",
      "Tone can be humorous, professional or inspirational",
    ],
    followers: 5000000,
    pricePerPost: 5000,
  },
  {
    id: 2,
    role: "creator",
    name: "Jane Smith",
    city: "Birgminham",
    country: "United Kingdom",
    brand_name: "Skin Lover",
    brandImage: thumbnail,
    socialMediaHandles: [
      { platform: "TikTok", handle: "@jane_creates" },
      { platform: "Instagram", handle: "@janecreates" },
    ],
    email: "janesmith@gmail.com",
    engagementImages: [
      thumbnail,
      thumbnail,
      thumbnail,
    ],
    niche: "Beauty and Lifestyle",
  },
  {
    id: 3,
    role: "clipper",
    name: "Mike Johnson",
    city: "Dubai",
    country: "United Arab Emirates",
    brand_name: "Sprint Madness",
    brandImage: thumbnail,
    socialMediaHandles: [
      { platform: "Twitter", handle: "@mike_clipper" },
      { platform: "LinkedIn", handle: "Mike Johnson" },
    ],
    email: "mikejohnson@gmail.com",
    engagementImages: [thumbnail,thumbnail,thumbnail,thumbnail],
    niche: "Technology",
    followers: 100000,
    pricePerPost: 250,
  },
];
