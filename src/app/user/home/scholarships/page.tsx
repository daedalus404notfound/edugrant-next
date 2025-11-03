"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TextSearch,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Badge } from "@/components/ui/badge";
import useScholarshipData from "@/hooks/user/getScholarship";
import { Skeleton } from "@/components/ui/skeleton";
import TitleReusable from "@/components/ui/title";
import { format } from "date-fns";
import NoDataFound from "@/components/ui/nodata";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { getPhaseLabel } from "@/lib/phaseLevel";
import CompleteChecker from "../dashboard-components/complete-check";
import { Button } from "@/components/ui/button";
import socket from "@/lib/socketLib";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";
export default function ClientScholarship() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");

  const { data: user } = useAuthenticatedUser();
  const { query, meta } = useScholarshipData({
    pagination,
    sorting,
    columnFilters,
    status,
    search,
  });
  const { completed } = getFamilyBackgroundProgress(user?.userData?.Student);

  const handleNext = () => {
    if (meta && pagination.pageIndex + 1 < meta.totalPage) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
    }
  };

  const handlePrev = () => {
    if (pagination.pageIndex > 0) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
    }
  };
  const tabs = [
    {
      id: "ACTIVE",
      label: "Ongoing",
      indicator: meta.counts?.countActive ? meta.counts?.countActive : null,
    },
    {
      id: "RENEW",
      label: "For Renewal",
      indicator: meta.counts?.countRenew ? meta.counts?.countRenew : null,
    },
    {
      id: "EXPIRED",
      label: "Closed",
      indicator: meta.counts?.countExpired ? meta.counts?.countExpired : null,
    },
  ];

  const loadingState = query.isLoading;
  const data = query.data?.data ?? [];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {!loadingState && !completed && (
        <div className="absolute inset-0 z-20 bg-background/70 rounded-lg " />
      )}
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          <TitleReusable
            title="Available Scholarships"
            description="View the list of scholarships currently open for application."
            Icon={TextSearch}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="overflow-y-hidden overflow-x-auto pb-1.5 pt-7.5 no-scrollbar border-b sticky z-20 top-0 bg-background"
        >
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </motion.div>
        <div className="lg:mt-15 mt-10 lg:w-[80%] md:min-w-5xl w-full mx-auto lg:space-y-8 space-y-6">
          {!loadingState && !completed && <CompleteChecker />}

          <motion.div
            className="flex justify-between items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <Input
              placeholder="Search Scholarship..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="max-w-sm w-full text-sm"
            />
            <Select
              value={sorting[0].desc ? "desc" : "asc"}
              onValueChange={(e) =>
                setSorting([
                  {
                    id: "dateCreated",
                    desc: e === "desc",
                  },
                ])
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {search ? (
            <p className="text-sm">
              Showing search result for{" "}
              <strong className="underline">{search}</strong>{" "}
            </p>
          ) : (
            ""
          )}
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-2">
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
                  className="shadow-sm rounded-lg border bg-card "
                >
                  <div className="rounded-lg bg-background overflow-hidden">
                    <Skeleton className="lg:aspect-[16/8.5] aspect-[16/10] w-full rounded-md" />

                    <div className="lg:px-4 py-6 p-2 lg:space-y-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full hidden lg:block" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                        <div className=" items-center justify-between hidden lg:flex">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>

                      {/* <Skeleton className="lg:h-10 h-8 w-full rounded-md" /> */}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.slice(0, 6).map((meow, index) => {
                return (
                  <Link
                    scroll={false}
                    prefetch={true}
                    key={meow.scholarshipId}
                    href={`/user/home/scholarships/${meow.scholarshipId}`}
                  >
                    {" "}
                    <motion.div
                      key={meow.scholarshipId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      // className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
                      className="shadow-sm transition-all duration-300 rounded-lg  bg-card overflow-hidden group hover:-translate-y-2 hover:shadow-xl border border-card/50"
                    >
                      {/* <Link
                      href={`/user/home/applications/${meow.applicationId}`}
                      key={meow.applicationId}
                      prefetch
                      scroll={false}
                    > */}
                      <div className="relative rounded-lg bg-background overflow-hidden">
                        <img
                          className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                            status === "EXPIRED" ? "" : ""
                          }`}
                          src={meow.cover}
                          alt=""
                        />
                        <div className="relative z-10">
                          <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
                            <div className="absolute inset-0 bg-background opacity-0 z-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                            {meow.Application?.length! > 0 && (
                              <div className="absolute inset-0 bg-zinc-900/50 z-10"></div>
                            )}
                            {meow.Application?.length! > 0 && (
                              <div className="absolute top-0 -left-2 flex items-center z-20">
                                <div
                                  className="flex items-center justify-center text-gray-200 font-medium text-sm  px-7  py-1.5 bg-gradient-to-br to-green-950 from-green-800"
                                  style={{
                                    clipPath:
                                      "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                  }}
                                >
                                  SUBMITTED
                                </div>
                              </div>
                            )}
                            <Button
                              size="sm"
                              className="absolute z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                              variant="secondary"
                            >
                              View Details <ArrowRight />
                            </Button>

                            <img
                              className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-300"
                              src={meow.cover}
                              alt=""
                            />
                          </div>

                          <div className="px-4 py-6 space-y-6">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                {meow ? (
                                  <img
                                    src={meow?.logo}
                                    alt={meow?.title}
                                    className="w-10 h-10 rounded-full object-cover border"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                    No Logo
                                  </div>
                                )}{" "}
                                <div className="w-full">
                                  <h3 className="font-semibold text-sm line-clamp-1">
                                    {meow?.title}
                                  </h3>

                                  <p className="text-sm text-muted-foreground">
                                    {meow?.Scholarship_Provider?.name ||
                                      "Unknown Provider"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {meow.phase > 1 && (
                                  <Badge className="bg-blue-800 text-gray-200">
                                    RENEWAL
                                  </Badge>
                                )}
                                <Badge className="bg-blue-800 text-gray-200 uppercase">
                                  {getPhaseLabel(meow.phase)}
                                </Badge>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Deadline Date:</span>
                                <span className="font-medium text-foreground">
                                  {meow?.deadline
                                    ? format(meow?.deadline, "PPP")
                                    : "—"}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">
                                  Scholarship Type:
                                </span>
                                <span className="font-medium text-foreground">
                                  {meow?.type || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                    </motion.div>
                  </Link>
                );
              })
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
