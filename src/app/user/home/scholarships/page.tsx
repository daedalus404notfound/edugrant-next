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
import { useApplicationStore } from "@/store/applicationUsetStore";
import { useScholarshipUserStore } from "@/store/scholarshipUserStore";
import { useUserStore } from "@/store/useUserStore";
export default function ClientScholarship() {
  const { status, setStatus } = useScholarshipUserStore();
  const { user } = useUserStore();
  const { search, page, order, setPage, setSearch, setOrder, meta } =
    useScholarshipUserStore();
  const { data, isLoading: loadingState } = useScholarshipData();
  const { completed } = getFamilyBackgroundProgress(user?.Student);

  // useEffect(() => {
  //   socket.on("updateScholarship", (data) => {
  //     console.log("edited:", data);

  //     setData((prev) =>
  //       prev.map((item) =>
  //         item.scholarshipId === data.update.scholarshipId
  //           ? { ...item, ...data.update }
  //           : item
  //       )
  //     );
  //   });

  //   socket.on("renewScholarship", (data) => {
  //     console.log("renew scholarship received:", data);

  //     setData((prev) => {
  //       const filtered = prev.filter(
  //         (meow) => meow.scholarshipId !== data.renewScholar.scholarshipId
  //       );
  //       if (status === "RENEW") {
  //         return [data.renewScholar, ...prev];
  //       }

  //       return filtered;
  //     });
  //   });

  //   socket.on("adminAddScholarships", (data) => {
  //     console.log("New scholarship received:", data);
  //     setData((prev) => [data.newScholarship, ...prev]);
  //   });

  //   socket.on("deleteScholarship", (data) => {
  //     console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);

  //     setData((prev) =>
  //       prev.filter(
  //         (meow) => meow.scholarshipId !== data.deletedScholarship.scholarshipId
  //       )
  //     );
  //   });
  //   return () => {
  //     socket.off("applyScholarship");
  //     socket.off("adminAddScholarships");
  //     socket.off("deleteScholarship");
  //     socket.off("renewScholarship");
  //     socket.off("updateScholarship");
  //   };
  // }, [status, setStatus]);

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
            <Select value={order} onValueChange={(e) => setOrder(e)}>
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
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 lg:gap-6 gap-2">
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
                  className="shadow-sm rounded-lg border bg-card lg:p-1 p-0.5"
                >
                  <div className="rounded-lg bg-background overflow-hidden">
                    <Skeleton className="lg:aspect-[16/8.5] aspect-[16/10] w-full rounded-md" />

                    <div className="lg:p-4 p-2 lg:space-y-6 space-y-3">
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

                      <Skeleton className="lg:h-10 h-8 w-full rounded-md" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.slice(0, 6).map((scholarship, index) => {
                return (
                  <motion.div
                    key={scholarship.scholarshipId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="shadow-sm hover:shadow-md transition-all duration-200 lg:p-1  p-0.5  lg:rounded-lg rounded-md border bg-card"
                  >
                    {/* <Link
                      href={`/user/home/applications/${scholarship.applicationId}`}
                      key={scholarship.applicationId}
                      prefetch
                      scroll={false}
                    > */}
                    <div className="relative lg:rounded-lg rounded-md bg-background overflow-hidden">
                      <img
                        className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                          status === "EXPIRED" ? "" : ""
                        }`}
                        src={scholarship.cover}
                        alt=""
                      />
                      <div className="relative z-10">
                        <div className="relative lg:aspect-[16/8.5] aspect-[16/10] w-full lg:rounded-md rounded-sm overflow-hidden">
                          {scholarship.Application?.length! > 0 && (
                            <div className="absolute bg-black/80  inset-0 z-10" />
                          )}
                          <div className=" gap-1.5 absolute top-0 right-2 z-20 hidden lg:flex">
                            <Badge
                              variant="secondary"
                              className="mt-2 uppercase bg-blue-800 text-gray-200"
                            >
                              {" "}
                              {getPhaseLabel(scholarship.phase)}
                            </Badge>
                            {/* <Badge
                                variant="secondary"
                                className={`mt-2 uppercase text-gray-200 ${
                                  data[0]?.deadline &&
                                  Date.now() >
                                    new Date(data[0].deadline).getTime()
                                    ? "bg-red-800"
                                    : "bg-green-800"
                                }`}
                              >
                                {data[0]?.deadline &&
                                Date.now() >
                                  new Date(data[0].deadline).getTime()
                                  ? "EXPIRED"
                                  : "ACTIVE"}
                              </Badge> */}
                          </div>

                          {scholarship.Application?.length! > 0 && (
                            <div className="absolute top-0 -left-2 flex items-center z-20">
                              <div
                                className="flex items-center justify-center text-gray-200 font-medium lg:text-sm  text-xs lg:px-7 px-4 py-1.5 bg-gradient-to-br to-green-950 from-green-800"
                                style={{
                                  clipPath:
                                    "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                }}
                              >
                                SUBMITTED
                              </div>
                            </div>
                          )}

                          <img
                            className="h-full w-full object-cover"
                            src={scholarship.cover}
                            alt=""
                          />
                        </div>

                        <div className="lg:p-4 p-2 space-y-2 lg:space-y-6 ">
                          <div className="flex items-center gap-3">
                            {scholarship ? (
                              <img
                                src={scholarship?.logo}
                                alt={scholarship?.title}
                                className="w-10 h-10 rounded-full object-cover border hidden lg:block"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                No Logo
                              </div>
                            )}{" "}
                            <div className="w-full">
                              <h3 className="font-semibold lg:text-sm text-xs line-clamp-1">
                                {scholarship?.title}
                              </h3>

                              <p className="lg:text-sm text-xs text-muted-foreground">
                                {scholarship?.Scholarship_Provider?.name ||
                                  "Unknown Provider"}
                              </p>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col gap-1 lg:text-sm text-xs text-muted-foreground">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                              <span className="text-xs">Deadline</span>
                              <span className="font-medium text-foreground line-clamp-1">
                                {scholarship?.dateCreated
                                  ? format(scholarship?.dateCreated, "PPP")
                                  : "—"}
                              </span>
                            </div>
                            <div className="hidden lg:flex items-center justify-between">
                              <span className="text-xs">Scholarship Type</span>
                              <span className="font-medium text-foreground">
                                {scholarship?.type || "N/A"}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                            prefetch={true}
                            scroll={false}
                          >
                            <Button className="w-full hidden lg:flex">
                              View Details <ArrowRight />
                            </Button>
                            <Button
                              size="sm"
                              className="w-full text-xs lg:hidden flex"
                            >
                              View Details <ArrowRight />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </motion.div>
                );
              })
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}
