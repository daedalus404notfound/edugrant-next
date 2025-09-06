"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import TitleReusable from "@/components/ui/title";

const adminLogs = [
  {
    id: 1,
    action: "Created new scholarship record",
    description: "Admin added a new scholarship entry for the 2025 program.",
    date: "2025-01-05T09:30:00Z",
  },
  {
    id: 2,
    action: "Updated applicant status",
    description: "Admin changed the status of Jerome Tecson to 'Approved'.",
    date: "2025-01-06T14:10:00Z",
  },
];

export default function AdminLogsDrawer() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1000px] w-full mx-auto h-[98vh] outline-none border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Admin Logs</DrawerTitle>
          <DrawerDescription>History of admin actions</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 bg-background p-4 space-y-5">
          <TitleReusable
            title="Admin Logs"
            description="History of admin actions"
          />

          <Timeline className="space-y-5">
            {adminLogs.map((log) => (
              <TimelineItem
                key={log.id}
                step={log.id}
                className="!m-0 bg-card p-4 rounded-md border !mb-3"
              >
                <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                  <TimelineTitle className="font-medium text-base">
                    {log.action}
                  </TimelineTitle>
                  <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                    <CalendarIcon size={13} />
                    {format(new Date(log.date), "PPP p")}
                  </TimelineDate>
                </div>

                <TimelineContent className="text-foreground mt-1 whitespace-pre-line">
                  {log.description}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
