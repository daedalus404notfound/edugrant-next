import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { format } from "date-fns";
import { CalendarIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { AnnouncementFormData } from "@/hooks/zod/announcement";
export default function Announcements({
  announcement,
  loading,
}: {
  announcement: AnnouncementFormData[];
  loading: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-medium">Announcements</h1>
        <Link href={"/user/home/announcements"}>
          <Button size="sm" variant="link">
            See All <ExternalLink />
          </Button>
        </Link>
      </div>
      <Timeline className="space-y-5">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-background/40 relative rounded-md space-y-3"
            >
              <Skeleton className="h-30" />
            </motion.div>
          ))
        ) : announcement?.length === 0 ? (
          <>No announcement found.</>
        ) : (
          announcement.slice(0, 2).map((item, index) => (
            <TimelineItem
              key={item.announcementId}
              step={index}
              className="!m-0  bg-card shadow  p-6! rounded-md  !mb-3"
            >
              <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                <TimelineTitle className="font-medium text-base">
                  {item.title ?? "Win scholarship is now open."}
                </TimelineTitle>
                <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                  <CalendarIcon size={13} />{" "}
                  {item.dateCreated && format(item.dateCreated, "PPP")}
                </TimelineDate>
              </div>

              <TimelineContent className="text-foreground mt-3 line-clamp-1">
                {item.description}
              </TimelineContent>

              <div className="mt-5 flex gap-3 items-center">
                <Badge variant="secondary">Win Gatchalian</Badge>
              </div>
            </TimelineItem>
          ))
        )}
      </Timeline>
    </div>
  );
}
