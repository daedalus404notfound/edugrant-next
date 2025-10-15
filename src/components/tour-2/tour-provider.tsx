"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTour, type TourStep, type TourConfig } from "@/lib/use-tour2";

interface TourContextType {
  currentStep: number;
  isActive: boolean;
  activeTourName: string | null;
  currentStepData?: TourStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
  startTour: (tourName: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  skipTour: () => void;
  completeTour: () => void;
}

const TourContext = createContext<TourContextType | null>(null);

interface TourProviderProps {
  children: ReactNode;
  tours: TourConfig;
}

export function TourProvider({ children, tours }: TourProviderProps) {
  const tour = useTour(tours);

  return (
    <TourContext.Provider value={tour}>
      {children}
      {/* Tour backdrop */}
      {tour.isActive && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />
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
