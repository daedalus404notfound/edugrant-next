"use client";

import { CheckCheck, GraduationCap, TrendingUp } from "lucide-react";

import { ChartBarMultiple } from "./bar-chart";

import { SummaryCard, SummaryCardProps } from "./dashboard/summary";

import { DonutPieDonut } from "./donut-chart";
import { ActiveScholarships } from "./active-scholarship";
import { RecentApplications } from "./recent-application";
import { ChartBarMixed } from "./institute";
import usefetchHeadDashboard from "@/hooks/admin/getHeadDashboard";
import { useAdminStore } from "@/store/adminUserStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;
  const { data, loading } = usefetchHeadDashboard(accountId);

  const summaryCards: SummaryCardProps[] = [
    {
      label: "Total Applicants",
      data: data?.applcationCount || 0,
      icon: <TrendingUp />,
      color: "blue",
      todayIncrement: 100,
    },
    {
      label: "Approved Applicants",
      data: data?.approvedApplcationCount || 0,
      icon: <CheckCheck />,
      color: "green",
      todayIncrement: 50,
    },
    {
      label: "Active Scholarships",
      data: data?.activeScholarshipCount || 0,
      icon: <GraduationCap />,
      color: "yellow",
      todayIncrement: 25,
    },
    {
      label: "Pending Applications",
      data: data?.pendingApplcationCount || 0,
      icon: <GraduationCap />,
      color: "white",
      todayIncrement: 10,
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
          <DonutPieDonut />
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
            <ActiveScholarships data={data} loading={loading} />
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
