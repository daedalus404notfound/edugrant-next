"use client";

import {
  Megaphone,
  ArrowRight,
  Calendar,
  SearchIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import TitleReusable from "@/components/ui/title";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useApplicationUIStore } from "@/store/updateUIStore";
import NoDataFound from "@/components/ui/nodata";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import useAnnouncementFetchUser from "@/hooks/user/getAnnouncement";
export default function AdminAnnouncement() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [select, setSelected] = useState("");
  const { data, meta, loading } = useAnnouncementFetchUser({
    page,
    pageSize,
    sortBy: select ? "dateCreated" : "",
    order: select,
    search,
  });
  console.log(data);
  const handleNext = () => {
    if (meta && page < meta.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

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
        <div className="pb-6 border-b">
          <TitleReusable
            title="Announcements"
            description="Here's what's new! Stay tuned for the latest updates."
            Icon={Megaphone}
          />
        </div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-3">
          <div className="flex justify-between">
            <div className="relative max-w-lg w-full">
              <Input
                placeholder="Search announcement..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full peer ps-9 pe-9"
                type="search"
              />

              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} />
              </button>
            </div>
            <Select onValueChange={(value) => setSelected(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Newest</SelectItem>
                <SelectItem value="desc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            {loading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <AnnouncementSkeleton key={i} />
                ))}
              </>
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.map((item) => (
                <Link
                  key={item.announcementId}
                  scroll={false}
                  prefetch={true}
                  href={`/user/home/announcements/${item.announcementId}`}
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

          <div className="flex items-center justify-between gap-3">
            <p
              className="grow text-sm text-muted-foreground"
              aria-live="polite"
            >
              Page <span className="text-foreground">{meta.page}</span> of{" "}
              <span className="text-foreground">{meta.totalPage}</span>
            </p>

            <Pagination className="w-auto">
              <PaginationContent className="gap-3">
                <PaginationItem>
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={handlePrev}
                  >
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    disabled={page === meta.totalPage || meta.totalPage === 0}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
