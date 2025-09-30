"use client";
import { GraduationCap } from "lucide-react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import { TourTrigger } from "@/components/tour/tour-trigger";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { useState } from "react";
import ManageActiveScholarship from "./new";
import ManageRenewScholarship from "./renewal";
export default function Manage() {
  const [status, setStatus] = useState("ACTIVE");
  const [active, setActive] = useState(0);
  const [renewal, setRenewal] = useState(0);
  const tabs = [
    { id: "ACTIVE", label: "Active Scholarship", indicator: active },
    { id: "RENEW", label: "Scholarship Renewals", indicator: renewal },
  ];
  const scholarshipTourSteps: TourStepType[] = [
    {
      id: "tabs",
      title: "Active vs Renewals",
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
      <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
        <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
          <TitleReusable
            title="Scholarship Management"
            description="View and manage scholarships. Switch between active scholarships and renewals using the tabs below."
            Icon={GraduationCap}
          />

          <div className="py-8 space-y-5">
            <div className="flex">
              <TourStep stepId="tabs">
                <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
              </TourStep>
            </div>
            {status === "ACTIVE" && (
              <ManageActiveScholarship setActive={setActive} />
            )}
            {status === "RENEW" && (
              <ManageRenewScholarship setRenewal={setRenewal} />
            )}
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
