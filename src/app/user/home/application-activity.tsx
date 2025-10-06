"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "A bar chart showing scholarship application activity";

const chartData = [
  { month: "January", applications: 2 },
  { month: "February", applications: 4 },
  { month: "March", applications: 0 },
  { month: "April", applications: 0 },
  { month: "May", applications: 1 },
  { month: "June", applications: 2 },
];

const chartConfig = {
  applications: {
    label: "Scholarship Applications",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ScholarshipApplicationActivity() {
  return (
    <div className="space-y-3 bg-card p-6 shadow rounded-md">
      <div>
        <h1 className="font-medium">Scholarship Application Activity</h1>
        <p className="text-sm text-muted-foreground">January – June 2024</p>
      </div>
      <div className="bg-card p-4 rounded-md">
        <ChartContainer config={chartConfig} className="h-[230px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="applications"
              fill="var(--color-applications)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      <div className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total scholarship applications for the last 6 months
        </div>
      </div>
    </div>
  );
}
