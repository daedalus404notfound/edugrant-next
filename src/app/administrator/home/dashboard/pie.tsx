"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import useScholarshipData from "@/hooks/admin/getScholarship";

export const description = "A donut chart with text";

const chartData = [
  { status: "Approved", value: 300, fill: "oklch(0.53 0.14 150)" },
  { status: "Pending", value: 150, fill: "oklch(0.68 0.14 76)" },
  { status: "Rejected", value: 50, fill: "oklch(0.51 0.19 28)" },
];

const chartConfig = {
  value: {
    label: "Applications",
  },
  Approved: {
    label: "Approved",
    color: "oklch(0.53 0.14 150)",
  },
  Pending: {
    label: "Pending",
    color: "oklch(0.68 0.14 76)",
  },
  Rejected: {
    label: "Rejected",
    color: "oklch(0.51 0.19 28)",
  },
} satisfies ChartConfig;

export default function ChartPieDonutText() {
  const { data } = useScholarshipData({
    page: 1,
    pageSize: 100,

    active: true,
  });
  const filterApproved = data.filter((meow) => meow.totalApproved);
  console.log(filterApproved);
  return (
    <div className=" h-full w-full  border p-2 rounded-lg">
      <ChartContainer config={chartConfig}>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="status"
            innerRadius={45}
            strokeWidth={5}
            activeIndex={0}
            // activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            //   <Sector {...props} outerRadius={outerRadius + 10} />
            // )}
          >
            <Label
              content={({ viewBox }) => {
                const approved = chartData.find(
                  (item) => item.status === "Approved"
                );
                const total = chartData.reduce(
                  (acc, curr) => acc + curr.value,
                  0
                );
                const approvedPercent = approved
                  ? ((approved.value / total) * 100).toFixed(1)
                  : "0";

                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {approvedPercent}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground text-xs"
                      >
                        Approved
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="status" />}
            className=" flex-wrap gap-4 "
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
