"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface TutorialStep {
  id: string;
  title: string;
  message: string;
  targetElement?: string; // CSS selector for highlighting
  position: "top" | "bottom" | "left" | "right" | "center";
  action?: "navigate" | "click" | "demo" | "none";
  route?: string;
  highlightType?: "spotlight" | "border" | "none";
  allowSkip?: boolean;
}

export interface TutorialFlow {
  id: string;
  name: string;
  userType: "creator" | "clipper";
  steps: TutorialStep[];
}

interface TutorialState {
  isActive: boolean;
  currentFlow: TutorialFlow | null;
  currentStepIndex: number;
  isSkipped: boolean;
  completedFlows: string[];
  userType: "creator" | "clipper" | null;
}

interface TutorialContextType {
  state: TutorialState;
  startTutorial: (userType: "creator" | "clipper", flowId?: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
  skipStep: () => void;
  completeTutorial: () => void;
  setTargetElement: (element: HTMLElement | null) => void;
  isStepActive: (stepId: string) => boolean;
  getCurrentStep: () => TutorialStep | null;
  resetTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

// Tutorial flow definitions
const CREATOR_TUTORIAL_FLOW: TutorialFlow = {
  id: "creator-onboarding",
  name: "Creator Onboarding Tutorial",
  userType: "creator",
  steps: [
    {
      id: "welcome",
      title: "Welcome to Your Creator Dashboard!",
      message:
        "This is where you'll track all your submitted clips and their status. Let's take a quick tour to get you started.",
      position: "center",
      action: "none",
      highlightType: "none",
      allowSkip: true,
    },
    {
      id: "dashboard-overview",
      title: "Dashboard Overview",
      message:
        "Your clips are organized by status: Pending Review (awaiting clipper decision), Posted (live content), and Rejected (needs revision).",
      targetElement: ".dashboard-status-headings",
      position: "bottom",
      action: "none",
      highlightType: "border",
      allowSkip: true,
    },
    {
      id: "find-clippers-nav",
      title: "Discover Clippers",
      message:
        "Ready to find clippers who can amplify your content? Click here to browse available clippers.",
      targetElement: '[aria-label="navigation button"]',
      position: "bottom",
      action: "navigate",
      route: "/find-clippers",
      highlightType: "spotlight",
      allowSkip: true,
    },
    {
      id: "search-filters",
      title: "Search & Filter Tools",
      message:
        "Use the search bar to find specific clippers, or filter by niche, platform, and price to find your perfect match.",
      targetElement: ".search-filter-section",
      position: "bottom",
      action: "demo",
      highlightType: "border",
      allowSkip: true,
    },
    {
      id: "clipper-cards",
      title: "Submit Clips Directly",
      message:
        "Each card shows key clipper information and allows you to submit clips directly! You can submit your content right from this search page without visiting their full profile.",
      targetElement: ".clipper-card:first-child",
      position: "top",
      action: "demo",
      highlightType: "spotlight",
      allowSkip: true,
    },
    {
      id: "submit-clip-button",
      title: "Submit Your Content",
      message:
        "This is where the magic happens! Click this button to submit your content to this clipper.",
      targetElement: '[aria-label="Submit clip for review"]',
      position: "top",
      action: "demo",
      highlightType: "spotlight",
      allowSkip: true,
    },
    {
      id: "tutorial-complete",
      title: "You're All Set!",
      message:
        "Remember: you can track all submissions in your dashboard. Start creating amazing content and connect with clippers!",
      position: "center",
      action: "none",
      highlightType: "none",
      allowSkip: false,
    },
  ],
};

const CLIPPER_TUTORIAL_FLOW: TutorialFlow = {
  id: "clipper-onboarding",
  name: "Clipper Onboarding Tutorial",
  userType: "clipper",
  steps: [
    {
      id: "welcome",
      title: "Welcome to Your Clipper Dashboard!",
      message:
        "This is your content management center where you'll review and manage creator submissions. Let's explore the features.",
      position: "center",
      action: "none",
      highlightType: "none",
      allowSkip: true,
    },
    {
      id: "dashboard-overview",
      title: "Submission Management",
      message:
        "Submissions are organized by status: New Submissions (need your review), Posted (published content), and Rejected (declined submissions).",
      targetElement: ".dashboard-status-headings",
      position: "bottom",
      action: "none",
      highlightType: "border",
      allowSkip: true,
    },
    {
      id: "profile-nav",
      title: "Your Profile",
      message:
        "Your profile is how creators discover you. Let's make sure it's compelling and up-to-date.",
      targetElement: '[href="/profile"]',
      position: "bottom",
      action: "navigate",
      route: "/profile",
      highlightType: "spotlight",
      allowSkip: true,
    },
    {
      id: "profile-optimization",
      title: "Profile Optimization",
      message:
        "Keep your portfolio updated, set competitive pricing, and showcase your best work to attract quality creators.",
      targetElement: ".profile-sections",
      position: "bottom",
      action: "none",
      highlightType: "border",
      allowSkip: true,
    },
    {
      id: "submission-cards",
      title: "Managing Submissions",
      message:
        "When creators submit content, you'll see cards like this. Click any submission to review, approve, or provide feedback.",
      targetElement: ".dashboard-card:first-child",
      position: "top",
      action: "demo",
      highlightType: "spotlight",
      allowSkip: true,
    },
    {
      id: "tutorial-complete",
      title: "Ready to Collaborate!",
      message:
        "You're ready to start collaborating with creators! Keep your profile updated and respond promptly to submissions.",
      position: "center",
      action: "none",
      highlightType: "none",
      allowSkip: false,
    },
  ],
};

const TUTORIAL_FLOWS = [CREATOR_TUTORIAL_FLOW, CLIPPER_TUTORIAL_FLOW];

// Storage keys
const COMPLETED_FLOWS_KEY = "clippers-completed-tutorials";

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TutorialState>({
    isActive: false,
    currentFlow: null,
    currentStepIndex: 0,
    isSkipped: false,
    completedFlows: [],
    userType: null,
  });

  // Debug: Log all state changes
  useEffect(() => {
    console.log("🎯 TutorialContext STATE CHANGE:", {
      isActive: state.isActive,
      currentFlow: state.currentFlow?.id,
      currentStepIndex: state.currentStepIndex,
      isSkipped: state.isSkipped,
      timestamp: new Date().toISOString(),
    });
  }, [
    state.isActive,
    state.currentFlow,
    state.currentStepIndex,
    state.isSkipped,
  ]);

  // Load completed flows from localStorage on mount
  useEffect(() => {
    try {
      const completedFlows = JSON.parse(
        localStorage.getItem(COMPLETED_FLOWS_KEY) || "[]"
      );
      setState((prev) => ({ ...prev, completedFlows }));
    } catch (error) {
      console.warn("Failed to load tutorial completion state:", error);
    }
  }, []);

  // Save completed flows to localStorage when they change
  useEffect(() => {
    if (state.completedFlows.length > 0) {
      try {
        localStorage.setItem(
          COMPLETED_FLOWS_KEY,
          JSON.stringify(state.completedFlows)
        );
      } catch (error) {
        console.warn("Failed to save tutorial completion state:", error);
      }
    }
  }, [state.completedFlows]);

  const startTutorial = (userType: "creator" | "clipper", flowId?: string) => {
    console.log("🎯 TutorialContext.startTutorial called:", {
      userType,
      flowId,
    });

    const targetFlow = TUTORIAL_FLOWS.find(
      (flow) => flow.userType === userType && (!flowId || flow.id === flowId)
    );

    if (!targetFlow) {
      console.warn("🎯 No tutorial flow found for user type:", userType);
      return;
    }

    // Check if this flow was already completed
    if (state.completedFlows.includes(targetFlow.id)) {
      console.log("🎯 Tutorial already completed:", targetFlow.id);
      return;
    }

    console.log("🎯 Starting tutorial flow:", targetFlow.id);
    setState((prev) => ({
      ...prev,
      isActive: true,
      currentFlow: targetFlow,
      currentStepIndex: 0,
      isSkipped: false,
      userType,
    }));
  };

  const nextStep = () => {
    console.log("🎯 TutorialContext.nextStep called");
    if (!state.currentFlow) {
      console.log("🎯 No current flow, cannot proceed to next step");
      return;
    }

    const nextIndex = state.currentStepIndex + 1;
    console.log(
      "🎯 Moving to step:",
      nextIndex,
      "of",
      state.currentFlow.steps.length
    );

    if (nextIndex >= state.currentFlow.steps.length) {
      console.log("🎯 Reached end of tutorial, completing");
      completeTutorial();
    } else {
      setState((prev) => ({
        ...prev,
        currentStepIndex: nextIndex,
      }));
    }
  };

  const previousStep = () => {
    console.log("🎯 TutorialContext.previousStep called");
    if (state.currentStepIndex > 0) {
      setState((prev) => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1,
      }));
    }
  };

  const skipStep = () => {
    console.log("🎯 TutorialContext.skipStep called");
    const currentStep = getCurrentStep();
    if (currentStep?.allowSkip !== false) {
      nextStep();
    }
  };

  const skipTutorial = () => {
    console.log("🎯 TutorialContext.skipTutorial called");
    if (!state.currentFlow) return;

    setState((prev) => ({
      ...prev,
      isActive: false,
      isSkipped: true,
      currentFlow: null,
      currentStepIndex: 0,
    }));

    // Mark as completed so it doesn't show again
    markFlowCompleted(state.currentFlow.id);
  };

  const completeTutorial = () => {
    console.log("🎯 TutorialContext.completeTutorial called");
    if (!state.currentFlow) return;

    markFlowCompleted(state.currentFlow.id);

    setState((prev) => ({
      ...prev,
      isActive: false,
      currentFlow: null,
      currentStepIndex: 0,
    }));
  };

  const markFlowCompleted = (flowId: string) => {
    console.log("🎯 Marking flow as completed:", flowId);
    setState((prev) => ({
      ...prev,
      completedFlows: [
        ...prev.completedFlows.filter((id) => id !== flowId),
        flowId,
      ],
    }));
  };

  const resetTutorial = () => {
    setState((prev) => ({
      ...prev,
      isActive: false,
      currentFlow: null,
      currentStepIndex: 0,
      isSkipped: false,
    }));
  };

  const setTargetElement = () => {
    // This will be used by the tutorial overlay to focus on specific elements
    // Implementation will be in the TutorialOverlay component
  };

  const isStepActive = (stepId: string): boolean => {
    if (!state.isActive || !state.currentFlow) return false;
    const currentStep = state.currentFlow.steps[state.currentStepIndex];
    return currentStep?.id === stepId;
  };

  const getCurrentStep = (): TutorialStep | null => {
    if (!state.currentFlow) return null;
    return state.currentFlow.steps[state.currentStepIndex] || null;
  };

  const contextValue: TutorialContextType = {
    state,
    startTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    skipStep,
    completeTutorial,
    setTargetElement,
    isStepActive,
    getCurrentStep,
    resetTutorial,
  };

  return (
    <TutorialContext.Provider value={contextValue}>
      {children}
    </TutorialContext.Provider>
  );
}

export const useTutorial = (): TutorialContextType => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
};

export default TutorialContext;
