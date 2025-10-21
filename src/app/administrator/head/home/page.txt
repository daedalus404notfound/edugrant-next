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
import { useAdminStore } from "@/store/adminUserStore";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
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

export default function AdminDashboard() {
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [sortBy] = useState("");
  const [order] = useState("");
  const { data: dataAnnouncement, loading: loadingAnnouncement } =
    useAnnouncementFetch({
      page,
      pageSize,
      sortBy,
      order,
    });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(2025, 8, 15),
  });
  const { admin } = useAdminStore();
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
    accountId: admin?.accountId,
  });
  const sliced = data.slice(0, 4);
  return (
    <div className="relative min-h-screen z-10">
      <div className="lg:p-5 p-3 space-y-5 ">
        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5 ">
          <div className="  space-y-5 ">
            <div className="">
              <div className="flex justify-between lg:flex-row flex-col gap-5 ">
                <div className="lg:space-y-2 ">
                  <h1 className="lg:text-2xl text-lg font-medium">
                    Hello, {admin?.ISPSU_Head.fName} {admin?.ISPSU_Head.lName}!
                  </h1>
                  <p className="text-sm text-muted-foreground font-mono">
                    {isClient ? format(now, "PPP p") : "Loading..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-3 gap-2">
              {summaryCards.map((card, index) => (
                <SummaryCard key={index} {...card} />
              ))}
            </div>

            <ChartAreaInteractive />

            <div className="space-y-2">
              <h1 className="font-medium text-lg">Active Scholarship</h1>

              <Table>
                <TableHeader className="">
                  <TableRow className="bg-card">
                    <TableHead className="h-9 p-3">Name</TableHead>
                    <TableHead className="h-9 p-3">Provider</TableHead>
                    <TableHead className="h-9 p-3">Type</TableHead>
                    <TableHead className="h-9 p-3">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {sliced.map((scholarship) => (
                    <TableRow key={scholarship.scholarshipId}>
                      <TableCell className="py-4 px-2 font-medium">
                        {scholarship.title}
                      </TableCell>
                      <TableCell className="py-4 px-2">
                        {scholarship.Scholarship_Provider.name}
                      </TableCell>
                      <TableCell className="py-4 px-2">
                        {scholarship.type}
                      </TableCell>
                      <TableCell className="py-4 px-2">
                        <Badge className="bg-green-50 dark:bg-green-600/20 text-green-700">
                          ACTIVE
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-center text-sm underline flex gap-1.5 items-center justify-center font-medium">
                View All <ArrowRight size={15} />
              </p>
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
                {dataAnnouncement.slice(0, 2).map((item, index) => (
                  <TimelineItem
                    key={item.announcementId}
                    step={index}
                    className="!m-0  bg-card  p-4! rounded-md border !mb-3"
                  >
                    <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                      <TimelineTitle className="font-medium text-base">
                        {item.title ?? "Win scholarship is now open."}
                      </TimelineTitle>
                      <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                        <CalendarIcon size={13} />{" "}
                        {item.startDate && format(item.startDate, "PPP p")}
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

            <div className="space-y-2">
              <h1 className="font-medium text-lg">Recent Application</h1>

              <Table>
                <TableHeader className="">
                  <TableRow className="bg-card">
                    <TableHead className="h-9 p-3">Name</TableHead>
                    <TableHead className="h-9 p-3">Provider</TableHead>
                    <TableHead className="h-9 p-3">Type</TableHead>
                    <TableHead className="h-9 p-3">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {sliced.map((scholarship) => (
                    <TableRow key={scholarship.scholarshipId}>
                      <TableCell className="py-4 px-2 font-medium">
                        {scholarship.title}
                      </TableCell>
                      <TableCell className="py-4 px-2">
                        {scholarship.Scholarship_Provider.name}
                      </TableCell>
                      <TableCell className="py-4 px-2">
                        {scholarship.type}
                      </TableCell>
                      <TableCell className="py-4 px-2">
                        <Badge className="bg-green-50 dark:bg-green-600/20 text-green-700">
                          ACTIVE
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-center text-sm underline flex gap-1.5 items-center justify-center font-medium">
                View All <ArrowRight size={15} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
