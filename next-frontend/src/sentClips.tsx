import Atlantis from "./assets/images/Thumbnail-JH.jpg";
import BookRecommendation from "./assets/images/Thumbnail-TM.jpg";
import TimeManagement from "./assets/images/Thumnail-1.webp";
import StayFit from "./assets/images/Thumbnail-fitness.jpg";
import BetterSleep from "./assets/images/Thumbnail-sleep.jpg";
import CodingHacks from "./assets/images/Thumnail-coding.jpg";
import VeganRecipes from "./assets/images/Thumnail-vegan.png";
import AncientEgypt from "./assets/images/thumbnail-egypt.jpeg";
import { Clip } from "../model";
//Information for clips submitted by user
const sentClips: Clip[] = [
  {
    id: 1,
    title: "Is Atlantis Real?",
    status: "Posted",
    user: "ImJustBait",
    platform: "Instagram",
    thumbnail: Atlantis,
  },
  {
    id: 2,
    title: "Book Recommendations",
    status: "Pending Review",
    user: "Naseeha",
    platform: "TikTok",
    thumbnail: BookRecommendation,
  },
  {
    id: 3,
    title: "Manage Your Time",
    status: "Rejected",
    user: "ProductivityGuru",
    platform: "YouTube",
    thumbnail: TimeManagement,
  },
  {
    id: 4,
    title: "How to Stay Fit",
    status: "Posted",
    user: "FitnessPro",
    platform: "YouTube",
    thumbnail: StayFit,
  },
  {
    id: 5,
    title: "10 Tips for Better Sleep",
    status: "Pending Review",
    user: "SleepWell",
    platform: "Instagram",
    thumbnail: BetterSleep,
  },
  {
    id: 6,
    title: "Top 5 Coding Hacks",
    status: "Rejected",
    user: "CodeMaster",
    platform: "TikTok",
    thumbnail: CodingHacks,
  },
  {
    id: 7,
    title: "Easy Vegan Recipes",
    status: "Rejected",
    user: "HealthyEats",
    platform: "YouTube",
    thumbnail: VeganRecipes,
  },
  {
    id: 8,
    title: "Exploring Ancient Egypt",
    status: "Pending Review",
    user: "HistoryBuff",
    platform: "Instagram",
    thumbnail: AncientEgypt,
  },
];

export default sentClips;
