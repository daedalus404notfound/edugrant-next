"use client";
// import { TourProvider } from "@/components/tour/tour-provider";
// import { TourStep } from "@/components/tour/tour-step";
// import { TourTrigger } from "@/components/tour/tour-trigger";
// import type { TourStep as TourStepType } from "@/lib/use-tour";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  CheckCheck,
  GraduationCap,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";
import { useUserStore } from "@/store/useUserStore";
import usefetchUserDashboard from "@/hooks/user/getUserDashboard";
import WelcomeCard from "./dashboard-components/welcome-card";
import Announcements from "./dashboard-components/announcement";
import OngoingScholarshipDashboard from "./dashboard-components/ongoing-scholarship";
import RecentApplicationDashboard from "./dashboard-components/recent-application";
import CompleteChecker from "./dashboard-components/complete-check";
import { ProfileCompletion } from "./dashboard-components/profile-progress-2";
import { ApplicationStats } from "./dashboard-components/stats";
import { SummaryCardUser } from "@/components/ui/summary-user";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: user, loading: isLoading } = useAuthenticatedUser();
  const accountId = user?.userData?.accountId;
  const schoolId = user?.userData?.schoolId;
  const { completed } = getFamilyBackgroundProgress(user?.userData?.Student);

  const { data, loading } = usefetchUserDashboard(accountId, schoolId);
  const summaryCards: SummaryCardProps[] = [
    {
      label: "Total Application",
      data: user?.userData?.Student.Application
        ? user?.userData?.Student.Application.length
        : 0,
      icon: <TrendingUp />,
      color: "blue",
      todayIncrement: 0,
    },
    {
      label: "Approved Application",
      data: user?.userData?.Student.Application
        ? user?.userData?.Student.Application.filter(
            (meow) => meow.status === "APPROVED"
          ).length
        : 0,
      icon: <CheckCheck />,
      color: "green",
      todayIncrement: 0,
    },
    {
      label: "For Interview",
      data: user?.userData?.Student.Application
        ? user?.userData?.Student.Application.filter(
            (meow) => meow.status === "INTERVIEW"
          ).length
        : 0,
      icon: <MessageSquare />,
      color: "red",
      todayIncrement: 0,
    },
  ];
  const loadingState = loading || isLoading;
  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="py-6 lg:px-5 px-2 space-y-12">
        {!loadingState && !completed && <CompleteChecker />}
        <div className="lg:grid grid-cols-3 flex flex-col gap-8">
          <div className="col-span-2">
            <WelcomeCard loading={loadingState} />
          </div>

          <ProfileCompletion loading={loadingState} />
        </div>
        <div className="lg:grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-12">
            <div className="lg:grid grid-cols-3 lg:gap-5 gap-3 flex flex-col">
              {summaryCards.map((card, index) => (
                <SummaryCardUser key={index} {...card} loading={loadingState} />
              ))}
            </div>
            <RecentApplicationDashboard
              application={data?.recentApplications ?? []}
              loading={loadingState}
            />
            <Announcements
              announcement={data?.announcements ?? []}
              loading={loading}
            />
          </div>
          <div className="space-y-8">
            <OngoingScholarshipDashboard
              scholarship={data?.onGoingScholarships ?? []}
              loading={loadingState}
            />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md p-6 shadow-sm w-full bg-gradient-to-br to-card from-card/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div className="grid grid-cols-3 w-full">
//           <div className="cols-pan-2">
//
//             <RecentApplicationDashboard
//               application={data?.recentApplications ?? []}
//               loading={loadingState}
//             />
//           </div>
//           <div>
//
//             <OngoingScholarshipDashboard
//               scholarship={data?.onGoingScholarships ?? []}
//               loading={loadingState}
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3">
//           <div className="col-span-2 p-4 space-y-15">
//
//             <WelcomeCard
//               pending={data?.pendingApplicationCount ?? 0}
//               application={data?.totalApplicationsCount ?? 0}
//               loading={loadingState}
//             />
//             <div className="grid grid-cols-3 gap-6">
//               {summaryCards.map((card, index) => (
//                 <SummaryCard key={index} {...card} loading={loadingState} />
//               ))}
//             </div>
//             <Announcements
//               announcement={data?.announcements ?? []}
//               loading={loadingState}
//             />
//           </div>
//           <div className="p-4 space-y-15">
//
//             <ProfileCompletion loading={loadingState} />
//             <div>
//               <h1>Keep on track</h1>
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 className="rounded-md p-6 shadow-sm w-full bg-gradient-to-br to-card from-card/50"
//               />
//             </div>
//           </div>
//         </div>
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
