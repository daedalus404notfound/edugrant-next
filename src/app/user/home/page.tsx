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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
const applications = [
  {
    applicationId: "APP001",
    scholarshipName: "STEM Scholarship",
    status: "Pending",
    applicationDate: "2025-08-10",
  },
  {
    applicationId: "APP002",
    scholarshipName: "Leadership Grant",
    status: "Approved",
    applicationDate: "2025-08-12",
  },
];
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

          <Card>
            <CardHeader>
              <CardTitle>Recent Application</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Application ID</TableHead>
                    <TableHead>Scholarship</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Date Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.applicationId}>
                      <TableCell className="font-medium">
                        {app.applicationId}
                      </TableCell>
                      <TableCell>{app.scholarshipName}</TableCell>
                      <TableCell>{app.status}</TableCell>
                      <TableCell className="text-right">
                        {app.applicationDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator />
              <CardFooter>
                <Button className="w-full" size="sm" variant="link">
                  See All 
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-5">
          <Card className="border-0">
            <CardHeader className="">
              <CardTitle>Most Applied Scholarship</CardTitle>
              <CardDescription>
                Tita Lorna Scholarship currently has the highest number of
                applicants.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
              <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none font-mono tracking-tight">
                1,254
                <span className="text-sm font-normal text-muted-foreground">
                  total
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
      </div>
    </div>
  );
}
