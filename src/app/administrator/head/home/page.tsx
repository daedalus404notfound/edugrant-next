"use client";

import { CheckCheck, GraduationCap, TrendingUp } from "lucide-react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour-2/tour-step";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { ChartBarMultiple } from "./dashboard-ui/bar-chart";
import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";

import { DonutPieDonut } from "./dashboard-ui/donut-chart";
import { ActiveScholarships } from "../../staff/home/dashboard-ui/active-scholarship";
import { RecentApplications } from "./dashboard-ui/recent-application";
import { ChartBarMixed } from "./dashboard-ui/institute";
import usefetchHeadDashboard from "@/hooks/admin/getHeadDashboard";
import { useAdminStore } from "@/store/adminUserStore";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TitleReusable from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useAuthenticatedUser from "@/hooks/head/getTokenAuthentication";

export default function AdminDashboard() {
  const { data, loading } = usefetchHeadDashboard();
  const { data: data2 } = useAuthenticatedUser();
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

  const [openGuide, setOpenGuide] = useState(false);

  useEffect(() => {
    if (data2?.safeData?.webTours?.dashboardTour) {
      // reverse the boolean: false → true, true → false
      setOpenGuide(!data2.safeData.webTours.dashboardTour);
    }
  }, [data2]);

  return (
    <div className=" z-10  lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <Dialog open={openGuide} onOpenChange={setOpenGuide}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable title="Welcome to HEAD EDUGRANT" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenGuide(false)}
            >
              Skip for Now
            </Button>
            <div onClick={() => setOpenGuide(false)} className="flex-1 ">
              <TourTrigger
                tourName="edugrantDashboard"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="lg:py-8 py-4 lg:px-5 px-2 space-y-8">
        <TourStep stepId="summary">
          {" "}
          <div className="grid grid-cols-4  gap-6">
            {summaryCards.map((card, index) => (
              <SummaryCard loading={loading} key={index} {...card} />
            ))}
          </div>
        </TourStep>

        <div className="grid grid-cols-3  gap-6">
          <TourStep stepId="bar">
            <ChartBarMultiple data={data} />
          </TourStep>
          <TourStep stepId="pie">
            <DonutPieDonut data={data} />
          </TourStep>
          <TourStep stepId="bar-horizontal">
            <ChartBarMixed data={data} />
          </TourStep>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <TourStep stepId="ongoing">
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
            )}{" "}
          </TourStep>
          <TourStep stepId="recent">
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
          </TourStep>
        </div>
      </div>
    </div>
  );
}
