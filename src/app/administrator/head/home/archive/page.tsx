"use client";
import "ldrs/react/Ring.css";
import { Archive } from "lucide-react";
import { useState } from "react";
import TitleReusable from "@/components/ui/title";
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

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Inactive Scholarships"
          description="Manage inactive scholarships here. Switch between expired and archived scholarships using the tabs below."
          Icon={Archive}
        />

        <div className="py-8 space-y-5">
          <Tabs tabs={tabs} onTabChange={(tabId) => setTabs(tabId)} />
          {tab === "EXPIRED" && (
            <ManageExpiredScholarship setExpired={setExpired} />
          )}
          {tab === "ARCHIVED" && (
            <ManageArchivedScholarship setArchived={setArchived} />
          )}
        </div>
      </div>
    </div>
  );
}
