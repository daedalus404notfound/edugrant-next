"use client";

import { Loader, Megaphone, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import NoDataFound from "@/components/ui/nodata";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TitleReusable from "@/components/ui/title";

export default function ClientScholarship() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy] = useState("");
  const [order] = useState("");
  const { data, meta, loading, isFetchingMore } = useAnnouncementFetch({
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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:py-15 space-y-8">
        <TitleReusable
          title="Announcements"
          description="Here’s what’s new! Stay tuned for the latest updates."
          Icon={Megaphone}
        />
        <div className="divide-y">
          {loading ? (
            [...Array(3)].map((_, i) => (
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
            ))
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : (
            data.map((item, index) => (
              <Link
                key={index}
                href={`/administrator/staff/home/announcement/${item.announcementId}`}
                scroll={false}
                className="group relative block overflow-hidden   transition-all hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="flex flex-col lg:py-8 py-6 lg:flex-row gap-3 ">
                  <div className="flex flex-col gap-1 text-muted-foreground lg:items-center justify-start lg:w-32 shrink-0">
                    <time className="lg:text-xl text-green-700 text-base font-semibold ">
                      {item.dateCreated && format(item.dateCreated, "MMM dd")}
                    </time>
                    <time className="text-sm hidden lg:block">
                      {item.dateCreated && format(item.dateCreated, "p")}
                    </time>
                  </div>

                  <div className="flex-1 space-y-4 px-4">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="lg:text-xl text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors text-balance">
                        {item.title}
                      </h2>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>

                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {item.description}
                    </p>

                    {item.tags.data.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.data.map((tag, i) => (
                          <Badge key={i} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-foreground/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))
          )}

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
        </div>
        {meta?.totalPage > 1 && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              size="lg"
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
