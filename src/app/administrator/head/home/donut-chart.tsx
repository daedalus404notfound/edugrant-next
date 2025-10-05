"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

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
  "Scholarship data - PWD vs Indigenous vs General Applicants";

const chartData = [
  { group: "Persons with Disability", applicants: 120, fill: "var(--chart-1)" },
  { group: "Indigenous People", applicants: 95, fill: "var(--chart-2)" },
  { group: "General Applicants", applicants: 300, fill: "var(--chart-3)" },
];

const chartConfig = {
  applicants: {
    label: "Applicants",
  },
  pwd: {
    label: "Persons with Disability",
    color: "var(--chart-1)",
  },
  indigenous: {
    label: "Indigenous People",
    color: "var(--chart-2)",
  },
  general: {
    label: "General Applicants",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function DonutPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>Scholarship Applicants</CardTitle>
        <CardDescription>By Group (PWD, Indigenous, General)</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="applicants"
                nameKey="group"
                innerRadius="40%"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="flex items-center justify-center gap-2 leading-none font-medium">
          Most applicants are General Applicants{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Distribution of scholarship applications by applicant group
        </div>
      </CardFooter>
    </Card>
  );
}
