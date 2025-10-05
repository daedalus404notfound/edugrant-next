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
import { ChartBarMultiple } from "./bar-chart";
import ChartAreaInteractive from "./dashboard/area-chart";
import { SummaryCard, SummaryCardProps } from "./dashboard/summary";
import { useAdminStore } from "@/store/adminUserStore";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import { UpcomingDeadlines } from "./upcoming-deadline";
import { DonutPieDonut } from "./donut-chart";
import { ActiveScholarships } from "./active-scholarship";
import { RecentApplications } from "./recent-application";
import { ChartBarMixed } from "./institute";
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

  // const { data, loading } = useScholarshipData({
  //   page: 1,
  //   pageSize: 10,
  //   status: "ACTIVE",
  //   accountId: admin?.accountId,
  // });

  // mockData.ts
  const mockScholarships = [
    {
      scholarshipId: 1,
      title: "Academic Excellence Scholarship",
      Scholarship_Provider: { name: "Global Education Fund" },
      type: "Merit-based",
      status: "ACTIVE",
    },
    {
      scholarshipId: 2,
      title: "Community Service Award",
      Scholarship_Provider: { name: "National Volunteer Association" },
      type: "Service-based",
      status: "ACTIVE",
    },
    {
      scholarshipId: 3,
      title: "STEM Innovators Grant",
      Scholarship_Provider: { name: "Tech Future Foundation" },
      type: "Research-based",
      status: "ACTIVE",
    },
    {
      scholarshipId: 4,
      title: "Arts & Culture Scholarship",
      Scholarship_Provider: { name: "Creative Minds Org" },
      type: "Merit-based",
      status: "ACTIVE",
    },
    {
      scholarshipId: 5,
      title: "Leadership Development Program",
      Scholarship_Provider: { name: "Youth Leaders Initiative" },
      type: "Leadership-based",
      status: "ACTIVE",
    },
  ];
  const sliced = mockScholarships.slice(0, 4);
  // Example usage in your component
  // const sliced = mockScholarships;

  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-8">
        <div className="grid grid-cols-4  gap-6">
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} {...card} />
          ))}
        </div>
        <div className="grid grid-cols-3  gap-6">
          <ChartBarMultiple />
          <DonutPieDonut />
          <ChartBarMixed />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ActiveScholarships />
          <RecentApplications />
        </div>
      </div>
    </div>
  );
}

// <Timeline className="space-y-5">
//   {dataAnnouncement.slice(0, 2).map((item, index) => (
//     <TimelineItem
//       key={item.announcementId}
//       step={index}
//       className="!m-0  bg-card  p-4! rounded-md border !mb-3"
//     >
//       <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
//         <TimelineTitle className="font-medium text-base">
//           {item.title ?? "Win scholarship is now open."}
//         </TimelineTitle>
//         <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
//           <CalendarIcon size={13} />{" "}
//           {item.startDate && format(item.startDate, "PPP p")}
//         </TimelineDate>
//       </div>

//       <TimelineContent className="line-clamp-2 whitespace-pre-wrap">
//         {item.description}
//       </TimelineContent>

//       <div className="mt-5 flex gap-3 items-center">
//         <p className="text-xs">Tags:</p>{" "}
//         <Badge variant="secondary">Win Gatchalian</Badge>
//       </div>
//     </TimelineItem>
//   ))}
// </Timeline>;

//  <div className="  space-y-5 ">
//    <div className="">
//      <div className="flex justify-between lg:flex-row flex-col gap-5 ">
//        <div className="lg:space-y-2 ">
//          <h1 className="lg:text-2xl text-lg font-medium">
//            Hello, {admin?.ISPSU_Head?.fName ?? "Admin"}{" "}
//            {admin?.ISPSU_Head?.lName ?? ""}!
//          </h1>
//          <p className="text-sm text-muted-foreground font-mono">
//            {isClient ? format(now, "PPP p") : "Loading..."}
//          </p>
//        </div>
//      </div>
//    </div>
//    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-3 gap-2">
//      {summaryCards.map((card, index) => (
//        <SummaryCard key={index} {...card} />
//      ))}
//    </div>

//    <ChartAreaInteractive />
//  </div>;
