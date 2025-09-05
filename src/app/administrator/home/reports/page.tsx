import { CheckCheck, GraduationCap, TrendingUp } from "lucide-react";
import { SummaryCard, SummaryCardProps } from "../dashboard/summary";

export default function Reports() {
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
  return (
    <div className="w-[95%] mx-auto p-4 grid grid-cols-2 gap-3">
      <div className="col-span-2 grid lg:grid-cols-4 grid-cols-1 lg:gap-3 gap-2">
        {summaryCards.map((card, index) => (
          <SummaryCard key={index} {...card} />
        ))}
      </div>
      <div>1</div>
      <div>1</div>
    </div>
  );
}
