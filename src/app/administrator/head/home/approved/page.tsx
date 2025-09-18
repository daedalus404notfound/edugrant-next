"use client";
import "ldrs/react/Ring.css";
import { UserRoundMinus } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Approved Applications"
          description="Applications that have been approved and finalized."
          Icon={UserRoundMinus}
        />

        <div className="py-8 space-y-5">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
          {status === "APPROVED" && (
            <ApprovedApplication setApproved={setApproved} />
          )}
          {status === "RENEWAPPROVED" && (
            <ApprovedRenewApplication setRenewApproved={setRenewApproved} />
          )}
        </div>
      </div>
    </div>
  );
}
