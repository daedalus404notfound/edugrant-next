"use client";
import "ldrs/react/Ring.css";
import { UserRoundMinus } from "lucide-react";
import { useState } from "react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import ApprovedApplication from "./rejected";
import ApprovedRenewApplication from "./renew-rejected";

export default function RejectedApplication() {
  const [status, setStatus] = useState("REJECTED");
  const [rejected, setRejected] = useState(0);
  const [rejectedRenewal, setRenewRejected] = useState(0);
  const tabs = [
    { id: "REJECTED", label: "Rejected Application", indicator: rejected },
    {
      id: "RENEWREJECTED",
      label: "Rejected Renewals",
      indicator: rejectedRenewal,
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
      id: "export",
      title: "Export CSV",
      description:
        "Download the list of scholarships as a CSV file for easy access.",
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
            title="Rejected Applications"
            description="View and manage applications and renewals that were not approved."
            Icon={UserRoundMinus}
            textColor="text-red-700/70"
          />

          <div className="py-8 space-y-5">
            <ApprovedApplication setRejected={setRejected} />
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
