"use client";
import { useEffect, useRef } from "react";
import { useTutorial } from "../contexts/TutorialContext";

const JUST_ONBOARDED_KEY = "clippers-just-onboarded";

interface TutorialTriggerOptions {
  userType: "creator" | "clipper" | null;
  delay?: number;
}

interface StoredOnboardingState {
  isJustOnboarded: boolean;
  timestamp: number;
}

export const useTutorialTrigger = ({
  userType,
  delay = 1000,
}: TutorialTriggerOptions) => {
  const { startTutorial, state } = useTutorial();
  const processedOnboardingRef = useRef(false);

  useEffect(() => {
    const timerRef = { current: null as NodeJS.Timeout | null };

    const checkForOnboarding = () => {
      if (state.isActive || !userType || processedOnboardingRef.current) {
        return;
      }

      const storedStateJSON = localStorage.getItem(JUST_ONBOARDED_KEY);

      if (storedStateJSON) {
        try {
          const storedState = JSON.parse(
            storedStateJSON
          ) as StoredOnboardingState;
          const now = new Date().getTime();
          const tenMinutes = 10 * 60 * 1000;

          if (
            storedState.isJustOnboarded &&
            now - storedState.timestamp < tenMinutes
          ) {
            processedOnboardingRef.current = true;

            timerRef.current = setTimeout(() => {
              startTutorial(userType);
            }, delay);
          }
        } catch (error) {
          console.error("Failed to parse onboarding state:", error);
        } finally {
          localStorage.removeItem(JUST_ONBOARDED_KEY);
        }
      }
    };

    checkForOnboarding();

    window.addEventListener("just-onboarded-event", checkForOnboarding);

    return () => {
      window.removeEventListener("just-onboarded-event", checkForOnboarding);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [userType, startTutorial, state.isActive, delay]);
};

export const markUserAsJustOnboarded = () => {
  const state: StoredOnboardingState = {
    isJustOnboarded: true,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(JUST_ONBOARDED_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("just-onboarded-event"));
};

export const useTutorialManualTrigger = () => {
  const { startTutorial } = useTutorial();

  return {
    triggerTutorial: (userType: "creator" | "clipper") => {
      startTutorial(userType);
    },
  };
};
