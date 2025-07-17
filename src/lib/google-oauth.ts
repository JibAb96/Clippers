export interface GoogleAuthResponse {
  requiresOnboarding: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
    profile: any;
  };
  onboardingToken?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface OnboardingData {
  onboardingToken: string;
  currentStep: number;
  totalSteps: number;
  role: 'creator' | 'clipper';
  email?: string;
  name?: string;
  picture?: string;
}

export interface OnboardingStepResponse {
  success: boolean;
  message: string;
  nextStep?: number;
  totalSteps: number;
  currentStep: number;
}

export const PLATFORMS = {
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  X: 'x'
} as const;

export const NICHES = {
  TRAVEL: 'travel',
  FOOD: 'food',
  ENTERTAINMENT: 'entertainment',
  SPORT: 'sport',
  FASHION: 'fashion',
  TECHNOLOGY: 'technology',
  GAMING: 'gaming',
  BEAUTY: 'beauty',
  FITNESS: 'fitness',
  OTHER: 'other'
} as const;

export type Platform = typeof PLATFORMS[keyof typeof PLATFORMS];
export type Niche = typeof NICHES[keyof typeof NICHES];

export class GoogleOAuthApi {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

  static async getGoogleOAuthUrl(): Promise<{ authUrl: string }> {
    const response = await fetch(`${this.BASE_URL}/auth/google/url`);
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to get Google OAuth URL');
    }
    
    return result.data;
  }

  static async handleGoogleCallback(code: string, state?: string): Promise<GoogleAuthResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/google/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Google authentication failed');
    }
    
    return result.data;
  }

  static async authenticateWithToken(idToken: string): Promise<GoogleAuthResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/google/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Token authentication failed');
    }
    
    return result.data;
  }

  static async getOnboardingStatus(token: string): Promise<{currentStep: number; totalSteps: number; role: 'creator' | 'clipper'}> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/status/${token}`);
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to get onboarding status');
    }
    
    return result.data;
  }

  static async submitOnboardingStep1(onboardingToken: string, brandName: string): Promise<OnboardingStepResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/step-1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ onboardingToken, brandName })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Step 1 submission failed');
    }
    
    return result.data;
  }

  static async submitOnboardingStep2(
    onboardingToken: string, 
    socialMediaHandle: string, 
    platform: Platform
  ): Promise<OnboardingStepResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/step-2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ onboardingToken, socialMediaHandle, platform })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Step 2 submission failed');
    }
    
    return result.data;
  }

  static async submitOnboardingStep3(
    onboardingToken: string, 
    niche: Niche, 
    country: string
  ): Promise<OnboardingStepResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/step-3`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ onboardingToken, niche, country })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Step 3 submission failed');
    }
    
    return result.data;
  }

  static async submitOnboardingStep4Clipper(
    onboardingToken: string, 
    followerCount: number, 
    pricePerPost: number
  ): Promise<OnboardingStepResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/step-4-clipper`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ onboardingToken, followerCount, pricePerPost })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Step 4 submission failed');
    }
    
    return result.data;
  }

  static async completeOnboarding(onboardingToken: string, password: string): Promise<GoogleAuthResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/onboarding/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ onboardingToken, password })
    });
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Onboarding completion failed');
    }
    
    return result.data;
  }
}