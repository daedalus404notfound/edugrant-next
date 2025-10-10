"use client";
import "ldrs/react/Ring.css";
import { Archive } from "lucide-react";
import { useState } from "react";
import TitleReusable from "@/components/ui/title";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import { Tabs } from "@/components/ui/vercel-tabs";
import ManageExpiredScholarship from "./expired";
import ManageArchivedScholarship from "./archive";

export default function Manage() {
  const [expired, setExpired] = useState(0);
  const [archived, setArchived] = useState(0);
  const [tab, setTabs] = useState("EXPIRED");

  const tabs = [
    { id: "EXPIRED", label: "Expired Scholarships", indicator: expired },
    { id: "ARCHIVED", label: "Archived Scholarships", indicator: archived },
  ];
  const scholarshipTourSteps: TourStepType[] = [
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
      id: "add",
      title: "Add Scholarship Shortcut",
      description: "Quickly add a new scholarship using this shortcut button.",
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
    <TourProvider steps={scholarshipTourSteps}>
      <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
        <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
          <TitleReusable
            title="Inactive Scholarships"
            description="Manage inactive scholarships here. Switch between expired and archived scholarships using the tabs below."
            Icon={Archive}
            textColor="text-red-700/70"
          />

          <div className="py-8 space-y-5">
            <div className="flex">
              <TourStep stepId="tabs">
                <Tabs tabs={tabs} onTabChange={(tabId) => setTabs(tabId)} />
              </TourStep>
            </div>
            {tab === "EXPIRED" && (
              <ManageExpiredScholarship setExpired={setExpired} />
            )}
            {tab === "ARCHIVED" && (
              <ManageArchivedScholarship setArchived={setArchived} />
            )}
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
