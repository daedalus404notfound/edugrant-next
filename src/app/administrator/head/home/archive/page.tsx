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
    <TourProvider steps={scholarshipTourSteps}>
      <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
        <div className="mx-auto w-[95%] lg:py-10  py-4">
          <TitleReusable
            title="Inactive Scholarship Management"
            description="Manage inactive scholarships here. Switch between expired and archived scholarships using the tabs below."
            Icon={Archive}
            textColor="text-red-700/70"
          />
          <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
            <TourStep stepId="tabs">
              <Tabs tabs={tabs} onTabChange={(tabId) => setTabs(tabId)} />
            </TourStep>
          </div>
          <div className="mt-15 lg:w-full md:min-w-5xl w-full mx-auto">
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
