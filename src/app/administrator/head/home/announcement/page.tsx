"use client";

import { Megaphone } from "lucide-react";

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
  const [pageSize] = useState(10);
  const [sortBy] = useState("");
  const [order] = useState("");
  const { data, meta, loading } = useAnnouncementFetch({
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
  // const { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete } =
  //   useDeleteAnnouncement(accountId);

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10 space-y-12">
        <div className="flex justify-between items-end">
          <TitleReusable
            title="Announcements"
            description="Stay updated with the latest announcements and important updates"
            Icon={Megaphone}
          />
        </div>

        <div className=" divide-y">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-35 w-full" />
              <Skeleton className="h-35 w-full" />
              <Skeleton className="h-35 w-full" />
            </div>
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : (
            data.map((item, index) => (
              <Link
                className="relative flex  py-6"
                key={index}
                href={`/administrator/head/home/announcement/${item.announcementId}`}
              >
                <div className="flex flex-col items-center justify-center gap-1 w-32 ">
                  <p
                    className="text-lg font-medium
                    "
                  >
                    {item.dateCreated && format(item.dateCreated, "MMM dd")}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {item.dateCreated && format(item.dateCreated, "p")}
                  </p>
                </div>

                <Separator orientation="vertical" className="h-32" />
                <div className="flex-1 border-l-2 border-primary-second px-6 py-4 hover:bg-card rounded-r-lg">
                  <div className="flex items-center gap-3">
                    <h1 className="font-medium text-base text-green-800">
                      {item.title}
                    </h1>

                    <div className="space-x-3">
                      {item.tags.data.map((meow, index) => (
                        <Badge key={index} variant="secondary">
                          {meow}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="whitespace-pre-line  line-clamp-3 mt-5 text-sm">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {meta?.totalPage > 1 && (
          <div className="flex justify-center items-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadMore}
              disabled={loading || page >= meta.totalPage}
            >
              {loading
                ? "Loading..."
                : page < meta.totalPage
                ? "Load More"
                : "No More Data"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
