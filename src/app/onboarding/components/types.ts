import { Platform, Niche } from "@/lib/google-oauth";

export interface OnboardingFormData {
  brandName: string;
  socialMediaHandle: string;
  platform: Platform;
  niche: Niche ;
  country: string;
  followerCount: number;
  pricePerPost: number;
  password: string;
}
