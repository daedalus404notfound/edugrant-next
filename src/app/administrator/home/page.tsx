"use client";

import { Button } from "@/components/ui/button";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import { TourTrigger } from "@/components/tour/tour-trigger";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowRight,
  Calendar1,
  Calendar1Icon,
  CalendarIcon,
  CheckCheck,
  GalleryVerticalEnd,
  Ghost,
  GraduationCap,
  Megaphone,
  Plus,
  TrendingUp,
  UserRoundCog,
} from "lucide-react";
import { format } from "date-fns";
import { BGPattern } from "@/components/ui/grid";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { type DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ChartBarMultiple } from "./dashboard/bar";
import ChartAreaInteractive from "./dashboard/area-chart";
import { SummaryCard, SummaryCardProps } from "./dashboard/summary";
const summaryCards: SummaryCardProps[] = [
  {
    label: "Total Applicants",
    data: 1,
    icon: <TrendingUp />,
    color: "blue",
    todayIncrement: 100,
  },
  {
    label: "Approved Applicants",
    data: 2,
    icon: <CheckCheck />,
    color: "green",
    todayIncrement: 50,
  },
  {
    label: "Active Scholarships",
    data: 3,
    icon: <GraduationCap />,
    color: "yellow",
    todayIncrement: 25,
  },
  {
    label: "Pending Applications",
    data: 4,
    icon: <GraduationCap />,
    color: "white",
    todayIncrement: 10,
  },
];
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

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(2025, 8, 15),
  });
  const [now, setNow] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    setNow(new Date().toISOString());
    const interval = setInterval(() => {
      setNow(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, loading } = useScholarshipData({
    page: 1,
    pageSize: 10,
    status: "ACTIVE",
  });
  const sliced = data.slice(0, 4);
  return (
    <div className="relative min-h-screen z-10">
      <BGPattern
        variant="grid"
        className="top-0 mask-gradient opacity-30 hidden dark:block"
        mask="fade-bottom"
      />
      <div className="lg:p-5 p-3 space-y-5 ">
        <div className="  ">
          <div className="flex justify-between lg:flex-row flex-col gap-5 ">
            <div className="lg:space-y-2 ">
              <h1 className="lg:text-2xl text-lg font-medium">
                Hello, Wally Bayola!
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                {isClient ? format(now, "PPP p") : "Loading..."}
              </p>
            </div>
            <span className="space-x-2 flex">
              <Button variant="outline" className="flex-1">
                <Plus /> Add Application
              </Button>
              <Button variant="outline" className="flex-1">
                <UserRoundCog />
                Edit Profile
              </Button>
            </span>
          </div>
        </div>
        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5 ">
          <div className="  space-y-5 ">
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-3 gap-2">
              {summaryCards.map((card, index) => (
                <SummaryCard key={index} {...card} />
              ))}
            </div>

            <ChartAreaInteractive />

            <div className=" ">
              <Button
                variant="ghost"
                className="pointer-events-auto !p-0 text-base"
              >
                <GraduationCap /> Active Scholarships
              </Button>

              <div className="rounded-lg bg-card border lg:p-6 p-3">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton className="h-10 w-full" key={i} />
                    ))}
                  </div>
                ) : sliced.length === 0 ? (
                  <div className="flex justify-center items-center flex-col p-4 h-30">
                    <Ghost />
                    <p className="text-sm mt-2">No scholarship found.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[240px]">
                          Scholarship Title
                        </TableHead>
                        <TableHead>Sponsor</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sliced.map((meow) => (
                        <TableRow key={meow.scholarshipId}>
                          <TableCell className="font-medium">
                            {meow.scholarshipTitle}
                          </TableCell>
                          <TableCell>{meow.scholarshipProvider}</TableCell>
                          <TableCell>
                            {format(meow.scholarshipDeadline, "PPP")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">
                              {meow.status || "ACTIVE"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              <div className="flex justify-center items-center">
                <Button variant="link" size="lg" className="!p-0">
                  View all <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
          <div className=" space-y-7">
            <div>
              <Button
                variant="ghost"
                className="pointer-events-auto !p-0 text-base"
              >
                <Megaphone /> Announcements
              </Button>

              <Timeline className="space-y-5">
                {announcements.map((item) => (
                  <TimelineItem
                    key={item.id}
                    step={item.id}
                    className="!m-0  bg-card  p-4! rounded-md border !mb-3"
                  >
                    <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                      <TimelineTitle className="font-medium text-base">
                        {item.title ?? "Win scholarship is now open."}
                      </TimelineTitle>
                      <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                        <CalendarIcon size={13} /> {item.date}
                      </TimelineDate>
                    </div>

                    <TimelineContent className="text-foreground mt-1 font-light">
                      {item.description}
                    </TimelineContent>

                    <div className="mt-5 flex gap-3 items-center">
                      <p className="text-xs">Tags:</p>{" "}
                      <Badge variant="secondary">Win Gatchalian</Badge>
                    </div>
                  </TimelineItem>
                ))}
              </Timeline>
              <div className="flex justify-center items-center">
                <Button variant="link" size="lg" className="!p-0">
                  View all <ArrowRight />
                </Button>
              </div>
            </div>
            <div>
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-lg border shadow-sm w-full"
              />
            </div>
            <div className=" ">
              <Button
                variant="ghost"
                className="pointer-events-auto !p-0 text-base"
              >
                <GalleryVerticalEnd /> Recent Application
              </Button>

              <div className="rounded-lg bg-card border lg:p-6 p-3">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton className="h-10 w-full" key={i} />
                    ))}
                  </div>
                ) : sliced.length === 0 ? (
                  <div className="flex justify-center items-center flex-col p-4 h-30">
                    <Ghost />
                    <p className="text-sm mt-2">No scholarship found.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[240px]">
                          Scholarship Title
                        </TableHead>
                        <TableHead>Sponsor</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sliced.map((meow) => (
                        <TableRow key={meow.scholarshipId}>
                          <TableCell className="font-medium">
                            {meow.scholarshipTitle}
                          </TableCell>
                          <TableCell>{meow.scholarshipProvider}</TableCell>
                          <TableCell>
                            {format(meow.scholarshipDeadline, "PPP")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">
                              {meow.status || "ACTIVE"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              <div className="flex justify-center items-center">
                <Button variant="link" size="lg" className="!p-0">
                  View all <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
