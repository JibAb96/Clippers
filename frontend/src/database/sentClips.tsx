import Atlantis from "../images/Thumbnail-JH.jpg";
import BookRecommendation from "../images/Thumbnail-TM.jpg";
import TimeManagement from "../images/Thumnail-1.webp";
import StayFit from "../images/Thumbnail-fitness.jpg";
import BetterSleep from "../images/Thumbnail-sleep.jpg";
import CodingHacks from "../images/Thumnail-coding.jpg";
import VeganRecipes from "../images/Thumnail-vegan.png";
import AncientEgypt from "../images/thumbnail-egypt.jpeg";
import { Clip } from "../model";
//Information for clips submitted by user
const sentClips: Clip[] = [
  {
    id: 1,
    name: "Is Atlantis Real?",
    status: "Posted",
    user: "ImJustBait",
    platform: "Instagram",
    thumbnail: Atlantis,
  },
  {
    id: 2,
    name: "Book Recommendations",
    status: "Pending",
    user: "Naseeha",
    platform: "TikTok",
    thumbnail: BookRecommendation,
  },
  {
    id: 3,
    name: "Manage Your Time",
    status: "Rejected",
    user: "ProductivityGuru",
    platform: "YouTube",
    thumbnail: TimeManagement,
  },
  {
    id: 4,
    name: "How to Stay Fit",
    status: "Posted",
    user: "FitnessPro",
    platform: "YouTube",
    thumbnail: StayFit,
  },
  {
    id: 5,
    name: "10 Tips for Better Sleep",
    status: "Pending",
    user: "SleepWell",
    platform: "Instagram",
    thumbnail: BetterSleep,
  },
  {
    id: 6,
    name: "Top 5 Coding Hacks",
    status: "Rejected",
    user: "CodeMaster",
    platform: "TikTok",
    thumbnail: CodingHacks,
  },
  {
    id: 7,
    name: "Easy Vegan Recipes",
    status: "Posted",
    user: "HealthyEats",
    platform: "YouTube",
    thumbnail: VeganRecipes,
  },
  {
    id: 8,
    name: "Exploring Ancient Egypt",
    status: "Pending",
    user: "HistoryBuff",
    platform: "Instagram",
    thumbnail: AncientEgypt,
  },
];

export default sentClips;
