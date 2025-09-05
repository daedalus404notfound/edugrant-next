"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  "Scholarship applications vs approvals by year level";

const chartData = [
  { year: "1st Year", applications: 180, approved: 120 },
  { year: "2nd Year", applications: 220, approved: 160 },
  { year: "3rd Year", applications: 150, approved: 110 },
  { year: "4th Year", applications: 100, approved: 75 },
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
    <Card>
      <CardHeader>
        <CardTitle>Scholarship Applications & Approvals</CardTitle>
        <CardDescription>Per year level overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
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
              radius={4}
            />
            <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up in approvals <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing applications vs approved students by year level
        </div>
      </CardFooter>
    </Card>
  );
}
