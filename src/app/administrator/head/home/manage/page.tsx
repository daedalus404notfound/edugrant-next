"use client";
import { GraduationCap } from "lucide-react";

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

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Scholarship Management"
          description="View and manage scholarships. Switch between active scholarships and renewals using the tabs below."
          Icon={GraduationCap}
        />

        <div className="py-8 space-y-5">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
          {status === "ACTIVE" && (
            <ManageActiveScholarship setActive={setActive} />
          )}
          {status === "RENEW" && (
            <ManageRenewScholarship setRenewal={setRenewal} />
          )}
        </div>
      </div>
    </div>
  );
}
