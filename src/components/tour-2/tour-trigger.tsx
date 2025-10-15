"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Milestone } from "lucide-react";
import { useTourContext } from "./tour-provider";

interface TourTriggerProps {
  tourName: string;
  children?: React.ReactNode;
  className?: string;
}

export function TourTrigger({
  tourName,
  children,
  className,
}: TourTriggerProps) {
  const { startTour, isActive } = useTourContext();

  if (isActive) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => startTour(tourName)}
      className={className}
    >
      {children || (
        <>
          <Milestone className="w-4 h-4 mr-2" />
          Take Tour
        </>
      )}
    </Button>
  );
}
