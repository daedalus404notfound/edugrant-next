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
  CalendarIcon,
  CheckCheck,
  ExternalLink,
  GraduationCap,
  Grid2X2,
  Lock,
  Map,
  Settings,
  Sparkles,
  SquareUser,
  SquareUserRound,
  TrendingUp,
  UserRoundCog,
  Wrench,
} from "lucide-react";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { AnimatePresence, motion } from "motion/react";
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
import TitleReusable from "@/components/ui/title";
import usefetchUserDashboard from "@/hooks/user/getUserDashboard";
import ScholarshipApplicationActivity from "./application-activity";
import { Card } from "@/components/ui/card";
import WelcomeCard from "./dashboard-components/welcome-card";
import ProfileProgress from "./dashboard-components/profile-progress";
import Announcements from "./dashboard-components/announcement";
import OngoingScholarshipDashboard from "./dashboard-components/ongoing-scholarship";
import RecentApplicationDashboard from "./dashboard-components/recent-application";
import CompleteChecker from "./dashboard-components/complete-check";
import { ProfileCompletion } from "./dashboard-components/profile-progress-2";

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [now, setNow] = useState<string>("");
  const { user } = useUserStore();
  const accountId = user?.accountId;
  const schoolId = user?.schoolId;
  const { percentage, completed } = getFamilyBackgroundProgress(user?.Student);
  const [isClient, setIsClient] = useState(false);

  const summaryCards: SummaryCardProps[] = [
    {
      label: "Total Applcations",
      data: user?.Student.Application ? user?.Student.Application.length : 0,
      icon: <TrendingUp />,
      color: "blue",
      todayIncrement: 0,
    },
    {
      label: "Approved Application",
      data: user?.Student.Application
        ? user?.Student.Application.filter((meow) => meow.status === "APPROVED")
            .length
        : 0,
      icon: <CheckCheck />,
      color: "green",
      todayIncrement: 0,
    },
    {
      label: "For Intervew",
      data: user?.Student.Application
        ? user?.Student.Application.filter(
            (meow) => meow.status === "INTERVIEW"
          ).length
        : 0,
      icon: <GraduationCap />,
      color: "white",
      todayIncrement: 0,
    },
    {
      label: "Pending Application",
      data: user?.Student.Application
        ? user?.Student.Application.filter((meow) => meow.status === "PENDING")
            .length
        : 0,
      icon: <GraduationCap />,
      color: "yellow",
      todayIncrement: 0,
    },
  ];
  useEffect(() => {
    setIsClient(true);
    setNow(new Date().toISOString());
    const interval = setInterval(() => {
      setNow(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, loading } = usefetchUserDashboard(accountId, schoolId);
  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-5">
        {/* {!completed && <CompleteChecker />} */}
        <CompleteChecker />
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 ">
          <div className="space-y-10 col-span-2">
            <WelcomeCard />
            <OngoingScholarshipDashboard
              scholarship={data?.onGoingScholarships ?? []}
              loading={loading}
            />
            <RecentApplicationDashboard
              application={data?.recentApplications ?? []}
              loading={loading}
            />

            <Announcements
              announcement={data?.announcements ?? []}
              loading={loading}
            />
            <RecentApplicationDashboard
              application={data?.recentApplications ?? []}
              loading={loading}
            />
          </div>
          <div className="space-y-12">
            <ProfileCompletion />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm w-full bg-card"
              captionLayout="dropdown"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
//    <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-5">
//      {/* {!completed && <CompleteChecker />} */}
//      <CompleteChecker />
//      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
//        <div className="space-y-10">
//          <WelcomeCard />
//          <Announcements
//            announcement={data?.announcements ?? []}
//            loading={loading}
//          />
//          <RecentApplicationDashboard
//            application={data?.recentApplications ?? []}
//            loading={loading}
//          />
//        </div>

//        <div className="space-y-10">
//          <div className="grid  lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3">
//            {summaryCards.map((card, index) => (
//              <SummaryCard key={index} {...card} />
//            ))}
//          </div>

//          <OngoingScholarshipDashboard
//            scholarship={data?.onGoingScholarships ?? []}
//            loading={loading}
//          />
//        </div>
//      </div>
//    </div>
//  </div>;
