import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { CalendarIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import type { AnnouncementFormDataGet } from "@/hooks/zod/announcement";

export default function Announcements({
  announcement,
  loading,
}: {
  announcement: AnnouncementFormDataGet[];
  loading: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-semibold">Announcements</h1>
        <Link href={"/user/home/announcements"}>
          <Button
            size="sm"
            variant="link"
            className="gap-1.5 hover:gap-2 transition-all"
          >
            See All <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-lg p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          ))
        ) : announcement?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No announcements found.
          </div>
        ) : (
          announcement.slice(0, 2).map((item, index) => (
            <div
              key={item.announcementId}
              className="relative overflow-hidden bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-lg p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:from-primary/10 transition-colors" />

              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-base leading-tight transition-colors">
                    {item.title ?? "Win scholarship is now open."}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 bg-muted/50 px-2.5 py-1 rounded-full">
                    <CalendarIcon className="h-3 w-3" />
                    {item.dateCreated && format(item.dateCreated, "MMM d")}
                  </div>
                </div>
                {/* <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>{" "} */}
                <p
                  className="line-clamp-2 text-sm leading-relaxed text-foreground/80  lg:w-3/4   max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium text-xs">
                    Win Gatchalian
                  </Badge>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
