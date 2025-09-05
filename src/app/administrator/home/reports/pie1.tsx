"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { semester: "1st Sem 2022", newApplications: 420, renewals: 300 },
  { semester: "2nd Sem 2022", newApplications: 390, renewals: 280 },
  { semester: "1st Sem 2023", newApplications: 460, renewals: 340 },
  { semester: "2nd Sem 2023", newApplications: 410, renewals: 310 },
  { semester: "1st Sem 2024", newApplications: 480, renewals: 350 },
  { semester: "2nd Sem 2024", newApplications: 450, renewals: 330 },
];

const chartConfig = {
  newApplications: {
    label: "New Applications",
    color: "var(--chart-1)",
  },
  renewals: {
    label: "Renewals",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            New Applications vs Renewals (per Semester)
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillNew" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-newApplications)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-newApplications)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRenewals" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-renewals)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-renewals)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="semester"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="newApplications"
              type="natural"
              fill="url(#fillNew)"
              stroke="var(--color-newApplications)"
              stackId="a"
            />
            <Area
              dataKey="renewals"
              type="natural"
              fill="url(#fillRenewals)"
              stroke="var(--color-renewals)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
