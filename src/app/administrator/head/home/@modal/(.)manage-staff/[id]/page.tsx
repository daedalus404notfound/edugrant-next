"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
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
  const id = params.id as string;
  const staffId = id;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  const { data, loading } = useGetStaffLogs(staffId, accountId);
  console.log(data);
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1000px] w-full mx-auto max-h-[90vh] h-full outline-0 border-0 p-1">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between lg:pb-2 ">
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start"
              variant="ghost"
              size="sm"
            >
              <Logs />
              Staff logs
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="ghost"
              variant="ghost"
              size="sm"
              onClick={() => HandleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Timeline className="divide-y rounded-lg border">
            {loading ? (
              <>loading</>
            ) : data.length === 0 ? (
              <>No data</>
            ) : (
              data.map((item, index) => (
                <TimelineItem
                  key={item.logsId}
                  step={index}
                  className="m-0! px-4! py-3!"
                >
                  <TimelineContent className="text-foreground">
                    <TimelineTitle>{item.action}</TimelineTitle>
                    <TimelineDate className="mt-1">
                      {item.dateCreated && format(item.dateCreated, "PPP p")}
                    </TimelineDate>
                  </TimelineContent>
                </TimelineItem>
              ))
            )}
          </Timeline>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
