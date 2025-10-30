"use client";

import { triggerUserAction } from "@/hooks/admin/postSetTour";
import { AuthTypes } from "@/hooks/head/getTokenAuthentication";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector or element ID
  placement?: "top" | "bottom" | "left" | "right";
}

export interface TourConfig {
  [tourName: string]: TourStep[];
}

export function useTour(tourConfig: TourConfig) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [activeTourName, setActiveTourName] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const startTour = (tourName: string) => {
    if (tourConfig[tourName]) {
      setActiveTourName(tourName);
      setCurrentStep(1);
      setIsActive(true);
    } else {
      console.warn(`Tour "${tourName}" not found`);
    }
  };

  const activeSteps = activeTourName ? tourConfig[activeTourName] : [];

  const nextStep = () => {
    if (currentStep < activeSteps.length) {
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
    if (step >= 1 && step <= activeSteps.length) {
      setCurrentStep(step);
    }
  };

  const skipTour = () => {
    setCurrentStep(0);
    setIsActive(false);
    setActiveTourName(null);
  };

  const completeTour = () => {
    setCurrentStep(0);
    setIsActive(false);
    setActiveTourName(null);
    if (activeTourName === "edugrantDashboard") {
      triggerUserAction();
      // or maybe fetch api
      queryClient.setQueryData(["authenticated-user"], (old: AuthTypes) => {
        if (!old) return old;

        return {
          ...old,
          safeData: {
            ...old.safeData,
            webTours: {
              ...old.safeData.webTours,
              dashboardTour: true, // ✅ toggle it
            },
          },
        };
      });
    }
  };

  const currentStepData = activeSteps[currentStep - 1];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === activeSteps.length;

  return {
    currentStep,
    isActive,
    activeTourName,
    currentStepData,
    isFirstStep,
    isLastStep,
    totalSteps: activeSteps.length,
    startTour,
    nextStep,
    previousStep,
    goToStep,
    skipTour,
    completeTour,
  };
}
