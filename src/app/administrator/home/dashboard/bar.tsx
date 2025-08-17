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
import {
  Card,
  CardAction,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { CircleQuestionMark } from "lucide-react";

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
    page: 1,
    pageSize: 100,
    active: true,
  });
  return (
    <Card className="aspect-[14.6/9] border-0">
      <CardHeader>
        <CardTitle>Scholarship Status</CardTitle>

        <CardAction>
          <CircleQuestionMark size={15} />
        </CardAction>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
