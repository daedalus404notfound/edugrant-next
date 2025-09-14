"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
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

export const description = "Scholarship applications by course";

const chartData = [
  { course: "BSIT", students: 100 },
  { course: "BSFT", students: 200 },
  { course: "BSCS", students: 250 },
  { course: "BSGE", students: 180 },
  { course: "BSABEN", students: 120 },
];

const chartConfig = {
  students: {
    label: "Students",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function ChartBarLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scholarship Applications</CardTitle>
        <CardDescription>Per course overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="course"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="students" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="students"
              layout="vertical"
              fill="var(--color-students)"
              radius={4}
            >
              
              <LabelList
                dataKey="students"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this term <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total scholarship applications by course
        </div>
      </CardFooter>
    </Card>
  );
}
