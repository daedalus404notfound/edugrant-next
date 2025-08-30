"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChevronDown } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description =
  "Scholarship Applications vs Approved per scholar - 7 day view";

// Types for scholarship data
type ScholarshipDataPoint = {
  date: string;
  applications: number;
  approved: number;
};

type ScholarshipData = {
  [key: string]: ScholarshipDataPoint[];
};

// Sample data for different scholarships
const scholarshipData: ScholarshipData = {
  "Academic Excellence Scholarship": [
    { date: "2024-07-18", applications: 15, approved: 4 },
    { date: "2024-07-19", applications: 12, approved: 5 },
    { date: "2024-07-20", applications: 18, approved: 6 },
    { date: "2024-07-21", applications: 22, approved: 8 },
    { date: "2024-07-22", applications: 19, approved: 7 },
    { date: "2024-07-23", applications: 16, approved: 6 },
    { date: "2024-07-24", applications: 21, approved: 9 },
  ],
  "Need-Based Financial Aid": [
    { date: "2024-07-18", applications: 8, approved: 2 },
    { date: "2024-07-19", applications: 11, approved: 4 },
    { date: "2024-07-20", applications: 14, approved: 5 },
    { date: "2024-07-21", applications: 16, approved: 6 },
    { date: "2024-07-22", applications: 13, approved: 5 },
    { date: "2024-07-23", applications: 10, approved: 4 },
    { date: "2024-07-24", applications: 15, approved: 7 },
  ],
  "STEM Research Grant": [
    { date: "2024-07-18", applications: 6, approved: 1 },
    { date: "2024-07-19", applications: 9, approved: 3 },
    { date: "2024-07-20", applications: 7, approved: 2 },
    { date: "2024-07-21", applications: 12, approved: 4 },
    { date: "2024-07-22", applications: 10, approved: 3 },
    { date: "2024-07-23", applications: 8, approved: 2 },
    { date: "2024-07-24", applications: 11, approved: 5 },
  ],
  "Community Service Award": [
    { date: "2024-07-18", applications: 5, approved: 2 },
    { date: "2024-07-19", applications: 7, approved: 3 },
    { date: "2024-07-20", applications: 9, approved: 4 },
    { date: "2024-07-21", applications: 11, approved: 5 },
    { date: "2024-07-22", applications: 8, approved: 3 },
    { date: "2024-07-23", applications: 6, approved: 2 },
    { date: "2024-07-24", applications: 10, approved: 4 },
  ],
  "International Student Grant": [
    { date: "2024-07-18", applications: 12, approved: 3 },
    { date: "2024-07-19", applications: 15, approved: 4 },
    { date: "2024-07-20", applications: 18, approved: 6 },
    { date: "2024-07-21", applications: 20, approved: 7 },
    { date: "2024-07-22", applications: 14, approved: 5 },
    { date: "2024-07-23", applications: 11, approved: 4 },
    { date: "2024-07-24", applications: 16, approved: 6 },
  ],
};

const chartConfig = {
  scholarships: {
    label: "Scholarships",
  },
  applications: {
    label: "Applications",
    color: "var(--chart-1)",
  },
  approved: {
    label: "Approved",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ChartAreaInteractive() {
  const [selectedScholarship, setSelectedScholarship] = React.useState(
    "Academic Excellence Scholarship"
  );
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const scholarshipNames = Object.keys(scholarshipData);
  const chartData = scholarshipData[selectedScholarship];

  // Calculate totals and approval rate
  const totalApplications = chartData.reduce(
    (sum, item) => sum + item.applications,
    0
  );
  const totalApproved = chartData.reduce((sum, item) => sum + item.approved, 0);
  const approvalRate =
    totalApplications > 0
      ? ((totalApproved / totalApplications) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Button className="p-0" variant="ghost">
            Scholarship Applications vs Approved - Last 7 Days
          </Button>
        </div>

        {/* Scholarship Select */}
        <Select
          value={selectedScholarship}
          onValueChange={setSelectedScholarship}
        >
          <SelectTrigger className="!bg-background">
            <SelectValue placeholder="Select scholarship" />
          </SelectTrigger>
          <SelectContent>
            {scholarshipNames.map((scholarship) => (
              <SelectItem key={scholarship} value={scholarship}>
                {scholarship}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-background border rounded-lg p-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-applications)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-applications)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillApproved" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-approved)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-approved)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.4}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                  formatter={(value, name) => [
                    value,
                    name === "applications" ? "Applications" : "Approved",
                  ]}
                />
              }
            />
            <Area
              dataKey="applications"
              type="monotone"
              fill="url(#fillApplications)"
              stroke="var(--color-applications)"
              strokeWidth={2}
            />
            <Area
              dataKey="approved"
              type="monotone"
              fill="url(#fillApproved)"
              stroke="var(--color-approved)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background border rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {totalApplications}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Applications
          </div>
        </div>
        <div className="bg-background border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {totalApproved}
          </div>
          <div className="text-sm text-muted-foreground">
            Approved Applications
          </div>
        </div>
        <div className="bg-background border rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {approvalRate}%
          </div>
          <div className="text-sm text-muted-foreground">Approval Rate</div>
        </div>
      </div>
    </div>
  );
}
