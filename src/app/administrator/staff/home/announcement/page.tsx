"use client"

import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import TitleReusable from "@/components/ui/title";
import { CalendarIcon, Megaphone } from "lucide-react";
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
export default function Announcements() {
  return (
    <div className="w-full">
      <TitleReusable
        title="Announcements"
        description="Browse the latest announcements and updates."
      />

      <div className="py-8">
        <Timeline className="space-y-5">
          {announcements.map((item) => (
            <TimelineItem
              key={item.id}
              step={item.id}
              className="!m-0  bg-background/70  p-6! rounded-md border !mb-3"
            >
              <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                <TimelineTitle className="font-medium text-lg">
                  {item.title ?? "Win scholarship is now open."}
                </TimelineTitle>
                <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                  <CalendarIcon size={13} /> {item.date}
                </TimelineDate>
              </div>

              <TimelineContent className="text-foreground mt-1">
                {item.description}
              </TimelineContent>

              <div className="mt-5 flex gap-3 items-center">
                <p className="text-xs">Tags:</p>{" "}
                <Badge variant="secondary">Win Gatchalian</Badge>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
