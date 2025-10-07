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
  TimelineHeader,
  TimelineTitle,
} from "@/components/ui/timeline";

import useGetStaffLogs from "@/hooks/admin/getStaffLogs";
import { useAdminStore } from "@/store/adminUserStore";
import { Button } from "@/components/ui/button";
import { Logs, X } from "lucide-react";
import { format } from "date-fns";

export default function InterceptManageStaff() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);

  const accountId = admin?.accountId;
  const staffId = params.id as string;

  const handleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  const { data, loading } = useGetStaffLogs(staffId, accountId);

  return (
    <Drawer open={open} onOpenChange={(value) => handleCloseDrawer(value)}>
      <DrawerContent className="max-w-[1000px] w-full mx-auto !max-h-[70vh] h-full outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Staff Activity Logs</DrawerTitle>
          <DrawerDescription>
            View recent staff actions and updates.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex items-center justify-between lg:pb-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative justify-start"
            >
              <Logs className="w-4 h-4 mr-1" />
              Activity Logs
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>

        <div className="p-4 flex-1 bg-background rounded-t-lg">
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading staff activity...
            </p>
          ) : data?.length ? (
            <Timeline className="space-y-4">
              {data.map((item, index) => (
                <div key={index}>
                  <TimelineHeader>
                    <TimelineTitle className="mt-0.5 font-medium text-foreground">
                      Application Approved
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent className="text-foreground mt-2 rounded-md px-4 py-3 bg-card">
                    <p>
                      You approved the scholarship application of{" "}
                      <strong>
                        {item.application.Student.lName},{" "}
                        {item.application.Student.fName}{" "}
                        {item.application.Student.mName || ""}
                      </strong>{" "}
                      for the program <strong>{item.scholarship.title}</strong>.
                    </p>
                    <TimelineDate className="mt-2 text-xs text-muted-foreground">
                      {format(item.dateCreated, "PPP p")}
                    </TimelineDate>
                  </TimelineContent>
                </div>
              ))}
            </Timeline>
          ) : (
            <p className="text-sm text-muted-foreground">
              No activity logs found.
            </p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
