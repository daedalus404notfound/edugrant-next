"use client";

import { Loader, Megaphone, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import TitleReusable from "@/components/ui/title";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useApplicationUIStore } from "@/store/updateUIStore";
import NoDataFound from "@/components/ui/nodata";

export default function AdminAnnouncement() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy] = useState("");
  const [search, setSearch] = useState("");
  const [order] = useState("");
  const { data, meta, loading, isFetchingMore } = useAnnouncementFetch({
    page,
    pageSize,
    sortBy,
    order,
    search,
  });
  const { deletedAnnouncementIds } = useApplicationUIStore();
  const handleLoadMore = () => {
    if (meta && page < meta.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const filtered = data.filter(
    (meow) => !deletedAnnouncementIds.includes(meow.announcementId)
  );
  useEffect(() => {
    if (filtered.length === 4 && meta && page < meta.totalPage) {
      setPage((prev) => prev + 1);
    }
  }, [deletedAnnouncementIds]);
  const AnnouncementSkeleton = () => (
    <div className="dark:bg-card bg-card/30 rounded-md shadow pt-6 px-6 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 lg:w-64 w-48" />
          <div className="flex flex-wrap gap-2 ml-3">
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
      <Skeleton className="h-4 w-32 mt-1" />
      <Skeleton className="h-4 w-3/4 mt-3" />
      <Skeleton className="h-4 w-2/3 mt-2" />
    </div>
  );

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <div className="pb-4 border-b">
          <TitleReusable
            title="Announcements"
            description="Here's what's new! Stay tuned for the latest updates."
            Icon={Megaphone}
          />
        </div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-8">
          <Input
            placeholder="Search announcement..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-col gap-3">
            {loading && data.length === 0 ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <AnnouncementSkeleton key={i} />
                ))}
              </>
            ) : filtered.length === 0 ? (
              <NoDataFound />
            ) : (
              filtered.map((item) => (
                <Link
                  key={item.announcementId}
                  scroll={false}
                  prefetch={true}
                  href={`/administrator/head/home/announcement/${item.announcementId}`}
                  className="block bg-card hover:bg-gray-200 dark:bg-card/80 dark:hover:bg-card rounded-lg shadow pt-6 px-6 pb-8 transition-all duration-200"
                >
                  <div className=" ">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <h2 className="lg:text-lg text-base font-semibold tracking-tight text-foreground  text-balance ">
                          {item.title}
                        </h2>{" "}
                      </div>

                      <Button size="sm" variant="ghost">
                        <ArrowRight />
                      </Button>
                    </div>{" "}
                    <p
                      className="line-clamp-2 text-sm leading-relaxed text-foreground/80 text-pretty w-3/4 mt-3  max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className="flex justify-between items-center">
                      {item.tags.data.length > 0 && (
                        <div className=" flex flex-wrap gap-2 mt-5">
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
                      <time className=" text-xs text-foreground/70 flex items-center gap-1.5 jakarta tracking-wide mt-1">
                        <Calendar className="h-3 w-3" />{" "}
                        {item.dateCreated && format(item.dateCreated, "PPP p")}
                      </time>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          {isFetchingMore && (
            <div className="space-y-3 mt-3">
              {[...Array(2)].map((_, i) => (
                <AnnouncementSkeleton key={i} />
              ))}
            </div>
          )}
        </div>

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
