"use client";
import ChartPieDonutText from "./dashboard/pie";
import { ChartBarMultiple } from "./dashboard/bar";


import ApplicationSummary from "./dashboard/summary";
import { Button } from "@/components/ui/button";
import {  CircleQuestionMark } from "lucide-react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";
import DynamicHeaderAdmin from "./dynamic-header";
import { ChartAreaInteractive } from "./dashboard/area-chart";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
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
  // const [date, setDate] = useState("");
  // useEffect(() => {
  //   const updateDate = () => {
  //     const now = new Date();
  //     const day = now.getDate();
  //     const suffix =
  //       day >= 11 && day <= 13
  //         ? "th"
  //         : day % 10 === 1
  //         ? "st"
  //         : day % 10 === 2
  //         ? "nd"
  //         : day % 10 === 3
  //         ? "rd"
  //         : "th";

  //     const formatted = now
  //       .toLocaleDateString("en-US", {
  //         weekday: "long",
  //         year: "numeric",
  //         month: "long",
  //         day: "numeric",
  //       })
  //       .replace(/\b\d{1,2}\b/, `${day}${suffix}`);

  //     setDate(formatted);
  //   };

  //   updateDate();
  //   const interval = setInterval(updateDate, 1000);
  //   return () => clearInterval(interval);
  // }, []);
 const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="pl-1 pr-2 min-h-screen z-10">
      <DynamicHeaderAdmin first="Home" />

      <div className=" grid grid-cols-3  gap-5 px-5  py-5 mt-3 ">
        <div className="col-span-2 grid gap-7">
          <ApplicationSummary />

          <ChartAreaInteractive />
          <div className="grid grid-cols-2 gap-5">
            <div className="aspect-[14.6/9] relative border  bg-background/40  p-4 rounded-md space-y-1.5">
              <div className="flex justify-between items-center">
                <h1>Scholarship Status</h1>

                

                <div className="opacity-40">
                  <CircleQuestionMark size={16} />
                </div>
              </div>
              <ChartBarMultiple />
            </div>
            <div className="aspect-[14.6/9] relative  border  bg-background/40  p-4 rounded-md space-y-1.5">
              <div className="flex justify-between items-center">
                <h1>Scholarship Status</h1>

                <div className="opacity-40">
                  <CircleQuestionMark size={16} />
                </div>
              </div>
              <ChartPieDonutText />
            </div>
          </div>
        </div>
        <div className="row-span-2 z-10 space-y-3">
          <div className=" space-y-2 p-4 bg-background/40 rounded-md border">
            <h1>Announcements</h1>

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
            <Button className="w-full" size="sm" variant="link">See All</Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-sm w-full aspect-square bg-background/40 pt-3"
            captionLayout="dropdown"
          />
        </div>
      </div>
    </div>
  );
}
