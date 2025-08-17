
import {

  CheckCheck,

  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { JSX, useState } from "react";

// Define types
type ColorKey = "blue" | "green" | "yellow" | "white";

interface SummaryCard {
  label: string;
  data: number;
  icon: JSX.Element;
  color: ColorKey;
}

export default function ApplicationSummary() {
  const [loading] = useState(false);

  // Define color mappings with proper typing
  const colorStyles: Record<ColorKey, { badge: string; text: string }> = {
    blue: {
      badge: "bg-blue-800/10 text-blue-600",
      text: "text-blue-600",
    },
    green: {
      badge: "bg-green-800/10 text-green-600",
      text: "text-green-600",
    },
    yellow: {
      badge: "bg-yellow-800/10 text-yellow-600",
      text: "text-yellow-600",
    },
    white: {
      badge: "bg-gray-800/10 text-gray-600",
      text: "text-gray-600",
    },
  };

  const summaryCards: SummaryCard[] = [
    {
      label: " Total Applicants",
      data: 1,
      icon: <TrendingUp />,
      color: "blue",
    },
    {
      label: " Approved Applicants",
      data: 2,
      icon: <CheckCheck />,
      color: "green",
    },
    {
      label: "Active Scholarships",
      data: 3,
      icon: <GraduationCap />,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-3  gap-5 ">
      {summaryCards.map((meow, index) => (
        <div
          key={index}
          className=" bg-sidebar z-10 flex flex-col justify-between  rounded-lg  shadow-sm  aspect-[16/4] p-4"
        >
          <div className="flex justify-between items-start ">
            <span className={` p-2 rounded-md ${colorStyles[meow.color].text}`}>
              {meow.icon}
            </span>
            <p
              className={`flex text-xs  p-1 rounded-sm font-mono tracking-tight ${
                colorStyles[meow.color].badge
              }`}
            >
              + 100 today
            </p>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-sm text-muted-foreground">{meow.label}</p>
            <span className={`text-3xl font-semibold font-mono `}>
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
