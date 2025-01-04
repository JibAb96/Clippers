import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export type Review = {
    creator: string
    stars: number
    review: string
}

export type Clipper = {
  id: number
  name: string
  followers: number
  platform: "Instagram" | "Twitter" | "TikTok" | "YouTube",
  niche: string
  price: number
  thumbnail: string
  images: string[]
  guidelines: string[]
  reviews: Review[]
}

export type Category = {
  id: number
  icon: IconDefinition
  name: string
}