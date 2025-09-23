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
  ArrowRightIcon,
  CalendarIcon,
  CheckCheck,
  ExternalLink,
  GraduationCap,
  Grid2X2,
  Lock,
  TrendingUp,
  UserRoundCog,
} from "lucide-react";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
const mockApplications = [
  {
    id: "1",
    scholarshipName: "Merit Excellence Scholarship",
    appliedDate: "2024-01-15",
    status: "Under Review",
    amount: "$5,000",
    progress: 75,
  },
  {
    id: "2",
    scholarshipName: "STEM Innovation Grant",
    appliedDate: "2024-01-10",
    status: "Approved",
    amount: "$3,500",
    progress: 100,
  },
  {
    id: "3",
    scholarshipName: "Community Leadership Award",
    appliedDate: "2024-01-20",
    status: "Pending Documents",
    amount: "$2,500",
    progress: 40,
  },
];
const programmingLanguages = [
  {
    id: "1",
    name: "JavaScript",
    releaseYear: "1995",
    developer: "Brendan Eich",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".js",
    latestVersion: "ES2021",
    popularity: "High",
  },
  {
    id: "2",
    name: "Python",
    releaseYear: "1991",
    developer: "Guido van Rossum",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".py",
    latestVersion: "3.10",
    popularity: "High",
  },
  {
    id: "3",
    name: "Java",
    releaseYear: "1995",
    developer: "James Gosling",
    typing: "Static",
    paradigm: "Object-oriented",
    extension: ".java",
    latestVersion: "17",
    popularity: "High",
  },
];
import { format } from "date-fns";
import { BGPattern } from "@/components/ui/grid";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";

const summaryCards: SummaryCardProps[] = [
  {
    label: "Total Applcations",
    data: 1,
    icon: <TrendingUp />,
    color: "blue",
    todayIncrement: 100,
  },
  {
    label: "Approved Applications",
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
    title: "New Scholarship Program Launch",
    description:
      "We're excited to announce our new Graduate Excellence Scholarship worth $10,000 for outstanding graduate students.",
    date: "Jan 18, 2025",
    priority: "high",
    tag: "New Program",
  },
  {
    id: 2,
    title: "Application Deadline Extension",
    description:
      "Due to high demand, we've extended the deadline for Merit Excellence applications to March 30, 2025.",
    date: "Jan 15, 2025",
    priority: "medium",
    tag: "Deadline Update",
  },
  {
    id: 3,
    title: "Virtual Info Session",
    description:
      "Join us for a virtual information session about scholarship opportunities on February 5th at 2 PM EST.",
    date: "Jan 12, 2025",
    priority: "low",
    tag: "Event",
  },
];

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [now, setNow] = useState<string>("");
  const { user } = useUserStore();
  const { percentage, completed } = getFamilyBackgroundProgress(user?.Student);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    setNow(new Date().toISOString());
    const interval = setInterval(() => {
      setNow(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function ApplicationCard({ application }: { application: any }) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Approved":
          return "text-green-400 bg-green-400/10";
        case "Under Review":
          return "text-yellow-400 bg-yellow-400/10";
        case "Pending Documents":
          return "text-orange-400 bg-orange-400/10";
        default:
          return "text-muted-foreground bg-gray-400/10";
      }
    };

    return (
      <div className="bg-card backdrop-blur-sm border  rounded-lg p-6  ">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold ">{application.scholarshipName}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Applied on {application.appliedDate}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              application.status
            )}`}
          >
            {application.status}
          </span>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Documents Submitted
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="text-lg font-medium ">3</span> / 3
            </span>
          </div>
        </div>

        <Button className="w-full mt-2" variant="secondary">
          View Details
        </Button>
      </div>
    );
  }
  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="py-8 px-5 space-y-5">
        {!completed && (
          <div className="bg-card text-foreground px-4 py-3 rounded-md">
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="flex grow gap-3">
                <Lock
                  className="mt-0.5 shrink-0 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
                  <p className="text-sm">
                    Complete profile details first to access apply scholarship
                    feature
                  </p>
                  <a
                    href="#"
                    className="group text-sm font-medium whitespace-nowrap"
                  >
                    View Profile
                    <ArrowRightIcon
                      className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 ">
          <div className="space-y-10">
            <div className="lg:space-y-2 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground tracking-wide">
                  {isClient ? format(now, "PPP p") : "Loading..."}
                </p>
                <h1 className="lg:text-2xl text-lg havelock tracking-[-3px]">
                  Hi, {user?.Student.fName} {user?.Student.lName}!
                </h1>
              </div>
              <div className="space-x-3">
                <Button size="lg">
                  <GraduationCap />
                  Apply
                </Button>
                <Button size="lg">
                  <Grid2X2 />
                  Track
                </Button>
              </div>
            </div>
            <div className="grid  lg:grid-cols-3 grid-cols-1 lg:gap-3 gap-3">
              {summaryCards.map((card, index) => (
                <SummaryCard key={index} {...card} />
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-base font-medium">Announcements</h1>
                <Button size="sm" variant="link">
                  See All <ExternalLink />
                </Button>
              </div>
              <Timeline className="space-y-5">
                {announcements.map((item) => (
                  <TimelineItem
                    key={item.id}
                    step={item.id}
                    className="!m-0  bg-card lg:px-6! lg:py-4!  p-4! rounded-md border-l-3 dark:border-green-800 border-green-500 !mb-3"
                  >
                    <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                      <TimelineTitle className="font-medium text-base">
                        {item.title ?? "Win scholarship is now open."}
                      </TimelineTitle>
                      <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                        <CalendarIcon size={13} /> {item.date}
                      </TimelineDate>
                    </div>

                    <TimelineContent className="text-foreground mt-3 line-clamp-1">
                      {item.description}
                    </TimelineContent>

                    <div className="mt-5 flex gap-3 items-center">
                      <p className="text-xs">Tags:</p>{" "}
                      <Badge variant="secondary">Win Gatchalian</Badge>
                    </div>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-card backdrop-blur-sm border  rounded-lg px-6 py-4  ">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold flex gap-2 items-center">
                    <UserRoundCog size={18} /> Complete your profile
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your profile to unlock scholarships.
                  </p>
                </div>
                <Button variant="secondary">View Details</Button>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm">{percentage}%</span>
                </div>

                <Progress value={percentage} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-base font-medium">Recent Application</h1>
                <Button size="sm" variant="link">
                  See All <ExternalLink />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockApplications.slice(0, 2).map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-base font-medium">Active Scholarship</h1>
                <Button size="sm" variant="link">
                  Browse All <ExternalLink />
                </Button>
              </div>
              <div className="rounded-md border overflow-hidden bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="py-2 pl-4">Name</TableHead>
                      <TableHead className="py-2">Release Year</TableHead>
                      <TableHead className="py-2">Developer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programmingLanguages.map((language) => (
                      <TableRow key={language.id}>
                        <TableCell className="py-2 font-medium pl-4">
                          {language.name}
                        </TableCell>
                        <TableCell className="py-4">
                          {language.releaseYear}
                        </TableCell>
                        <TableCell className="py-4">
                          {language.developer}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
