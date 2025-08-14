"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useScholarshipData from "@/hooks/admin/getScholarship";

export const description = "A multiple bar chart";

const chartConfig = {
  applicationsReceived: {
    label: "Received Application",
    color: "oklch(0.68 0.14 76)",
  },
  applicationsApproved: {
    label: "Approved Application",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  const { data } = useScholarshipData({
    currentPage: 1,
    rowsPerPage: 100,
    sort: "",
    active: true,
  });
  return (
    <div className=" h-full w-full  border p-2  rounded-lg ">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={
            data?.map((item) => ({
              name: item.scholarshipTitle,
              applicationsReceived: item.totalApplicants,
              applicationsApproved: item.totalApproved,
            })) ?? []
          }
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="applicationsReceived"
            fill="oklch(0.68 0.14 76)"
            radius={4}
          />
          <Bar
            dataKey="applicationsApproved"
            fill="var(--chart-2)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
