"use client";
import "ldrs/react/Ring.css";
import { useEffect, useState } from "react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";

import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import PendingStaffApplication from "./pending";
import socket from "@/lib/socketLib";

export default function PendingApplication() {

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Pending Applications"
          textColor="text-yellow-700/70"
          description="Applicants currently waiting for review."
        />

        <div className="py-8 space-y-5">
          <PendingStaffApplication />
        </div>
      </div>
    </div>
  );
}
