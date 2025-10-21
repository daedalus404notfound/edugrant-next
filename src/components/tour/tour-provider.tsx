"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTour, type TourStep } from "@/lib/use-tour";

interface TourContextType {
  currentStep: number;
  isActive: boolean;
  currentStepData?: TourStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
  startTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  skipTour: () => void;
  completeTour: () => void;
}

const TourContext = createContext<TourContextType | null>(null);

interface TourProviderProps {
  children: ReactNode;
  steps: TourStep[];
}

export function TourProvider({ children, steps }: TourProviderProps) {
  const tour = useTour(steps);

  return (
    <TourContext.Provider value={tour}>
      {children}
      {/* Tour backdrop */}
      {tour.isActive && (
        <div className="fixed inset-0 bg-black/50 z-40  backdrop-blur-sm" />
      )}
    </TourContext.Provider>
  );
}

export function useTourContext() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTourContext must be used within a TourProvider");
  }
  return context;
}
