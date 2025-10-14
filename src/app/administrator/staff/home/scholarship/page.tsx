"use client";
import { ArrowRight, GraduationCap } from "lucide-react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import { TourTrigger } from "@/components/tour/tour-trigger";
import { columns } from "./manage-table-components/columns";
import DataTableToolbar from "./manage-table-components/data-table-toolbar";
import type { TourStep as TourStepType } from "@/lib/use-tour";
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

export default function Manage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, meta, loading, setData } = useScholarshipData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });
  const { searchData, searchLoading, searchMeta, setSearchData } =
    useScholarshipSearch({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortBy: sorting[0]?.id ?? "",
      order: sorting[0]?.desc ? "desc" : "asc",
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
  // const scholarshipTourSteps: TourStepType[] = [
  //   {
  //     id: "tabs",
  //     title: "Active vs Renewals",
  //     description:
  //       "Switch between active scholarships and renewal applications using these tabs.",
  //   },
  //   {
  //     id: "search",
  //     title: "Search Scholarships",
  //     description:
  //       "Find scholarships quickly by typing their name in the search bar.",
  //   },
  //   {
  //     id: "filters",
  //     title: "Filter Options",
  //     description:
  //       "Apply filters to narrow down scholarships based on specific criteria.",
  //   },
  //   // {
  //   //   id: "export",
  //   //   title: "Export CSV",
  //   //   description:
  //   //     "Download the list of scholarships as a CSV file for easy access.",
  //   // },
  //   {
  //     id: "view",
  //     title: "Table View Options",
  //     description: "Show or hide table columns to customize your view.",
  //   },

  //   {
  //     id: "table",
  //     title: "Scholarship Table",
  //     description:
  //       "View all available scholarships in a table format. Click a row to see more details.",
  //   },
  //   {
  //     id: "rowperpage",
  //     title: "Table Row Per Page",
  //     description:
  //       "Navigate between multiple pages of scholarships using the pagination controls.",
  //   },
  //   {
  //     id: "pagination",
  //     title: "Table Pagination",
  //     description:
  //       "Navigate between multiple pages of scholarships using the pagination controls.",
  //   },
  // ];
  const [openGuide, setOpenGuide] = useState(true);
  return (
    // <TourProvider steps={scholarshipTourSteps}>
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {/* <Dialog open={openGuide} onOpenChange={setOpenGuide}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable
                title="Welcome to Active Scholarship Management"
                description=""
              />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenGuide(false)}
            >
              Skip for Now
            </Button>
            <div onClick={() => setOpenGuide(false)} className="flex-1 ">
              <TourTrigger className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full" />
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Active Scholarship Management"
          description="View and manage scholarships. Switch between active scholarships and renewals using the tabs below."
          Icon={GraduationCap}
        />{" "}
        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          {" "}
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto">
          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            <AnimatePresence mode="wait">
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15,
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
                data.map((scholarship, index) => (
                  <motion.div
                    key={scholarship.scholarshipId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="shadow-sm hover:shadow-md transition-all duration-200 p-1  rounded-lg border bg-card"
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
                              {getPhaseLabel(data[0]?.phase)}
                            </Badge>
                          </div>

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
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    // </TourProvider>
  );
}
