"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

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
  "Scholarship applications vs approvals by scholarship name";

const chartData = [
  { scholarship: "EduGrant", applications: 320, approved: 210 },
  { scholarship: "Bright Future", applications: 250, approved: 180 },
  { scholarship: "STEM Scholars", applications: 280, approved: 200 },
  { scholarship: "Arts Excellence", applications: 150, approved: 95 },
  { scholarship: "Global Leaders", applications: 300, approved: 220 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "var(--chart-1)",
  },
  approved: {
    label: "Approved",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>Scholarship - Applications vs Approved</CardTitle>
        <CardDescription>By Scholarship Name</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="scholarship"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="applications"
                fill="var(--color-applications)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="approved"
                fill="var(--color-approved)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="flex items-center justify-center gap-2 font-medium leading-none">
          Highest approvals: EduGrant Scholarship{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Data represents total applications vs approvals per scholarship
        </div>
      </CardFooter>
    </Card>
  );
}
