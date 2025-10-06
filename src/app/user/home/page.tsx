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

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-800";
  };

  const getProgressContainerColor = (percentage: number) => {
    if (percentage < 30) return "bg-red-500/20";
    if (percentage < 70) return "bg-yellow-500/20";
    return "bg-green-800/20";
  };

  const { data, loading } = usefetchUserDashboard(accountId, schoolId);
  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-5">
        {!completed && (
          <div className=" text-foreground px-4 py-3 rounded-md bg-card lg:dark">
            <div className="flex flex-col justify-between gap-2 md:flex-row ">
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
                  <Link
                    className="group text-sm font-medium whitespace-nowrap"
                    href={"/user/home/profile"}
                  >
                    View Profile
                    <ArrowRightIcon
                      className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                      size={16}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="lg:space-y-2 space-y-8 flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground tracking-wide"></p>
            <h1 className="lg:text-2xl text-2xl  font-semibold"></h1>
            <TitleReusable
              title={` Hi, ${user?.Student.fName} ${user?.Student.lName}!`}
              description={isClient ? format(now, "PPP p") : "Loading..."}
            />
          </div>

          <div className="space-y-3">
            <div className=" flex gap-3">
              <Link href={"/user/home/scholarships"} className="flex-1">
                <Button size="lg" className="w-full">
                  <GraduationCap />
                  Apply <ArrowRight />
                </Button>
              </Link>
              <Link href={"/user/home/applications"} className="flex-1">
                <Button size="lg" className="w-full " variant="secondary">
                  <Map />
                  Track
                  <ArrowRight />
                </Button>
              </Link>
            </div>
            <div className="bg-background shadow backdrop-blur-sm border  rounded-lg lg:p-6 p-4 lg:hidden block  ">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold flex gap-2 items-center">
                    <Settings size={18} /> Setup your profile
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your personal details and preferences to complete your
                    profile.
                  </p>
                </div>
                <Link href={"/user/home/profile"}>
                  <Button variant="secondary">
                    <ArrowRight />
                  </Button>
                </Link>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm">{percentage}%</span>
                </div>

                <div
                  className={`w-full ${getProgressContainerColor(
                    percentage
                  )} rounded-full h-2`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
                      percentage
                    )}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 ">
          <div className="space-y-10">
            <div className="grid  lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      // initial={{ y: 50, opacity: 0 }}
                      // animate={{ y: 0, opacity: 1 }}
                      // transition={{
                      //   duration: 0.3,
                      //   delay: index * 0.1,
                      //   ease: "easeOut",
                      // }}
                      className="bg-background/40 relative rounded-md space-y-3"
                    >
                      <Skeleton className="h-32" />
                    </div>
                  ))
                : summaryCards.map((card, index) => (
                    <SummaryCard key={index} {...card} />
                  ))}
            </div>

            {loading ? (
              <Skeleton className="h-70" />
            ) : (
              <ScholarshipApplicationActivity />
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-base font-medium">Announcements</h1>
                <Link href={"/user/home/announcements"}>
                  <Button size="sm" variant="link">
                    See All <ExternalLink />
                  </Button>
                </Link>
              </div>
              <Timeline className="space-y-5">
                {loading ? (
                  [...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="bg-background/40 relative rounded-md space-y-3"
                    >
                      <Skeleton className="h-30" />
                    </motion.div>
                  ))
                ) : data?.announcements.length === 0 ? (
                  <>No announcement found.</>
                ) : (
                  data?.announcements.slice(0, 3).map((item, index) => (
                    <TimelineItem
                      key={item.announcementId}
                      step={index}
                      className="!m-0  bg-card shadow  p-6! rounded-md  !mb-5"
                    >
                      <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                        <TimelineTitle className="font-medium text-base">
                          {item.title ?? "Win scholarship is now open."}
                        </TimelineTitle>
                        <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                          <CalendarIcon size={13} />{" "}
                          {item.dateCreated && format(item.dateCreated, "PPP")}
                        </TimelineDate>
                      </div>

                      <TimelineContent className="text-foreground mt-3 line-clamp-1">
                        {item.description}
                      </TimelineContent>

                      <div className="mt-5 flex gap-3 items-center">
                        <Badge variant="secondary">Win Gatchalian</Badge>
                      </div>
                    </TimelineItem>
                  ))
                )}
              </Timeline>
            </div>
          </div>

          <div className="space-y-10">
            {loading ? (
              <Skeleton className="h-40" />
            ) : (
              <div className="hidden lg:block rounded-xl p-6 bg-gradient-to-br from-card/90 to-background/70 backdrop-blur-md shadow-md  transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold flex gap-2 items-center">
                      <UserRoundCog size={18} /> Complete your profile
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile to unlock scholarships.
                    </p>
                  </div>
                  <Link href={"/user/home/profile"}>
                    <Button variant="secondary">View Details</Button>
                  </Link>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{percentage}%</span>
                  </div>

                  <div
                    className={`w-full ${getProgressContainerColor(
                      percentage
                    )} rounded-full h-2`}
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
                        percentage
                      )}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-base font-medium">Ongoing Scholarship</h1>

                <Link href={"/user/home/scholarships"}>
                  <Button size="sm" variant="link">
                    Browse All <ExternalLink />
                  </Button>
                </Link>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 ">
                {loading ? (
                  [...Array(2)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="bg-background/40 relative rounded-md space-y-3"
                    >
                      <Skeleton className="h-50" />
                    </motion.div>
                  ))
                ) : data?.scholarships.length === 0 ? (
                  <>No scholarship found.</>
                ) : (
                  data?.scholarships.slice(0, 2).map((meow) => (
                    <div
                      key={meow.scholarshipId}
                      className="group relative flex flex-col justify-between bg-card rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 gap-6"
                    >
                      {/* Logo + Provider */}
                      <div className="flex items-center gap-3">
                        {meow.logo ? (
                          <img
                            src={meow.logo}
                            alt={meow.title}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                            No Logo
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {meow.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {meow.Scholarship_Provider?.name ||
                              "Unknown Provider"}
                          </p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Deadline:</span>
                          <span className="font-medium text-foreground">
                            {meow.deadline ? format(meow.deadline, "PPP") : "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Required GWA:</span>
                          <span className="font-medium text-foreground">
                            {meow.requiredGWA || "N/A"}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/user/home/scholarships/${meow.scholarshipId}`}
                      >
                        <Button className="w-full">
                          View Details <ArrowRight />
                        </Button>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-base font-medium">Recent Application</h1>
                <Link href={"/user/home/applications"}>
                  <Button size="sm" variant="link">
                    See All <ExternalLink />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1  gap-4">
                {loading ? (
                  [...Array(2)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="bg-background/40 relative rounded-md space-y-3"
                    >
                      <Skeleton className="h-40" />
                    </motion.div>
                  ))
                ) : data?.applications.length === 0 ? (
                  <>No application found.</>
                ) : (
                  data?.scholarships.slice(0, 2).map((meow) => (
                    <div
                      key={meow.scholarshipId}
                      className="group relative flex flex-col justify-between bg-card rounded-md p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 gap-6"
                    >
                      {/* Logo + Provider */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {meow.logo ? (
                            <img
                              src={meow.logo}
                              alt={meow.title}
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                              No Logo
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-sm line-clamp-1">
                              {meow.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {meow.Scholarship_Provider?.name ||
                                "Unknown Provider"}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/user/home/scholarships/${meow.scholarshipId}`}
                        >
                          <Button className="w-full" size="sm">
                            View Documents <ArrowRight />
                          </Button>
                        </Link>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-3 gap-1 text-sm text-muted-foreground">
                        <div className="flex flex-col gap-2 items-center justify-between">
                          <span className="text-xs">Deadline:</span>
                          <span className="font-medium text-foreground text-base">
                            {meow.deadline ? format(meow.deadline, "PPP") : "—"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-between">
                          <span className="text-xs">Required GWA:</span>
                          <span className="font-medium text-foreground text-base">
                            {meow.requiredGWA || "N/A"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-between">
                          <span className="text-xs">Submitted Documents:</span>
                          <span className="font-medium text-foreground text-base">
                            3 / 3
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
