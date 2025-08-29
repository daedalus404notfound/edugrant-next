"use client";

import ApplicationSummary from "./dashboard/summary";
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
  GalleryVerticalEnd,
  Ghost,
  GraduationCap,
  Megaphone,
  Plus,
  UserRoundCog,
} from "lucide-react";
import { format } from "date-fns";
import { BGPattern } from "@/components/ui/grid";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
    <div className="relative pl-1 pr-2 min-h-screen z-10">
      <BGPattern
        variant="grid"
        className="top-0 mask-gradient opacity-30 hidden dark:block"
        mask="fade-bottom"
      />
      <div className="lg:p-5 p-2 space-y-5 ">
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-7 ">
          <div className="py-4 lg:col-span-2 col-span-1">
            <div className="flex justify-between lg:flex-row flex-col gap-5">
              <div className="space-y-2">
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
          <div className="  space-y-7">
            <ApplicationSummary />
            <div className="bg-card p-2 rounded-lg space-y-2  shadow-md">
              <span className="flex gap-3 items-center py-2">
                <Button variant="outline" size="sm">
                  <Megaphone />
                </Button>
                <h1>Announcement</h1>
              </span>
              <div className="rounded-lg p-4">
                <Timeline className="space-y-3">
                  {announcements.map((item) => (
                    <TimelineItem
                      key={item.id}
                      step={item.id}
                      className="m-0! px-4! py-3!"
                    >
                      <TimelineTitle>
                        Win scholarship is now open.
                      </TimelineTitle>
                      <TimelineDate className="mt-1">{item.date}</TimelineDate>
                      <TimelineContent className="text-foreground mt-3">
                        {item.description}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
              <div className="flex justify-center items-center">
                <Button variant="link" size="lg">
                  View all <ArrowRight />
                </Button>
              </div>
            </div>

            <div className=" rounded-lg bg-card shadow-md">
              <div className="flex justify-between p-4">
                <span className="flex gap-3 items-center">
                  <Button variant="outline" size="sm">
                    <GraduationCap />
                  </Button>
                  <h1 className="font-medium">Active Scholarships</h1>
                </span>
                <Button variant="link" size="sm">
                  View all <ArrowRight />
                </Button>
              </div>
              <div className=" p-4 rounded-lg">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton className="h-8 w-full" key={i} />
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
            </div>
          </div>
          <div className=" space-y-7">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 ">
              <div className="bg-card rounded-lg shadow-md"></div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full aspect-square bg-card font-mono rounded-lg"
                captionLayout="dropdown"
              />
            </div>
            <div className=" font-medium rounded-lg bg-card shadow-md">
              <div className="flex  justify-between p-4">
                <span className="flex gap-3 items-center">
                  <Button variant="outline" size="sm">
                    <GalleryVerticalEnd />
                  </Button>
                  <h1>Recent Application</h1>
                </span>
                <Button variant="link" size="sm">
                  View all <ArrowRight />
                </Button>
              </div>
              <div className=" p-4 rounded-lg">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton className="h-8 w-full" key={i} />
                    ))}
                  </div>
                ) : sliced.length === 0 ? (
                  <div className="flex justify-center items-center flex-col p-4 h-30">
                    <Ghost />
                    <p className="text-sm mt-2">No application found.</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
