"use client";

import { Loader, Megaphone, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import NoDataFound from "@/components/ui/nodata";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TitleReusable from "@/components/ui/title";
import useAnnouncementFetchUser from "@/hooks/user/getAnnouncement";

export default function ClientScholarship() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy] = useState("");
  const [order] = useState("");
  const { data, meta, loading, isFetchingMore } = useAnnouncementFetchUser({
    page,
    pageSize,
    sortBy,
    order,
  });

  const handleLoadMore = () => {
    if (meta && page < meta.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <div className="pb-4 border-b">
          <TitleReusable
            title="Announcements"
            description="Here’s what’s new! Stay tuned for the latest updates."
            Icon={Megaphone}
          />
        </div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-3">
          {data.map((item) => (
            <div
              key={item.announcementId}
              className=" dark:bg-card bg-card/30  rounded-md shadow pt-6 px-6 pb-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="lg:text-lg text-base font-semibold tracking-tight text-foreground  text-balance ">
                    {item.title}
                  </h2>{" "}
                  {item.tags.data.length > 0 && (
                    <div className=" flex flex-wrap gap-2 ml-3">
                      {item.tags.data.map((tag, i) => (
                        <p
                          className="pl-3 border-l text-sm font-medium text-green-700 "
                          key={i}
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <Button size="sm">
                  <ArrowRight />
                </Button>
              </div>{" "}
              <time className=" text-xs text-foreground/70 flex items-center gap-1.5 jakarta tracking-wide mt-1">
                <Calendar className="h-3 w-3" />{" "}
                {item.dateCreated && format(item.dateCreated, "PPP p")}
              </time>
              <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80 text-pretty w-3/4 mt-3 ">
                {item.description}
              </p>{" "}
            </div>
          ))}
        </div>
        {isFetchingMore && (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="group relative overflow-hidden py-8 transition-all"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                  <div className="flex flex-col gap-1 lg:w-32 shrink-0">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />

                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {meta?.totalPage > 1 && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={loading || page >= meta.totalPage || isFetchingMore}
            >
              {loading || isFetchingMore ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : page < meta.totalPage ? (
                <>
                  Load More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                "You're all caught up!"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
