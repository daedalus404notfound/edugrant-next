"use client";

import { Calendar, Loader, Megaphone, X } from "lucide-react";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";

import TitleReusable from "@/components/ui/title";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";

import NoDataFound from "@/components/ui/nodata";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { useAdminStore } from "@/store/adminUserStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto   w-3/4 py-10 space-y-12">
        <div className="flex justify-between items-end">
          <TitleReusable
            title="Announcements"
            description="Stay updated with the latest announcements and important updates"
            Icon={Megaphone}
          />
        </div>

        <div className=" ">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-stretch p-6 rounded-md bg-card"
                >
                  {/* Content Skeleton */}
                  <div className="flex-1 ">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-7 w-64" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : (
            data.map((item, index) => (
              <Link
                key={index}
                href={`/administrator/head/home/announcement/${item.announcementId}`}
                scroll={false}
                className="relative flex items-stretch mb-3 rounded-lg bg-card border-transparent transition-all duration-200"
              >
                {/* Date Section */}
                {/* <div className="flex flex-col items-center justify-center gap-1 w-32  rounded-l-md  ">
                  <p className="text-lg font-medium">
                    
                  </p>
                  <p className="text-sm text-muted-foreground">
                    
                  </p>
                </div> */}

                {/* Main Content */}
                <div className="flex-1 p-6 rounded-r-md">
                  <div className="flex items-center gap-3">
                    <h1 className="font-medium text-lg">{item.title}</h1>
                    <div className="space-x-3">
                      {item.tags.data.map((meow, i) => (
                        <Badge
                          key={i}
                          className="bg-green-800/20 text-green-600"
                        >
                          {meow}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.dateCreated &&
                      format(item.dateCreated, "MMM dd")} at{" "}
                    {item.dateCreated && format(item.dateCreated, "p")}
                  </div>

                  <div className=" line-clamp-2 mt-5 text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))
          )}
          {isFetchingMore && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-stretch p-6 rounded-md bg-card"
                >
                  {/* Content Skeleton */}
                  <div className="flex-1 ">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-7 w-64" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {meta?.totalPage > 1 && (
          <div className="flex justify-center items-center mt-6">
            <Button
              variant="link"
              size="sm"
              onClick={handleLoadMore}
              disabled={loading || page >= meta.totalPage || isFetchingMore}
            >
              {loading ? (
                <>
                  Loading...
                  <Loader className="animate-spin" />
                </>
              ) : isFetchingMore ? (
                <>
                  Loading...
                  <Loader className="animate-spin" />
                </>
              ) : page < meta.totalPage ? (
                "Load More"
              ) : (
                <>You're all caught up!.</>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
