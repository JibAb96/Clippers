"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import { useTutorial } from '../../contexts/TutorialContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import TutorialTooltip from './TutorialTooltip';
import TutorialSpotlight from './TutorialSpotlight';

interface TutorialOverlayProps {
  onNavigate?: (route: string) => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onNavigate }) => {
  const {
    state,
    nextStep,
    previousStep,
    skipTutorial,
    skipStep,
    completeTutorial,
    getCurrentStep,
  } = useTutorial();

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('🎯 TutorialOverlay: Component mounting');
    setMounted(true);
    return () => {
      console.log('🎯 TutorialOverlay: Component unmounting');
    };
  }, []);

  // Debug tutorial state changes
  useEffect(() => {
    console.log('🎯 TutorialOverlay: State changed:', {
      isActive: state.isActive,
      currentFlow: state.currentFlow?.id,
      currentStepIndex: state.currentStepIndex,
      mounted
    });
  }, [state.isActive, state.currentFlow, state.currentStepIndex, mounted]);

  // Find and track target element
  useEffect(() => {
    if (!state.isActive) {
      setTargetElement(null);
      return;
    }

    const currentStep = getCurrentStep();
    console.log('🎯 TutorialOverlay: Looking for target element for step:', currentStep?.id);
    
    if (!currentStep?.targetElement) {
      console.log('🎯 TutorialOverlay: No target element specified for this step');
      setTargetElement(null);
      return;
    }

    const findElement = () => {
      console.log('🎯 TutorialOverlay: Searching for element:', currentStep.targetElement);
      const element = document.querySelector(currentStep.targetElement!) as HTMLElement;
      if (element) {
        console.log('🎯 TutorialOverlay: Found target element:', element);
        setTargetElement(element);
        updateTooltipPosition(element, currentStep.position);
      } else {
        console.log('🎯 TutorialOverlay: Element not found, retrying in 100ms');
        // Element not found, retry after a short delay
        setTimeout(findElement, 100);
      }
    };

    findElement();
  }, [state.currentStepIndex, state.isActive, getCurrentStep]);

  const updateTooltipPosition = useCallback((element: HTMLElement, position: string) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = rect.left + scrollLeft + rect.width / 2;
        y = rect.top + scrollTop - 20;
        break;
      case 'bottom':
        x = rect.left + scrollLeft + rect.width / 2;
        y = rect.bottom + scrollTop + 20;
        break;
      case 'left':
        x = rect.left + scrollLeft - 20;
        y = rect.top + scrollTop + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollLeft + 20;
        y = rect.top + scrollTop + rect.height / 2;
        break;
      default: // center
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }

    setTooltipPosition({ x, y });
  }, []);

  // Handle navigation actions
  const handleStepAction = useCallback(() => {
    const currentStep = getCurrentStep();
    if (!currentStep) return;

    console.log('🎯 TutorialOverlay: Handling step action:', currentStep.action, 'for step:', currentStep.id);

    switch (currentStep.action) {
      case 'navigate':
        if (currentStep.route && onNavigate) {
          console.log('🎯 TutorialOverlay: Navigating to:', currentStep.route);
          onNavigate(currentStep.route);
          // Small delay to allow navigation to complete
          setTimeout(() => nextStep(), 500);
        } else {
          console.log('🎯 TutorialOverlay: No route specified, proceeding to next step');
          nextStep();
        }
        break;
      case 'click':
        if (targetElement) {
          console.log('🎯 TutorialOverlay: Clicking target element');
          targetElement.click();
          setTimeout(() => nextStep(), 300);
        } else {
          console.log('🎯 TutorialOverlay: No target element to click, proceeding');
          nextStep();
        }
        break;
      case 'demo':
        console.log('🎯 TutorialOverlay: Demo action, proceeding to next step');
        // For demo actions, just proceed to next step
        // Could be enhanced to show actual demos
        nextStep();
        break;
      default:
        console.log('🎯 TutorialOverlay: Default action, proceeding to next step');
        nextStep();
    }
  }, [getCurrentStep, targetElement, onNavigate, nextStep]);

  // Keyboard navigation - add protection against immediate dismissal
  useEffect(() => {
    if (!state.isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('🎯 TutorialOverlay: Key pressed:', event.key);
      
      // Prevent immediate dismissal on first render
      if (!mounted) {
        console.log('🎯 TutorialOverlay: Ignoring key press - not fully mounted');
        return;
      }

      switch (event.key) {
        case 'Escape':
          console.log('🎯 TutorialOverlay: Escape pressed - closing tutorial');
          skipTutorial();
          break;
        case 'ArrowRight':
        case 'Enter':
          event.preventDefault();
          console.log('🎯 TutorialOverlay: Next step key pressed');
          handleStepAction();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          console.log('🎯 TutorialOverlay: Previous step key pressed');
          previousStep();
          break;
        case 'Tab':
          event.preventDefault();
          console.log('🎯 TutorialOverlay: Skip step key pressed');
          skipStep();
          break;
      }
    };

    // Small delay to prevent immediate key handling on mount
    const timer = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isActive, handleStepAction, skipTutorial, previousStep, skipStep, mounted]);

  // Auto-scroll target element into view
  useEffect(() => {
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [targetElement]);

  if (!mounted || !state.isActive) {
    return null;
  }

  const currentStep = getCurrentStep();
  if (!currentStep) {
    return null;
  }

  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentFlow && state.currentStepIndex === state.currentFlow.steps.length - 1;
  const stepNumber = state.currentStepIndex + 1;
  const totalSteps = state.currentFlow?.steps.length || 0;

  const overlayContent = (
    <>
      {/* Dark backdrop - make it less sensitive to accidental clicks */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onDoubleClick={() => {
          console.log('🎯 TutorialOverlay: Backdrop double-clicked - closing tutorial');
          if (currentStep.allowSkip !== false) {
            skipTutorial();
          }
        }}
        onClick={() => {
          console.log('🎯 TutorialOverlay: Backdrop clicked - ignoring single click');
          // Changed from onClick to onDoubleClick to prevent accidental dismissal
        }}
      />

      {/* Spotlight for highlighted elements */}
      {targetElement && currentStep.highlightType === 'spotlight' && (
        <TutorialSpotlight targetElement={targetElement} />
      )}

      {/* Border highlight for elements */}
      {targetElement && currentStep.highlightType === 'border' && (
        <div
          className="fixed z-50 pointer-events-none border-4 border-blue-500 rounded-lg shadow-lg transition-all duration-300"
          style={{
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 4,
            left: targetElement.getBoundingClientRect().left + window.pageXOffset - 4,
            width: targetElement.offsetWidth + 8,
            height: targetElement.offsetHeight + 8,
          }}
        />
      )}

      {/* Tutorial tooltip/card */}
      <TutorialTooltip
        step={currentStep}
        position={tooltipPosition}
        isCenter={currentStep.position === 'center'}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        onNext={handleStepAction}
        onPrevious={previousStep}
        onSkip={skipStep}
        onClose={skipTutorial}
        canSkip={currentStep.allowSkip !== false}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />

      {/* Progress indicator */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {stepNumber} of {totalSteps}
              </Badge>
              <div className="flex space-x-1">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index <= state.currentStepIndex
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('🎯 TutorialOverlay: Close button clicked');
                  skipTutorial();
                }}
                className="p-1 h-auto text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return createPortal(overlayContent, document.body);
};

export default TutorialOverlay; 