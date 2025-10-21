"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";

import TitleReusable from "@/components/ui/title";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import { Tabs } from "@/components/ui/vercel-tabs";
import ForInterviewApplication from "./for-interview";
import InterviewRenewalApplication from "./for-interview-renew";
export default function PendingApplication() {
  const [status, setStatus] = useState("INTERVIEW");
  const [interview, setInterview] = useState(0);
  const [interviewRenewal, setRenewInterview] = useState(0);
  const tabs = [
    {
      id: "INTERVIEW",
      label: "For Interview Application",
      indicator: interview,
    },
    {
      id: "RENEWINTERVIEW",
      label: "For Interview Renewals",
      indicator: interviewRenewal,
    },
  ];
  const applicationTourSteps: TourStepType[] = [
    {
      id: "search",
      title: "Search Scholarships",
      description:
        "Find scholarships quickly by typing their name in the search bar.",
    },
    {
      id: "filters",
      title: "Filter Options",
      description:
        "Apply filters to narrow down scholarships based on specific criteria.",
    },

    {
      id: "view",
      title: "Table View Options",
      description: "Show or hide table columns to customize your view.",
    },

    {
      id: "table",
      title: "Scholarship Table",
      description:
        "View all available scholarships in a table format. Click a row to see more details.",
    },
    {
      id: "rowperpage",
      title: "Table Row Per Page",
      description:
        "Navigate between multiple pages of scholarships using the pagination controls.",
    },
    {
      id: "pagination",
      title: "Table Pagination",
      description:
        "Navigate between multiple pages of scholarships using the pagination controls.",
    },
  ];
  return (
    <TourProvider steps={applicationTourSteps}>
      <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
        <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
          <TitleReusable
            title="For Interview Application"
            textColor="text-indigo-700/70"
            description="Applicants currently waiting for review."
          />

          <div className="py-8 space-y-5">
            <ForInterviewApplication setInterview={setInterview} />
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
