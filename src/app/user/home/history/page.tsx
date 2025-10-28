"use client";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, History } from "lucide-react";
import { format } from "date-fns";
import TitleReusable from "@/components/ui/title";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useHistoryStore } from "@/store/historyUserStore";
import useClientHistoryApplications from "@/hooks/user/getApplicationHistory";

export default function ClientScholarship() {
  const { page, setPage, meta } = useHistoryStore();

  const { data, isLoading: loadingState } = useClientHistoryApplications();

  const handleNext = () => {
    if (meta && meta.page < meta.totalPage) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (meta.page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <TitleReusable
            title="Application History"
            description="View all scholarships that have ended or are no longer active."
            Icon={History}
          />
        </motion.div>

        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-8">
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6">
            {loadingState ? (
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="shadow-sm rounded-lg border bg-card p-1"
                >
                  <div className="rounded-lg bg-background overflow-hidden">
                    <Skeleton className="aspect-[16/8.5] w-full rounded-md" />

                    <div className="p-4 space-y-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>

                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.slice(0, 6).map((meow, index) => (
                <motion.div
                  key={meow.applicationId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
                >
                  {/* <Link
                      href={`/user/home/applications/${meow.applicationId}`}
                      key={meow.applicationId}
                      prefetch
                      scroll={false}
                    > */}
                  <div className="relative rounded-lg bg-background overflow-hidden">
                    <img
                      className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs `}
                      src={meow.Scholarship?.cover}
                      alt=""
                    />
                    <div className="relative z-10">
                      <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
                        {meow.status && (
                          <div className="absolute top-0 -left-2 flex items-center">
                            <div
                              className="flex items-center justify-center text-gray-200 font-medium text-sm px-7 py-1.5 bg-gradient-to-br to-gray-950 from-gray-800"
                              style={{
                                clipPath:
                                  "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                              }}
                            >
                              SCHOLARSHIP ENDED
                            </div>
                          </div>
                        )}

                        <img
                          className="h-full w-full object-cover"
                          src={meow.Scholarship?.cover}
                          alt=""
                        />
                      </div>

                      <div className="p-4 space-y-6">
                        <div className="flex items-center gap-3">
                          {meow.Scholarship ? (
                            <img
                              src={meow?.Scholarship?.logo}
                              alt={meow?.Scholarship?.title}
                              className="w-10 h-10 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                              No Logo
                            </div>
                          )}{" "}
                          <div className="w-full">
                            <h3 className="font-semibold text-sm line-clamp-1">
                              {meow?.Scholarship?.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              {meow?.Scholarship?.Scholarship_Provider?.name ||
                                "Unknown Provider"}
                            </p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Application Date:</span>
                            <span className="font-medium text-foreground">
                              {meow?.dateCreated
                                ? format(meow?.dateCreated, "PPP")
                                : "—"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Scholarship Type:</span>
                            <span className="font-medium text-foreground">
                              {meow?.Scholarship?.type || "N/A"}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/user/home/applications/${meow.applicationId}`}
                          prefetch={true}
                          scroll={false}
                        >
                          <Button className="w-full">
                            View Details <ArrowRight />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </motion.div>
              ))
            )}
          </div>

          {meta.totalRows > 6 && (
            <motion.div
              className="flex items-center justify-between gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
            >
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
                      disabled={meta.page === 1 || loadingState}
                      onClick={handlePrev}
                    >
                      <ChevronLeft /> Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      disabled={
                        meta.page === meta.totalPage ||
                        meta.totalPage === 0 ||
                        loadingState
                      }
                      onClick={handleNext}
                    >
                      Next
                      <ChevronRight />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
