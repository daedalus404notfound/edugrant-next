"use client";

import {
  ArrowRight,
  Bell,
  Check,
  CheckCheck,

} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import { format } from "date-fns";

import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnoucement";
import { Skeleton } from "@/components/ui/skeleton";


export default function ScholarshipAnnouncements() {
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [sortBy] = useState("");
  const [order] = useState("");
  const [status] = useState("ACTIVE");

  const [selectedId] = useState<string[]>([]);
  const { data, loading } = useAnnouncementFetch({
    page,
    pageSize,
    sortBy,
    order,
    status,
  });

  // const { onSubmit, loadingDelete } = useDeleteAnnouncement({
  //   announcementId: selectedId,
  // });
  console.log("data", data);
  return (
    <div className=" min-h-screen px-4">
      <div className="mx-auto max-w-4xl w-full py-10">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-xl font-semibold flex items-center gap-1.5
          "
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 7,
            ease: "linear",
          }}
        >
          <Bell size={20} />
          Notification
        </motion.span>
        <p className="text-sm text-gray-300 mt-1">Stay updated</p>

        <div className="py-7">
          <div className="flex justify-end items-center">
            <Button size="sm" variant="outline">
              Mark all as Read <CheckCheck />
            </Button>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 gap-3 mt-2">
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
            </div>
          ) : data.length === 0 ? (
            <div className="h-50 flex justify-center items-center">
              <p className="text-sm text-muted-foreground">
                {" "}
                No announcement found.
              </p>
            </div>
          ) : (
            data.map((announcement) => (
              <div
                key={announcement.announcementId}
                className="py-8 border-b border-emerald-700"
              >
                {/* Date Column */}
                <div className="flex gap-8">
                  <div className="flex flex-col items-center pt-0.5 font-mono">
                    <div className="text-sm font-medium text-emerald-600  uppercase tracking-widest">
                      {format(new Date(announcement.startDate), "MMM d")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(new Date(announcement.startDate), "h:mm a")}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-center">
                      <h1>{announcement.title}</h1>
                      <span className="flex justify-center gap-2.5">
                        <Button size="sm" variant="link">
                          Mark as read <Check />
                        </Button>{" "}
                        <Button size="sm" variant="link">
                          View <ArrowRight />
                        </Button>
                      </span>
                    </div>
                    <p className=" text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-2">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
