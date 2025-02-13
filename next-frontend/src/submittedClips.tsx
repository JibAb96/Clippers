import Thumbnail from "./assets/images/thumbnail.png";
import { Clip } from "../model";
const submittedClips: Clip[] = [
  {
    id: 1,
    title: "Content Strategy 101",
    status: "New Submission",
    user: "Social Media Guru",
    platform: "Instagram",
    thumbnail: Thumbnail,
  },
  {
    id: 2,
    title: "Top 10 Marketing Tools",
    status: "Posted",
    user: "Marketing Wizard",
    platform: "YouTube",
    thumbnail: Thumbnail,
  },
  {
    id: 3,
    title: "Mastering Public Speaking",
    status: "New Submission",
    user: "Speech Master",
    platform: "TikTok",
    thumbnail: Thumbnail,
  },
  {
    id: 4,
    title: "Creative Video Editing Tips",
    status: "Posted",
    user: "Editing Pro",
    platform: "YouTube",
    thumbnail: Thumbnail,
  },
  {
    id: 5,
    title: "How to Start Freelancing",
    status: "Posted",
    user: "Freelance Ace",
    platform: "Instagram",
    thumbnail: Thumbnail,
  },
  {
    id: 6,
    title: "Improve Your Writing Skills",
    status: "Rejected",
    user: "Writing Expert",
    platform: "TikTok",
    thumbnail: Thumbnail,
  },
  {
    id: 7,
    title: "Beginner’s Guide to Blogging",
    status: "New Submission",
    user: "Blogging Starter",
    platform: "YouTube",
    thumbnail: Thumbnail,
  },
  {
    id: 8,
    title: "Social Media Growth Hacks",
    status: "Rejected",
    user: "Growth Hacker",
    platform: "Instagram",
    thumbnail: Thumbnail,
  },
];

export default submittedClips;
