"use client";
import { CalendarIcon, Megaphone } from "lucide-react";

import { useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TitleReusable from "@/components/ui/title";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import Link from "next/link";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import AnnouncementDescription from "@/components/ui/description";

export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [sortBy] = useState("");
  const [order] = useState("");

  const { data, loading } = useAnnouncementFetch({
    page,
    pageSize,
    sortBy,
    order,
  });

  return (
    <div className="  bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:pt-10  pt-3 space-y-8">
        <div className="flex justify-between items-end">
          <motion.div
            className="flex justify-between items-end"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TitleReusable
              title="Announcements"
              description="Keep track of all scholarship-related news and important alerts for your applications."
              Icon={Megaphone}
            />
          </motion.div>
        </div>

        <div>
          <Timeline className="space-y-5">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="bg-background/40 relative rounded-md border space-y-3"
                >
                  <Skeleton className="h-30" />
                </motion.div>
              ))
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.map((item, index) => (
                <TimelineItem
                  key={item.announcementId ? item.announcementId : index}
                  step={item.announcementId ? item.announcementId : index}
                  className="!m-0  bg-card  p-4! rounded-md border !mb-3"
                >
                  <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                    <TimelineTitle className="font-medium text-base">
                      {item.title ?? "Win scholarship is now open."}
                    </TimelineTitle>
                    <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                      <CalendarIcon size={13} />{" "}
                      {item.startDate && format(item.startDate, "PPP p")}
                    </TimelineDate>
                  </div>

                  <TimelineContent className="text-foreground mt-1 whitespace-pre-line">
                    <AnnouncementDescription description={item.description} />
                  </TimelineContent>

                  <div className="mt-5 flex gap-3 items-center">
                    <p className="text-xs">Tags:</p>{" "}
                    <Badge variant="secondary">Win Gatchalian</Badge>
                  </div>
                </TimelineItem>
              ))
            )}
          </Timeline>
        </div>
      </div>
    </div>
  );
}
