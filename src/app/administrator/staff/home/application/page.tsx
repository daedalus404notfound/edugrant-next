"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";

import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import PendingRenewalApplication from "./pending-renew";
import PendingStaffApplication from "./pending";

export default function PendingApplication() {
  const [status, setStatus] = useState("PENDING");
  const [pending, setPending] = useState(0);
  const [pendingRenewal, setRenewPending] = useState(0);
  const tabs = [
    { id: "PENDING", label: "Pending Application", indicator: pending },
    {
      id: "RENEWPENDING",
      label: "Pending Renewals",
      indicator: pendingRenewal,
    },
  ];
  const applicationTourSteps: TourStepType[] = [
    {
      id: "tabs",
      title: "Expired vs Archived",
      description:
        "Switch between active scholarships and renewal applications using these tabs.",
    },
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
      <div className="w-full">
        <TitleReusable
          title="Pending Applications"
          description="Applicants currently waiting for review."
        />

        <div className="py-8 space-y-5">
          <div className="flex">
            <TourStep stepId="tabs">
              <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
            </TourStep>
          </div>
          {status === "PENDING" && (
            <PendingStaffApplication setPending={setPending} />
          )}
          {status === "RENEWPENDING" && (
            <PendingRenewalApplication setPendingRenew={setRenewPending} />
          )}
        </div>
      </div>
    </TourProvider>
  );
}
