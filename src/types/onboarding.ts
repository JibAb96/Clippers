export interface OnboardingStepProps {
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
  formData: Record<string, unknown>;
}

export interface ClipperDetails {
  followerCount: number;
  pricePerPost: number;
}

export interface NicheLocation {
  niche: string;
  country: string;
}

export interface SocialMediaDetails {
  platform: string;
  socialMediaHandle: string;
  brandName: string;
}

export interface PasswordDetails {
  password: string;
  confirmPassword: string;
}
