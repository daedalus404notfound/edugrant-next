"use client";

import { useState } from "react";

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector or element ID
  placement?: "top" | "bottom" | "left" | "right";
}

export function useTour(steps: TourStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startTour = () => {
    setCurrentStep(1);
    setIsActive(true);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTour();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
    }
  };

  const skipTour = () => {
    setCurrentStep(0);
    setIsActive(false);
  };

  const completeTour = () => {
    setCurrentStep(0);
    setIsActive(false);
  };

  const currentStepData = steps[currentStep - 1];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  return {
    currentStep,
    isActive,
    currentStepData,
    isFirstStep,
    isLastStep,
    totalSteps: steps.length,
    startTour,
    nextStep,
    previousStep,
    goToStep,
    skipTour,
    completeTour,
  };
}
