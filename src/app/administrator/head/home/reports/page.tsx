import { CheckCheck, GraduationCap, Percent, TrendingUp } from "lucide-react";
import { SummaryCard, SummaryCardProps } from "@/components/ui/summary";
import { ChartBarMultiple } from "./year";
import { ChartAreaInteractive } from "./pie1";
import { ChartBarLabelCustom } from "./courses";
import { ChartPieGovPrivate } from "./scholarshiptype";
import { ChartPieLabel } from "./gender";

export default function Reports() {
  const summaryCards: SummaryCardProps[] = [
    {
      label: "Total Applications",
      data: 1,
      icon: <TrendingUp />,
      color: "blue",
      todayIncrement: 100,
    },
    {
      label: "Total Approved",
      data: 2,
      icon: <CheckCheck />,
      color: "green",
      todayIncrement: 50,
    },
    {
      label: "Pending",
      data: 3,
      icon: <GraduationCap />,
      color: "yellow",
      todayIncrement: 25,
    },
    {
      label: "Approval Rate",
      data: 4,
      icon: <Percent />,
      color: "red",
      todayIncrement: 10,
    },
  ];
  return (
    <div className="w-[95%] mx-auto p-4 grid grid-cols-2 gap-x-5 gap-y-8">
      <div className="col-span-2 grid lg:grid-cols-4 grid-cols-1 lg:gap-5 gap-2">
        {summaryCards.map((card, index) => (
          <SummaryCard key={index} {...card} />
        ))}
      </div>
      <div className="grid grid-cols-3 col-span-2 gap-5">
        <div className="col-span-2 space-y-5">
          <ChartAreaInteractive />
          <div className="grid grid-cols-2 gap-5">
            <ChartBarLabelCustom />
            <ChartPieLabel />
          </div>
        </div>
        <div className="space-y-5">
          <ChartPieGovPrivate />
          <ChartBarMultiple />
        </div>
      </div>
    </div>
  );
}
