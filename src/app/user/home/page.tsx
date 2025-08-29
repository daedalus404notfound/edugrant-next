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
  GraduationCap,
  Megaphone,
  Plus,
  UserRoundCog,
} from "lucide-react";
import { format } from "date-fns";
import { BGPattern } from "@/components/ui/grid";
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

  return (
    <div className="relative pl-1 pr-2 min-h-screen z-10">
      <BGPattern
        variant="grid"
        className="top-0 mask-gradient opacity-30"
        mask="fade-bottom"
      />
      <div className="px-5  py-3 space-y-5 ">
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-5 ">
          <div className="  space-y-7">
            <div className="p-2">
              <div className="flex justify-between ">
                <h1 className="text-2xl font-medium">Welcome, Wally!</h1>
                <span className="space-x-2">
                  <Button variant="outline">
                    <Plus /> Add Application
                  </Button>
                  <Button variant="outline">
                    <UserRoundCog />
                    Edit Profile
                  </Button>
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {isClient ? format(now, "PPP p") : "Loading..."}
              </p>
            </div>
            <ApplicationSummary />

            <div className="space-y-3 font-medium rounded-lg bg-card  p-2 shadow-md">
              <div className="flex justify-between py-2">
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
              <div className="bg-background p-4 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-3 font-medium rounded-lg bg-card  p-2 shadow-md">
              <div className="flex justify-between py-2">
                <span className="flex gap-3 items-center">
                  <Button variant="outline" size="sm">
                    <GraduationCap />
                  </Button>
                  <h1>Active Scholarships</h1>
                </span>
                <Button variant="link" size="sm">
                  View all <ArrowRight />
                </Button>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className=" space-y-7">
            <div className="bg-card p-2 rounded-lg space-y-2  shadow-md">
              <span className="flex gap-3 items-center py-2">
                <Button variant="outline" size="sm">
                  <Megaphone />
                </Button>
                <h1>Announcement</h1>
              </span>
              <div className="bg-background rounded-lg p-4">
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
            <div className="grid grid-cols-2 gap-3 ">
              <div></div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full aspect-square bg-card font-mono rounded-lg"
                captionLayout="dropdown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
