export interface GoogleAuthResponse {
  requiresOnboarding: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
    profile: any;
  };
  onboardingToken?: string;
  token?: string;
  refreshToken?: string;
}

export interface OnboardingData {
  onboardingToken: string;
  currentStep: number;
  totalSteps: number;
  role: "creator" | "clipper";
  email?: string;
  name?: string;
  picture?: string;
}

export interface CompleteOnboardingData {
  onboardingToken: string;
  role: "creator" | "clipper" | "";
  brandName: string;
  socialMediaHandle: string;
  platform: Platform;
  niche: Niche;
  country: string;
  password: string;
  followerCount?: number;
  pricePerPost?: number;
}

export const PLATFORMS = {
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
  YOUTUBE: "youtube",
  X: "x",
} as const;

export const NICHES = {
  TRAVEL: "travel",
  FOOD: "food",
  ENTERTAINMENT: "entertainment",
  SPORT: "sport",
  FASHION: "fashion",
  TECHNOLOGY: "technology",
  GAMING: "gaming",
  BEAUTY: "beauty",
  FITNESS: "fitness",
  OTHER: "other",
} as const;

export type Platform = (typeof PLATFORMS)[keyof typeof PLATFORMS];
export type Niche = (typeof NICHES)[keyof typeof NICHES];

export class GoogleOAuthApi {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  static async getGoogleOAuthUrl(): Promise<{ authUrl: string }> {
    if (!this.BASE_URL) {
      throw new Error(
        "API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables."
      );
    }

    const response = await fetch(`${this.BASE_URL}/auth/google/url`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Failed to get Google OAuth URL");
    }

    return result.data;
  }

  static async handleGoogleCallback(
    code: string,
    state?: string
  ): Promise<GoogleAuthResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/google/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, state }),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Google authentication failed");
    }

    return result.data;
  }

  static async authenticateWithToken(
    idToken: string
  ): Promise<GoogleAuthResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/google/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Token authentication failed");
    }

    return result.data;
  }

  static async getOnboardingStatus(token: string): Promise<{
    currentStep: number;
    totalSteps: number;
    role: "creator" | "clipper";
  }> {
    const response = await fetch(
      `${this.BASE_URL}/auth/onboarding/status/${token}`
    );
    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Failed to get onboarding status");
    }

    return result.data;
  }

  static async completeOnboarding(
    onboardingData: CompleteOnboardingData
  ): Promise<GoogleAuthResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(onboardingData),
    });

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Onboarding completion failed");
    }

    return result.data;
  }
}
