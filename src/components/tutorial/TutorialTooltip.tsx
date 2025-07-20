"use client";
import React from "react";
import { ArrowLeft, ArrowRight, SkipForward, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TutorialStep } from "../../contexts/TutorialContext";

interface TutorialTooltipProps {
  step: TutorialStep;
  position: { x: number; y: number };
  isCenter: boolean;
  stepNumber: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onClose: () => void;
  canSkip: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const TutorialTooltip: React.FC<TutorialTooltipProps> = ({
  step,
  position,
  isCenter,
  stepNumber,
  onNext,
  onPrevious,
  onSkip,
  onClose,
  canSkip,
  isFirstStep,
  isLastStep,
}) => {
  const getTooltipStyle = () => {
    if (isCenter) {
      return {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 60,
        maxWidth: "90vw",
        width: "100%",
        maxWidth: "500px",
      };
    }

    // Position relative to target element
    let transform = "";
    let adjustedX = position.x;
    let adjustedY = position.y;

    switch (step.position) {
      case "top":
        transform = "translate(-50%, -100%)";
        adjustedY -= 10;
        break;
      case "bottom":
        transform = "translate(-50%, 0%)";
        adjustedY += 10;
        break;
      case "left":
        transform = "translate(-100%, -50%)";
        adjustedX -= 10;
        break;
      case "right":
        transform = "translate(0%, -50%)";
        adjustedX += 10;
        break;
      default:
        transform = "translate(-50%, -50%)";
    }

    // Ensure tooltip stays within viewport
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const margin = 20;

    if (adjustedX - tooltipWidth / 2 < margin) {
      adjustedX = margin + tooltipWidth / 2;
    } else if (adjustedX + tooltipWidth / 2 > window.innerWidth - margin) {
      adjustedX = window.innerWidth - margin - tooltipWidth / 2;
    }

    if (adjustedY - tooltipHeight / 2 < margin) {
      adjustedY = margin + tooltipHeight / 2;
    } else if (adjustedY + tooltipHeight / 2 > window.innerHeight - margin) {
      adjustedY = window.innerHeight - margin - tooltipHeight / 2;
    }

    return {
      position: "fixed" as const,
      left: adjustedX,
      top: adjustedY,
      transform,
      zIndex: 60,
      maxWidth: "320px",
      width: "auto",
    };
  };

  const getActionButtonText = () => {
    switch (step.action) {
      case "navigate":
        return "Go There";
      case "click":
        return "Try It";
      case "demo":
        return "Show Me";
      default:
        return isLastStep ? "Finish" : "Next";
    }
  };

  const getActionButtonIcon = () => {
    switch (step.action) {
      case "navigate":
        return <ArrowRight className="w-4 h-4 ml-1" />;
      case "click":
      case "demo":
        return <ArrowRight className="w-4 h-4 ml-1" />;
      default:
        return isLastStep ? null : <ArrowRight className="w-4 h-4 ml-1" />;
    }
  };

  return (
    <div style={getTooltipStyle()}>
      <Card className="shadow-xl border-2 border-blue-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  Step {stepNumber}
                </Badge>
                {step.action && step.action !== "none" && (
                  <Badge variant="secondary" className="text-xs">
                    {step.action === "navigate"
                      ? "Navigation"
                      : step.action === "click"
                      ? "Interactive"
                      : step.action === "demo"
                      ? "Demo"
                      : "Info"}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                {step.title}
              </CardTitle>
            </div>
            {canSkip && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 h-auto text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {step.message}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}

              <Button
                onClick={onNext}
                size="sm"
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
              >
                {getActionButtonText()}
                {getActionButtonIcon()}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {canSkip && !isLastStep && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Skip
                </Button>
              )}

              {canSkip && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Skip Tutorial
                </Button>
              )}
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Keyboard:{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Enter
              </kbd>{" "}
              Next,
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">
                ←
              </kbd>{" "}
              Back,
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">
                Tab
              </kbd>{" "}
              Skip,
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">
                Esc
              </kbd>{" "}
              Exit
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Arrow pointer for non-center positions */}
      {!isCenter && (
        <div
          className={`absolute w-3 h-3 bg-white border-2 border-blue-200 transform rotate-45 ${
            step.position === "top"
              ? "bottom-[-8px] left-1/2 -translate-x-1/2"
              : step.position === "bottom"
              ? "top-[-8px] left-1/2 -translate-x-1/2"
              : step.position === "left"
              ? "right-[-8px] top-1/2 -translate-y-1/2"
              : step.position === "right"
              ? "left-[-8px] top-1/2 -translate-y-1/2"
              : ""
          }`}
        />
      )}
    </div>
  );
};

export default TutorialTooltip;
