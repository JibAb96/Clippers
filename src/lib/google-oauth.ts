export interface GoogleAuthResponse {
  requiresOnboarding: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
    profile: {
      id: string;
      email: string;
      fullName?: string;
      brandName?: string;
      socialMediaHandle?: string;
      platform?: Platform;
      niche?: Niche;
      country?: string;
      followerCount?: number;
      pricePerPost?: number;
      brandProfilePicture?: string | null;
    };
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
  private static readonly BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "";

  private static buildUrl(path: string): string {
    return `${this.BASE_URL}${path.startsWith("/") ? path : "/" + path}`;
  }

  static async getGoogleOAuthUrl(): Promise<{ authUrl: string }> {
    if (!this.BASE_URL) {
      console.error("Environment check:", {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        BASE_URL: this.BASE_URL,
      });
      throw new Error(
        "API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables."
      );
    }

    const url = this.buildUrl("/auth/google/url");
    console.log("Making request to:", url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Google OAuth URL request failed:", {
          status: response.status,
          statusText: response.statusText,
          url: url,
          BASE_URL: this.BASE_URL,
        });
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.status !== "success") {
        console.error("Google OAuth URL response error:", result);
        throw new Error(result.message || "Failed to get Google OAuth URL");
      }

      return result.data;
    } catch (error) {
      console.error("Google OAuth URL fetch error:", error);
      throw error;
    }
  }

  static async handleGoogleCallback(
    code: string,
    state?: string
  ): Promise<GoogleAuthResponse> {
    const url = this.buildUrl("/auth/google/callback");
    console.log("Making callback request to:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, state }),
      });

      if (!response.ok) {
        console.error("Google callback request failed:", {
          status: response.status,
          statusText: response.statusText,
          url: url,
        });
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.status !== "success") {
        console.error("Google callback response error:", result);
        throw new Error(result.message || "Google authentication failed");
      }

      return result.data;
    } catch (error) {
      console.error("Google callback fetch error:", error);
      throw error;
    }
  }

  static async authenticateWithToken(
    idToken: string
  ): Promise<GoogleAuthResponse> {
    const url = this.buildUrl("/auth/google/token");
    console.log("Making token auth request to:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        console.error("Google token auth request failed:", {
          status: response.status,
          statusText: response.statusText,
          url: url,
        });
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.status !== "success") {
        console.error("Google token auth response error:", result);
        throw new Error(result.message || "Token authentication failed");
      }

      return result.data;
    } catch (error) {
      console.error("Google token auth fetch error:", error);
      throw error;
    }
  }

  static async getOnboardingStatus(token: string): Promise<{
    currentStep: number;
    totalSteps: number;
    role: "creator" | "clipper";
  }> {
    const response = await fetch(
      this.buildUrl(`/auth/onboarding/status/${token}`)
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
    const response = await fetch(this.buildUrl("/auth/onboarding/complete"), {
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
