"use client";

import { Button } from "@/components/ui/button";
// import { TourProvider } from "@/components/tour/tour-provider";
// import { TourStep } from "@/components/tour/tour-step";
// import { TourTrigger } from "@/components/tour/tour-trigger";
// import type { TourStep as TourStepType } from "@/lib/use-tour";
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
  ArrowRightIcon,
  Calendar1,
  Calendar1Icon,
  CalendarIcon,
  CheckCheck,
  GalleryVerticalEnd,
  Ghost,
  GraduationCap,
  Lock,
  Megaphone,
  Plus,
  TrendingUp,
  UserRoundCog,
} from "lucide-react";
import { format } from "date-fns";
import { BGPattern } from "@/components/ui/grid";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [now, setNow] = useState<string>("");
  const { user } = useUserStore();
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
    
      <div className="lg:p-5 p-3 space-y-5 ">
        <div className="  ">
          <div className="flex justify-between lg:flex-row flex-col gap-5 ">
            <div className="lg:space-y-2 ">
              <h1 className="lg:text-2xl text-lg font-medium">
                Hello, {user?.Student.fName} {user?.Student.lName}!
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
        <div className="flex flex-col justify-between gap-2 md:flex-row dark:bg-red-700/40 bg-red-200 rounded-md p-4">
          <div className="flex grow gap-3">
            <Lock
              className="mt-0.5 shrink-0 opacity-60"
              size={16}
              aria-hidden="true"
            />
            <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
              <p className="text-sm">
                Please complete your profile details to unlock the scholarship
                and apply.
              </p>
              <Link
                href="/user/home/profile"
                prefetch={true}
                scroll={false}
                className="group text-sm font-medium whitespace-nowrap underline"
              >
                View Profile
                <ArrowRightIcon
                  className="ms-2 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className=" grid lg:grid-cols-3 grid-cols-1 lg:gap-5 ">
          <div className="  space-y-5 col-span-2">
            <div className="grid  lg:grid-cols-3 grid-cols-1 lg:gap-3 gap-3">
              {summaryCards.map((card, index) => (
                <SummaryCard key={index} {...card} />
              ))}
            </div>
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
                    className="!m-0  bg-card lg:p-6!  p-4! rounded-md border !mb-3"
                  >
                    <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                      <TimelineTitle className="font-medium text-base">
                        {item.title ?? "Win scholarship is now open."}
                      </TimelineTitle>
                      <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                        <CalendarIcon size={13} /> {item.date}
                      </TimelineDate>
                    </div>

                    <TimelineContent className="text-foreground mt-3 font-light">
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
                            {meow.title}
                          </TableCell>
                          <TableCell>
                            {meow.Scholarship_Provider.name}
                          </TableCell>
                          <TableCell>{format(meow.deadline, "PPP")}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">ACTIVE</Badge>
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
                            {meow.title}
                          </TableCell>
                          <TableCell>
                            {meow.Scholarship_Provider.name}
                          </TableCell>
                          <TableCell>{format(meow.deadline, "PPP")}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">ACTIVE</Badge>
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
            <div className="grid lg:grid-cols-1 grid-cols-1 gap-7 ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full aspect-square bg-card border font-mono lg:rounded-lg rounded-md lg:p-6 p-3 dark:bg-zinc-950 "
                captionLayout="dropdown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
