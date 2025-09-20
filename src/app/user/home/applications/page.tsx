"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  MoreHorizontal,
  TextSearch,
  Wallet,
} from "lucide-react";

import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import useClientApplications from "@/hooks/user/getApplications";
import { useUserStore } from "@/store/useUserStore";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import Link from "next/link";

export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [status, setStatus] = useState("");
  const user = useUserStore((state) => state.user);
  const userId = user?.accountId;
  const { data, loading } = useClientApplications({
    userId: userId ? userId.toString() : "",
    page: currentPage,
    pageSize: rowsPerPage,
    status,
  });

  const { data: data2 } = useClientApplications({
    userId: userId ? userId.toString() : "",
    page: currentPage,
    pageSize: rowsPerPage,
    status: "",
  });

  const pendingLength =
    data2.filter((meow) => meow.status === "PENDING").length || null;
  const reviewedLength =
    data2.filter((meow) => meow.status === "INTERVIEW").length || null;
  const approvedLength =
    data2.filter((meow) => meow.status === "APPROVED").length || null;
  const declinedLength =
    data2.filter((meow) => meow.status === "DECLINED").length || null;
  const blockedLength =
    data2.filter((meow) => meow.status === "BLOCKED").length || null;

  console.log(pendingLength);
  const tabs = [
    { id: "", label: "All Application", indicator: null },
    { id: "PENDING", label: "Pending", indicator: pendingLength },
    { id: "INTERVIEW", label: "For Interview", indicator: reviewedLength },
    { id: "APPROVED", label: "Approved", indicator: approvedLength },
    { id: "DECLINED", label: "Rejected", indicator: declinedLength },
    { id: "BLOCKED", label: "Blocked", indicator: blockedLength },
  ];

  return (
    <div className="  bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:pt-10  pt-3">
        <div className="flex justify-between items-end">
          <TitleReusable
            title="My Applications"
            description=""
            Icon={TextSearch}
          />
        </div>

        {/* <div className="flex gap-2 mt-5">
          <div className="flex-1">
            <Input placeholder="Search..." />
          </div>
          <Button variant="secondary">
            <MoreHorizontal />
          </Button>
        </div> */}
        <div className="overflow-y-hidden overflow-x-auto py-8 no-scrollbar">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </div>
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 ">
          {loading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-2 bg-background/40 relative rounded-md border space-y-3"
              >
                <Skeleton className="aspect-[16/8.5]" />
                <Skeleton className="h-10" />
                <div className="flex gap-3 h-11">
                  <Skeleton className="flex-1" />
                  <Skeleton className="flex-1" />
                  <Skeleton className="flex-1" />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : (
            data.map((meow) => (
              <Link
                href={`/user/home/applications/${meow.applicationId}`}
                key={meow.applicationId}
                prefetch
                scroll={false}
                className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
              >
                <div className="relative rounded-lg bg-background ">
                  <img
                    className="absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs "
                    src={meow.Scholarship.logo}
                    alt=""
                  />
                  <div className="relative z-10">
                    <div className=" aspect-[16/8.5] w-full rounded-md overflow-hidden">
                      <img
                        className="h-full w-full object-cover    "
                        src={meow.Scholarship.logo}
                        alt=""
                      />
                    </div>
                    <div className=" lg:p-4 p-2 space-y-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 lg:space-y-1">
                          <h3 className="font-semibold lg:text-lg text-base  text-balance leading-tight">
                            {meow.Scholarship.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {meow.Scholarship.providerName}
                          </p>
                        </div>
                        <Badge
                          className={`  ${
                            meow.status === "PENDING"
                              ? "bg-yellow-700  "
                              : meow.status === "APPROVED"
                              ? "bg-green-700 "
                              : meow.status === "DECLINED"
                              ? "bg-red-700"
                              : meow.status === "REVIEWED"
                              ? "bg-blue-700 "
                              : meow.status === "BLOCKED"
                              ? "bg-gray-700 "
                              : ""
                          } border-0 text-gray-200`}
                          variant="outline"
                        >
                          {meow.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground ">
                        <Badge variant="outline" className="">
                          GOVERNMENT
                        </Badge>
                        <span>
                          Submitted{" "}
                          {format(
                            meow.Application_Decision.dateCreated,
                            "MM/dd/yy"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
