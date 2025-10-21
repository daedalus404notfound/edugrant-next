"use client";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  TextSearch,
} from "lucide-react";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useScholarshipData from "@/hooks/admin/getScholarship";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";
import { DataTable } from "@/app/table-components/data-table";
import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import { Badge } from "@/components/ui/badge";
import { getPhaseLabel } from "@/lib/phaseLevel";
import { format } from "date-fns";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useAdminStore } from "@/store/adminUserStore";
import socket from "@/lib/socketLib";

export default function Manage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [sort, setSort] = useState("asc");
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");

  const { admin, loading: loadingAdmin } = useAdminStore();
  const { data, meta, loadingState, setData } = useScholarshipData({
    page,
    pageSize: rowsPerPage,
    status: status,
  });
  const { searchData, searchLoading, searchMeta, setSearchData } =
    useScholarshipSearch({
      page,
      pageSize: rowsPerPage,
      query: search,
      status: status,
    });

  const tabs = [
    {
      id: "ACTIVE",
      label: "Active Scholarship",
      indicator: meta.count.countActive,
    },
    {
      id: "RENEW",
      label: "Scholarship Renewals",
      indicator: meta.count.countRenew,
    },
  ];

  useEffect(() => {
    socket.on("adminAddScholarships", ({ newScholarship }) => {
      console.log("🎓 New scholarship received:", newScholarship);
      setData((prev) => [newScholarship, ...prev]);
    });

    socket.on("deleteScholarship", (data) => {
      console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);

      setData((prev) =>
        prev.filter(
          (meow) => meow.scholarshipId !== data.deletedScholarship.scholarshipId
        )
      );
    });

    return () => {
      socket.off("adminAddScholarships");
      socket.off("deleteScholarship");
    };
  }, []);

  const handleNext = () => {
    if (meta && meta.page < meta.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (meta.page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
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
          className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b"
        >
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </motion.div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-8">
          <motion.div
            className="flex justify-between items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <Input
              placeholder="Search Scholarship...(Single API ready)"
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm w-full text-sm"
            />
            <Select value={sort} onValueChange={(e) => setSort(e)}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Newest</SelectItem>
                <SelectItem value="desc">Oldest</SelectItem>
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
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
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
              data.map((scholarship, index) => {
                // const findMatch = user?.Student.Application.find(
                //   (meow) => meow.scholarshipId === scholarship?.scholarshipId
                // );
                // const isNotRenew =
                //   user?.Student.Application.find(
                //     (meow) =>
                //       scholarship.scholarshipId === scholarship?.scholarshipId
                //   )?.status !== "RENEW";
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
                    className="shadow-sm hover:shadow-md transition-all duration-200 lg:p-1 p-0.5  rounded-lg border bg-card"
                  >
                    {/* <Link
                        href={`/user/home/applications/${scholarship.applicationId}`}
                        key={scholarship.applicationId}
                        prefetch
                        scroll={false}
                      > */}
                    <div className="relative rounded-lg bg-background overflow-hidden">
                      <img
                        className={`absolute h-full w-full left-0 top-0 object-cover -z-0 opacity-15   mask-gradient blur-xs ${
                          status === "EXPIRED" ? "" : ""
                        }`}
                        src={scholarship.cover}
                        alt=""
                      />
                      <div className="relative z-10">
                        <div className="relative aspect-[16/8.5] w-full rounded-md overflow-hidden">
                          <div className="flex gap-1.5 absolute top-0 right-2">
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
                            <div className="absolute top-0 -left-2 flex items-center">
                              <div
                                className="flex items-center justify-center text-gray-200 font-medium text-sm px-7 py-1.5 bg-gradient-to-br to-green-950 from-green-800"
                                style={{
                                  clipPath:
                                    "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                }}
                              >
                                SUBMITTED
                              </div>
                            </div>
                          )}

                          {/* {scholarship.status && (
                                <div className="absolute top-0 -left-2 flex items-center">
                                  
                                  <div
                                    className="absolute"
                                    style={{
                                      width: "120px",
                                      height: "30px",
                                      background:
                                        scholarship.status === "BLOCKED"
                                          ? "rgba(0,0,0,0.5)"
                                          : scholarship.status === "APPROVED"
                                          ? "rgba(5 46 22)"
                                          : scholarship.status === "PENDING"
                                          ? "rgb(66 32 6)"
                                          : scholarship.status === "INTERVIEW"
                                          ? "rgb(23 37 84)"
                                          : scholarship.status === "DECLINED"
                                          ? "rgba(69 10 10)"
                                          : "rgba(0,0,0,0.5)",
                                      clipPath:
                                        "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                      transform: "translate(0px, 0px)", // shadow offset
                                      zIndex: 0,
                                    }}
                                  ></div>
  
                                  
                                  <div
                                    className="flex items-center justify-center text-gray-200 font-medium text-sm px-6 py-2"
                                    style={{
                                      width: "120px",
                                      height: "30px",
                                      background:
                                        scholarship.status === "BLOCKED"
                                          ? "rgba(0,0,0,0.5)"
                                          : scholarship.status === "APPROVED"
                                          ? "rgba(5 46 22)"
                                          : scholarship.status === "PENDING"
                                          ? "rgb(66 32 6)"
                                          : scholarship.status === "INTERVIEW"
                                          ? "rgb(23 37 84)"
                                          : scholarship.status === "DECLINED"
                                          ? "rgba(69 10 10)"
                                          : "rgba(0,0,0,0.5)",
                                      clipPath:
                                        "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                                      zIndex: 1,
                                    }}
                                  >
                                    {scholarship.status}
                                  </div>
                                </div>
                              )} */}

                          <img
                            className="h-full w-full object-cover"
                            src={scholarship.cover}
                            alt=""
                          />
                        </div>

                        <div className="p-4 space-y-6">
                          <div className="flex items-center gap-3">
                            {scholarship ? (
                              <img
                                src={scholarship?.logo}
                                alt={scholarship?.title}
                                className="w-10 h-10 rounded-full object-cover border"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                No Logo
                              </div>
                            )}{" "}
                            <div className="w-full">
                              <h3 className="font-semibold text-sm line-clamp-1">
                                {scholarship?.title}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                {scholarship?.Scholarship_Provider?.name ||
                                  "Unknown Provider"}
                              </p>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Deadline</span>
                              <span className="font-medium text-foreground">
                                {scholarship?.dateCreated
                                  ? format(scholarship?.dateCreated, "PPP")
                                  : "—"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
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
                            <Button className="w-full">
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
