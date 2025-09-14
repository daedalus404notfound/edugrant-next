"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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

export const description = "A pie chart with gender (Male & Female)";

const chartData = [
  { gender: "Male", count: 320, fill: "#3b82f6" }, // Blue
  { gender: "Female", count: 280, fill: "#ec4899" }, // Pink
];

const chartConfig = {
  count: {
    label: "Count",
  },
  Male: {
    label: "Male",
    color: "#3b82f6",
  },
  Female: {
    label: "Female",
    color: "#ec4899",
  },
} satisfies ChartConfig;

export function ChartPieLabel() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Scholarship Applicants by Gender</CardTitle>
        <CardDescription>Male vs Female</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="gender" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing gender statistics
        </div>
      </CardFooter>
    </Card>
  );
}
