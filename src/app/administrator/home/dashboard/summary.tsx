import { JSX, useState } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { Button } from "@/components/ui/button";

// Define types
type ColorKey = "blue" | "green" | "yellow" | "white";

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
    <div className="bg-card z-10 flex flex-col justify-between rounded-lg aspect-[16/4] lg:p-4 p-4 lg:gap-3 border border-input">
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
        <p className="lg:text-sm text-xs text-muted-foreground">{label}</p>
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
