"use client";
import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";
import {
  ArrowRight,
  CalendarIcon,
  CheckCheck,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { ActiveScholarships } from "./active-scholarship";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { RecentApplications } from "./recent-application";
import TitleReusable from "@/components/ui/title";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import usefetchStaffDashboard from "@/hooks/getStaffDashboard";
import { useAdminStore } from "@/store/adminUserStore";
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
const scholarshipApplications = [
  {
    id: "1",
    fullName: "Juan Dela Cruz",
    age: 18,
    course: "BS Information Technology",
    yearLevel: "1st Year",

    scholarshipType: "Government",
    status: "Pending",
  },
  {
    id: "2",
    fullName: "Maria Santos",
    age: 20,
    course: "BS Civil Engineering",
    yearLevel: "2nd Year",

    scholarshipType: "Private",
    status: "Approved",
  },
  {
    id: "3",
    fullName: "Pedro Ramirez",
    age: 19,
    course: "BS Computer Science",
    yearLevel: "1st Year",

    scholarshipType: "Private",
    status: "Pending",
  },
];
const scholarships = [
  {
    id: "1",
    name: "Government Academic Excellence Scholarship",
    provider: "Department of Education",
    type: "Government",
    status: "Active",
  },
  {
    id: "2",
    name: "Private Engineering Scholarship",
    provider: "ABC Foundation",
    type: "Private",
    status: "Active",
  },
  {
    id: "3",
    name: "STEM Achievers Grant",
    provider: "XYZ Corporation",
    type: "Private",
    status: "Active",
  },
];

export default function StaffDashboard() {
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;
  const { data, loading } = usefetchStaffDashboard(accountId);
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClient, setIsClient] = useState(false);
  const [now, setNow] = useState<string>("");
  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-12">
        <div className="grid  grid-cols-4  gap-4">
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-12">
            <ActiveScholarships data={data?.scholarships} loading={loading} />

            <RecentApplications data={data?.applications} loading={loading} />
          </div>

          <div className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      Announcements
                    </h2>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>

                <Timeline className="space-y-5">
                  {data?.announcements.slice(0, 3).map((item, index) => (
                    <TimelineItem
                      key={item.announcementId}
                      step={index}
                      className="!m-0  bg-card   p-6! rounded-md !mb-4"
                    >
                      <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                        <TimelineTitle className="font-medium text-base">
                          {item.title ?? "Win scholarship is now open."}
                        </TimelineTitle>
                        <TimelineDate className="lg:text-sm text-xs t flex items-center gap-1.5">
                          <CalendarIcon size={13} />{" "}
                          {item.dateCreated &&
                            format(item.dateCreated, "PPP p")}
                        </TimelineDate>
                      </div>

                      <TimelineContent className=" mt-1 line-clamp-2">
                        {item.description}
                      </TimelineContent>

                      <div className="mt-5 flex gap-3 items-center">
                        <Badge variant="secondary">Win Gatchalian</Badge>
                      </div>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
