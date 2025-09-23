"use client";
import "ldrs/react/Ring.css";
import { UserRoundMinus } from "lucide-react";
import { useState } from "react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import ApprovedApplication from "./approved";
import ApprovedRenewApplication from "./renew-approved";

export default function PendingApplication() {
  const [status, setStatus] = useState("APPROVED");
  const [approved, setApproved] = useState(0);
  const [approvedRenewal, setRenewApproved] = useState(0);
  const tabs = [
    { id: "APPROVED", label: "Approved Application", indicator: approved },
    {
      id: "RENEWAPPROVED",
      label: "Approved Renewals",
      indicator: approvedRenewal,
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
            title="Approved Applications"
            description="Applications that have been approved and finalized."
            Icon={UserRoundMinus}
          />

          <div className="py-8 space-y-5">
            <ApprovedApplication setApproved={setApproved} />
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
