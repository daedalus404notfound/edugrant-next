"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarIcon,
  Megaphone,
  MoreHorizontal,
} from "lucide-react";

import { useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";

import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
];

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import Link from "next/link";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import AnnouncementDescription from "@/app/administrator/home/announcements/manage/description";

export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [sortBy] = useState("");
  const [order] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const { data, loading } = useAnnouncementFetch({
    page,
    pageSize,
    sortBy,
    order,
    status,
  });

  const tabs = [
    { id: "", label: "All Application", indicator: null },
    { id: "PENDING", label: "Pending", indicator: null },
    { id: "REVIEWED", label: "Reviewed", indicator: null },
    { id: "APPROVED", label: "Approved", indicator: null },
    { id: "DECLINED", label: "Rejected", indicator: null },
    { id: "BLOCKED", label: "Blocked", indicator: null },
  ];

  return (
    <div className="  bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:pt-10  pt-3">
        <div className="flex justify-between items-end">
          <TitleReusable
            title="Announcements"
            description=""
            Icon={Megaphone}
          />
        </div>

        <div className="flex gap-2 mt-5">
          <div className="flex-1">
            <Input placeholder="Search announcement..." />
          </div>
          <Button variant="secondary">
            <MoreHorizontal />
          </Button>
        </div>
        <div className="overflow-y-hidden overflow-x-auto py-8 no-scrollbar">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </div>

        <div>
          <Timeline className="space-y-5">
            {loading ? (
              <></>
            ) : (
              data.map((item) => (
                <TimelineItem
                  key={item.announcementId}
                  step={item.announcementId}
                  className="!m-0  bg-card  p-4! rounded-md border !mb-3"
                >
                  <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                    <TimelineTitle className="font-medium text-base">
                      {item.title ?? "Win scholarship is now open."}
                    </TimelineTitle>
                    <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                      <CalendarIcon size={13} />{" "}
                      {format(item.startDate, "PPP p")}
                    </TimelineDate>
                  </div>

                  <TimelineContent className="text-foreground mt-1 whitespace-pre-line">
                    <AnnouncementDescription description={item.description} />
                  </TimelineContent>

                  <div className="mt-5 flex gap-3 items-center">
                    <p className="text-xs">Tags:</p>{" "}
                    <Badge variant="secondary">Win Gatchalian</Badge>
                  </div>
                </TimelineItem>
              ))
            )}
          </Timeline>
          <div className="flex justify-center items-center">
            <Button variant="link" size="lg" className="!p-0">
              Load More <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
