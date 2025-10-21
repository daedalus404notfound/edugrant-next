"use client";
import "ldrs/react/Ring.css";
import { UserRoundMinus } from "lucide-react";
import { useState } from "react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import ApprovedApplication from "./blocked";

export default function BlockedApplication() {



  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          textColor="text-emerald-700/70"
          title="Approved Applications"
          description="Applications that have been approved and finalized."
          Icon={UserRoundMinus}
        />

        <div className="py-8 space-y-5">
          <ApprovedApplication />
        </div>
      </div>
    </div>
  );
}
