"use client";
import "ldrs/react/Ring.css";
import { UsersRound } from "lucide-react";
import { useState } from "react";

import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import ApprovedApplication from "./all";
import { Separator } from "@/components/ui/separator";

export default function PendingApplication() {
  const [approved, setApproved] = useState(0);
  const [approvedRenewal, setRenewApproved] = useState(0);

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="All Students"
          description="View and manage all enrolled scholarship applicants."
          Icon={UsersRound}
        />

        <Separator className="mt-4" />
        <div className="mt-10 lg:w-full md:min-w-5xl w-full mx-auto">
          <ApprovedApplication setApproved={setApproved} />
        </div>
      </div>
    </div>
  );
}
