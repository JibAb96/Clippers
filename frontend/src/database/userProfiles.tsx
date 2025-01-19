import { Profile } from "../model";
import ImJustBait from "../images/IMJUSTBAIT-Thumb.jpg";
import IJB1 from "../images/ImJustBait_post1.png";
import IJB2 from "../images/Imjustbait_post2.png";
import IJB3 from "../images/Imjustbait_post3.png";
import IJB4 from "../images/Imjustbait_post4.png";
import thumbnail from "../images/thumbnail.png";

export const userProfiles: Profile[] = [
  {
    id: 1,
    role: "clipper",
    name: "John Doe",
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
    brand_name: "Sports Fan",
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
    brand_name: "Sprint Madness",
    brandImage: "https://example.com/brand-image3.jpg",
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
