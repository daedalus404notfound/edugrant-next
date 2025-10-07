"use client";

import { CheckCheck, GraduationCap, TrendingUp } from "lucide-react";

import { ChartBarMultiple } from "./dashboard-ui/bar-chart";

import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";

import { DonutPieDonut } from "./dashboard-ui/donut-chart";
import { ActiveScholarships } from "./dashboard-ui/active-scholarship";
import { RecentApplications } from "./dashboard-ui/recent-application";
import { ChartBarMixed } from "./dashboard-ui/institute";
import { useAdminStore } from "@/store/adminUserStore";
import { Skeleton } from "@/components/ui/skeleton";
import usefetchStaffDashboard from "@/hooks/getStaffDashboard";

export default function AdminDashboard() {
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;
  const { data, loading } = usefetchStaffDashboard(accountId);

  const summaryCards: SummaryCardProps[] = [
    {
      label: "Total Applicants",
      data: data?.applcationCount || 0,
      icon: <TrendingUp />,
      color: "blue",
      todayIncrement: data?.applicationCountToday,
    },
    {
      label: "Approved Applicants",
      data: data?.approvedApplcationCount || 0,
      icon: <CheckCheck />,
      color: "green",
      todayIncrement: data?.applicationApprovedToday,
    },
    {
      label: "Active Scholarships",
      data: data?.activeScholarshipCount || 0,
      icon: <GraduationCap />,
      color: "yellow",
      todayIncrement: data?.scholarshipCountToday,
    },
    {
      label: "Pending Applications",
      data: data?.pendingApplcationCount || 0,
      icon: <GraduationCap />,
      color: "white",
      todayIncrement: data?.applicationPendingToday,
    },
  ];
  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-8">
        <div className="grid grid-cols-4  gap-6">
          {loading ? (
            <>
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
            </>
          ) : (
            summaryCards.map((card, index) => (
              <SummaryCard key={index} {...card} />
            ))
          )}
        </div>
        <div className="grid grid-cols-3  gap-6">
          <ChartBarMultiple data={data} />
          <DonutPieDonut data={data} />
          <ChartBarMixed data={data} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {loading ? (
            <div className="p-4 border rounded-lg space-y-6">
              <div>
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-6 w-full mt-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="aspect-[16/7] w-full h-full" />
                <Skeleton className="aspect-[16/7] w-full h-full" />
              </div>
            </div>
          ) : (
            <ActiveScholarships data={data?.scholarship} loading={loading} />
          )}
          {loading ? (
            <div className="p-4 border rounded-lg space-y-6">
              <div>
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-6 w-full mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Skeleton className=" w-full h-11" />
                <Skeleton className=" w-full h-11" />
                <Skeleton className=" w-full h-11" />
              </div>
            </div>
          ) : (
            <RecentApplications data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}
