import { Calendar, GraduationCap, TrendingUp } from "lucide-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { JSX, useState } from "react";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { Button } from "@/components/ui/button";

// Define types
type ColorKey = "blue" | "green" | "yellow" | "white";

interface SummaryCard {
  label: string;
  data: string;
  icon: JSX.Element;
  color: ColorKey;
}

type Meow = {
  data: scholarshipFormData;
};

export default function ScholarshipCards({ data }: Meow) {
  const [loading] = useState(false);
  console.log(data);
  const summaryCards: SummaryCard[] = [
    {
      label: "Scholarship Amount",
      data: "3000",
      icon: <TrendingUp />,
      color: "blue",
    },
    {
      label: "Required GWA",
      data: " 3.00",
      icon: <GraduationCap />,
      color: "yellow",
    },
    {
      label: "Deadline",
      data: "Jan 18",
      icon: <Calendar />,
      color: "green",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1  gap-4 ">
      {summaryCards.map((meow, index) => (
        <div
          key={index}
          className=" bg-card z-10 flex flex-col justify-between  rounded-lg  shadow-sm   p-4 border"
        >
          <div className="flex justify-between items-start ">
            <Button variant="secondary">{meow.icon}</Button>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-xs font-medium text-muted-foreground uppercase">
              {meow.label}
            </p>
            <span className={`text-2xl font-medium font-mono `}>
              {loading ? (
                <Ring
                  size={25}
                  stroke={4}
                  speed={2}
                  bgOpacity={0}
                  color="green"
                />
              ) : (
                meow.data
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
