"use client";

import { ChartBarMultiple } from "./dashboard/bar";

import ApplicationSummary from "./dashboard/summary";
import { Button } from "@/components/ui/button";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Bar,
  BarChart,

  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  XAxis,

} from "recharts";
import {
  Card,
 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

import { ChartBarInteractive } from "./dashboard/bar-chart";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
];

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="pl-1 pr-2 min-h-screen z-10">
   

      <div className=" grid grid-cols-3  gap-5 px-5  py-5 mt-3 ">
        <div className="col-span-2 space-y-5">
          <ApplicationSummary />
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline className="divide-y rounded-lg border">
                {announcements.map((item) => (
                  <TimelineItem
                    key={item.id}
                    step={item.id}
                    className="m-0! px-4! py-3!"
                  >
                    <TimelineContent className="text-foreground">
                      {item.description}
                      <TimelineDate className="mt-1">{item.date}</TimelineDate>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
              <CardFooter>
                <Button className="w-full" size="sm" variant="link">
                  See All
                </Button>
              </CardFooter>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-5">
            <ChartBarMultiple />
            <Card className="border-0">
              <CardContent className="flex gap-4">
                <div className="grid items-center gap-y-5">
                  <div className="grid flex-1 auto-rows-min gap-1">
                    <div className="text-sm text-muted-foreground">
                      Approved
                    </div>
                    <div className="flex items-baseline gap-2 text-xl font-bold tabular-nums leading-none font-mono tracking-tight">
                      1000
                      <span className="text-xs font-normal text-muted-foreground">
                        applicants
                      </span>
                    </div>
                  </div>
                  <div className="grid flex-1 auto-rows-min gap-1">
                    <div className="text-sm text-muted-foreground">Pending</div>
                    <div className="flex items-baseline gap-2 text-xl font-bold tabular-nums leading-none font-mono tracking-tight">
                      120
                      <span className="text-xs font-normal text-muted-foreground">
                        applications
                      </span>
                    </div>
                  </div>
                  <div className="grid flex-1 auto-rows-min gap-1">
                    <div className="text-sm text-muted-foreground">
                      Rejected
                    </div>
                    <div className="flex items-baseline gap-2 text-xl font-bold tabular-nums leading-none font-mono tracking-tight">
                      12
                      <span className="text-xs font-normal text-muted-foreground">
                        applicants
                      </span>
                    </div>
                  </div>
                </div>
                <ChartContainer
                  config={{
                    move: {
                      label: "Approved",
                      color: "oklch(0.63 0.17 149)",
                    },
                    exercise: {
                      label: "Pending",
                      color: "var(--chart-3)",
                    },
                    stand: {
                      label: "Reject",
                      color: "oklch(0.58 0.22 27)",
                    },
                  }}
                  className="mx-auto aspect-square w-full max-w-[80%]"
                >
                  <RadialBarChart
                    margin={{
                      left: -10,
                      right: -10,
                      top: -10,
                      bottom: -10,
                    }}
                    data={[
                      {
                        activity: "Approved",
                        value: (8 / 12) * 100,
                        fill: "var(--color-stand)",
                      },
                      {
                        activity: "Pending",
                        value: (46 / 60) * 100,
                        fill: "var(--color-exercise)",
                      },
                      {
                        activity: "Reject",
                        value: (245 / 360) * 100,
                        fill: "var(--color-move)",
                      },
                    ]}
                    innerRadius="20%"
                    barSize={24}
                    startAngle={90}
                    endAngle={450}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      dataKey="value"
                      tick={false}
                    />
                    <RadialBar dataKey="value" background cornerRadius={5} />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="space-y-5">
          <Card className="border-0">
            <CardHeader className="">
              <CardTitle>Active Energy</CardTitle>
              <CardDescription>
                You're burning an average of 754 calories per day. Good job!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none font-mono tracking-tight">
                1,254
                <span className="text-sm font-normal text-muted-foreground">
                  kcal/day
                </span>
              </div>
              <ChartContainer
                config={{
                  calories: {
                    label: "Calories",
                    color: "var(--chart-1)",
                  },
                }}
                className="ml-auto w-[64px]"
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2024-01-01",
                      calories: 354,
                    },
                    {
                      date: "2024-01-02",
                      calories: 514,
                    },
                    {
                      date: "2024-01-03",
                      calories: 345,
                    },
                    {
                      date: "2024-01-04",
                      calories: 734,
                    },
                    {
                      date: "2024-01-05",
                      calories: 645,
                    },
                    {
                      date: "2024-01-06",
                      calories: 456,
                    },
                    {
                      date: "2024-01-07",
                      calories: 345,
                    },
                  ]}
                >
                  <Bar
                    dataKey="calories"
                    fill="var(--color-calories)"
                    radius={2}
                    fillOpacity={0.2}
                    activeIndex={6}
                    activeBar={<Rectangle fillOpacity={0.8} />}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    hide
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <div>
            <Card className="border-0">
              <CardContent className="px-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full aspect-square bg-card font-mono"
                  captionLayout="dropdown"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="col-span-3">
          <ChartBarInteractive />
        </div>
      </div>
    </div>
  );
}
