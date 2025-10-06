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
  loading = false,
}: SummaryCardProps) {
  return (
    <div className=" bg-card shadow z-10 flex flex-col justify-between rounded-lg  p-6 lg:gap-2 ">
      <div className="flex justify-between items-start">
        <Button variant="secondary" className={colorStyles[color].text}>
          {icon}
        </Button>

        <p
          className={`flex text-xs p-1 rounded-sm font-mono tracking-tight ${colorStyles[color].badge}`}
        >
          + {todayIncrement} today
        </p>
      </div>

      <div className="flex justify-between items-end">
        <p className="lg:text-sm text-xs line-clamp-1">{label}</p>
        <span className="text-3xl font-semibold font-mono">
          {loading ? (
            <Ring size={25} stroke={4} speed={2} bgOpacity={0} color="green" />
          ) : (
            data
          )}
        </span>
      </div>
    </div>
  );
}
