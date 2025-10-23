import { JSX } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { Button } from "@/components/ui/button";

// Extend color keys
type ColorKey =
  | "blue"
  | "green"
  | "yellow"
  | "white"
  | "red"
  | "purple"
  | "pink"
  | "orange"
  | "teal"
  | "indigo";

export interface SummaryCardProps {
  label: string;
  data: number;
  icon: JSX.Element;
  color: ColorKey;
  todayIncrement?: number;
  loading?: boolean;
}

// Color mapping
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
  red: {
    badge: "bg-red-800/10 text-red-600",
    text: "text-red-600",
  },
  purple: {
    badge: "bg-purple-800/10 text-purple-600",
    text: "text-purple-600",
  },
  pink: {
    badge: "bg-pink-800/10 text-pink-600",
    text: "text-pink-600",
  },
  orange: {
    badge: "bg-orange-800/10 text-orange-600",
    text: "text-orange-600",
  },
  teal: {
    badge: "bg-teal-800/10 text-teal-600",
    text: "text-teal-600",
  },
  indigo: {
    badge: "bg-indigo-800/10 text-indigo-600",
    text: "text-indigo-600",
  },
};

// ✅ Reusable Card Component
export function SummaryCard({
  label,
  data,
  icon,
  color,
  todayIncrement = 0,
  loading,
}: SummaryCardProps) {
  return (
    <div className="dark:border bg-background rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className=" bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30 shadow z-10 flex flex-col justify-between rounded-lg  lg:p-6 p-4 lg:gap-2 ">
        <p className=" text-xs line-clamp-1 jakarta lg:hidden block mb-2">
          {label}
        </p>
        <div className="flex justify-between items-start">
          <Button
            variant="secondary"
            className={`shadow hidden lg:block ${colorStyles[color].text}`}
          >
            {icon}
          </Button>

          <span className={`lg:hidden ${colorStyles[color].text}`}>{icon}</span>

          <span className="lg:hidden block">
            {loading ? (
              <Ring
                size={25}
                stroke={3}
                speed={2}
                bgOpacity={0}
                color="green"
              />
            ) : (
              <span className="text-2xl font-semibold font-mono"> {data} </span>
            )}
          </span>

          <p
            className={` text-xs p-1 rounded-sm font-mono tracking-tight lg:flex hidden ${colorStyles[color].badge}`}
          >
            + {todayIncrement} today
          </p>
        </div>

        <div className="justify-between items-end gap-3 hidden lg:flex">
          <p className="lg:text-sm text-xs line-clamp-1 jakarta">{label}</p>

          {loading ? (
            <Ring size={35} stroke={6} speed={2} bgOpacity={0} color="green" />
          ) : (
            <span className="text-3xl font-semibold font-mono"> {data} </span>
          )}
        </div>
      </div>
    </div>
  );
}

//  <div className="dark:border bg-background rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//    <div className=" bg-gradient-to-br dark:to-card to-card/50 dark:from-card/50 from-card/30 shadow z-10 flex flex-col justify-between rounded-lg  lg:p-6 p-4 lg:gap-2 ">
//      {" "}
//      <p className="lg:text-sm text-xs line-clamp-1 jakarta mb-2">{label}</p>
//      <div className="flex justify-between items-start">
//        {icon}

//        <p
//          className={` text-xs p-1 rounded-sm font-mono tracking-tight lg:flex hidden ${colorStyles[color].badge}`}
//        >
//          + {todayIncrement} today
//        </p>
//        <span className="lg:hidden">
//          {loading ? (
//            <Ring size={25} stroke={3} speed={2} bgOpacity={0} color="green" />
//          ) : (
//            <span className="text-3xl font-semibold font-mono"> {data} </span>
//          )}
//        </span>
//      </div>
//      <div className=" justify-between items-end gap-3 hidden lg:flex">
//        <p className="lg:text-sm text-xs line-clamp-1 jakarta">{label}</p>

//        {loading ? (
//          <span>
//            <Ring size={35} stroke={6} speed={2} bgOpacity={0} color="green" />
//          </span>
//        ) : (
//          <span className="text-3xl font-semibold font-mono"> </span>
//        )}
//      </div>
//    </div>
//  </div>;
