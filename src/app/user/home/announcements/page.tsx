"use client";

import {
  Megaphone,
  ArrowRight,
  Calendar,
  SearchIcon,
  ArrowRightIcon,
  X,
  Clock,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/basclogo.png";
import { Button } from "@/components/ui/button";
import TitleReusable from "@/components/ui/title";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import NoDataFound from "@/components/ui/nodata";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import useAnnouncementFetchUser from "@/hooks/user/getAnnouncement";
import { useAnnouncementUserStore } from "@/store/announcementUserStore";
import { useState } from "react";
import useGetAnnouncementByIdUser from "@/hooks/user/getAnnouncementsById";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TipTapViewer } from "@/components/ui/tiptap-viewer";
import useAnnouncementData from "@/hooks/user/getAnnouncement";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import Link from "next/link";
export default function AdminAnnouncement() {
  const [search, setSearch] = useState("");

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
  const [id, setId] = useState(0);
  const { fullData, loading, refetch } = useGetAnnouncementByIdUser(id);
  const [open, setOpen] = useState(false);
  const { query, meta } = useAnnouncementData({
    pagination,
    sorting,
    columnFilters,
    search,
  });
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
  const loadingState = query.isLoading;
  const data = query.data?.annoucements ?? [];

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
            title="Announcements"
            description="THere's what's new! Stay tuned for the latest updates."
            Icon={Megaphone}
          />
        </motion.div>

        {/* <div className="flex gap-2 mt-5">
          <div className="flex-1">
            <Input placeholder="Search..." />
          </div>
          <Button variant="secondary">
            <MoreHorizontal />
          </Button>
        </div> */}

        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-8">
          <motion.div
            className="flex justify-between items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <Input
              placeholder="Search Announcement..."
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
          <div className="grid grid-cols-1  gap-4">
            {loadingState ? (
              [...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card relative rounded-lg p-4 md:p-6 shadow-sm space-y-4 md:space-y-6"
                >
                  {/* Header Section Skeleton */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                      <div className="space-y-2 flex-1 min-w-0">
                        <Skeleton className="h-4 w-full max-w-xs" />
                        <Skeleton className="h-3 w-full max-w-sm" />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>

                  {/* Separator Skeleton */}
                  <Skeleton className="h-px w-full" />

                  {/* Info Grid Skeleton */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {/* Application Date */}
                    <div className="space-y-2 sm:pl-4">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-5 w-32" />
                    </div>

                    {/* Scholarship Deadline */}
                    <div className="space-y-2 sm:border-l sm:pl-4">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-5 w-32" />
                    </div>

                    {/* Status */}
                    <div className="space-y-2 sm:border-l sm:pl-4">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                </div>
              ))
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.slice(0, 6).map((meow, index) => (
                <motion.div
                  key={meow.announcementId}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="bg-gradient-to-br dark:to-card/70 to-card/50 dark:from-card/50 from-card/30 rounded-lg overflow-hidden relative"
                >
                  {/* Header Section */}
                  {/* <img
                    className=" w-full object-cover "
                    src={meow.Scholarship.cover || "/placeholder.svg"}
                    alt=""
                  /> */}
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start lg:p-6 p-4">
                    <div className="flex  ">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* <Avatar className="size-10 flex-shrink-0">
                          <AvatarImage
                            className="object-cover"
                            src={meow.Scholarship.logo || "/placeholder.svg"}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar> */}
                        <div className="min-w-0 flex-1">
                          <div className="flex lg:gap-6 gap-4 flex-col lg:flex-row">
                            <h3 className="font-semibold text-base line-clamp-1">
                              {meow.title || "Unknown Provider"}
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                              {meow.tags.data.map((meow, index) => (
                                <Badge
                                  key={`${meow}-${index}`}
                                  className="bg-indigo-800 text-gray-200 text-xs"
                                >
                                  {meow}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p
                            className="line-clamp-2 text-sm leading-relaxed text-foreground/80 text-pretty w-[90%] mt-3  max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: meow.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Info Grid - Responsive */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-4 md:py-6 px-4 md:px-6 bg-card/50 relative z-10">
                    {/* Application Date */}
                    <div className="space-y-1.5 sm:pl-4 border-l hidden lg:block">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <h1 className="text-xs text-muted-foreground">
                          Published Date
                        </h1>
                      </div>
                      <p className="font-medium text-sm text-foreground">
                        {meow?.dateCreated &&
                          format(meow?.dateCreated, "yyyy/MM/dd")}
                      </p>
                    </div>

                    {/* Scholarship Deadline */}
                    <div className="space-y-1.5 sm:pl-4 border-l hidden lg:block">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <h1 className="text-xs text-muted-foreground">
                          Published Time
                        </h1>
                      </div>
                      <p className="font-medium text-sm text-foreground">
                        {meow?.dateCreated && format(meow?.dateCreated, "p")}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex justify-end  items-end col-span-2 lg:col-span-1">
                      <Button
                        className="w-full lg:w-auto"
                        size="sm"
                        onClick={() => {
                          setOpen(true);
                          setId(meow.announcementId);
                        }}
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-5xl lg:w-full w-[98%]  gap-0 p-1 border-0"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Announcement Details</DialogTitle>
            <DialogDescription>View and manage announcement</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between pb-2 sticky top">
            <div className="flex items-center gap-3">
              <Button
                className="relative justify-start"
                variant="ghost"
                size="sm"
              >
                <Megaphone />
                Announcement Details
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="ghost"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
          </div>

          {loading ? (
            <AnnouncementSkeleton />
          ) : (
            <div className="bg-background rounded-t-md ">
              <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-b-lg overflow-hidden ">
                {/* Header Section */}
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start lg:p-6 p-4">
                  <div className="flex  ">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* <Avatar className="size-10 flex-shrink-0">
                          <AvatarImage
                            className="object-cover"
                            src={meow.Scholarship.logo || "/placeholder.svg"}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar> */}
                      <div className="min-w-0 flex-1">
                        <div className="flex lg:gap-6 gap-4 flex-wrap">
                          <h3 className="font-semibold text-xl line-clamp-1">
                            {fullData?.title || "Unknown Title"}
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            {fullData?.tags.data.map((meow, index) => (
                              <Badge
                                key={`${meow}-${index}`}
                                className="bg-indigo-800 text-gray-200 text-xs"
                              >
                                {meow}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                {/* Info Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-4 md:py-6 px-4 md:px-6 bg-card/50 relative z-10">
                  {/* Application Date */}
                  <div className="space-y-1.5 pl-4 border-l ">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <h1 className="text-xs text-muted-foreground">
                        Published Date
                      </h1>
                    </div>
                    <p className="font-medium text-sm text-foreground">
                      {fullData?.dateCreated &&
                        format(fullData?.dateCreated, "yyyy/MM/dd")}
                    </p>
                  </div>

                  {/* Scholarship Deadline */}
                  <div className="space-y-1.5 pl-4 border-l ">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <h1 className="text-xs text-muted-foreground">
                        Published Time
                      </h1>
                    </div>
                    <p className="font-medium text-sm text-foreground">
                      {fullData?.dateCreated &&
                        format(fullData?.dateCreated, "p")}
                    </p>
                  </div>

                  {/* Status */}
                </div>
              </div>

              <TipTapViewer
                content={fullData?.description || ""}
                className="lg:p-6 p-4"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
function AnnouncementSkeleton() {
  return (
    <div className="space-y-0">
      {/* Header Section */}

      {/* Main Content Container */}
      <div className="bg-background rounded-t-md">
        <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-b-lg overflow-hidden">
          {/* Title and Tags Section */}
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start lg:p-6 p-4">
            <div className="flex w-full">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="flex lg:gap-6 gap-4 flex-wrap">
                    {/* Title Skeleton */}
                    <Skeleton className="h-7 w-64 sm:w-80" />
                    {/* Tags Skeleton */}
                    <div className="flex gap-2 flex-wrap">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Info Grid Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-4 md:py-6 px-4 md:px-6 bg-card/50 relative z-10">
            {/* Published Date */}
            <div className="space-y-1.5 pl-4 border-l border-border">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Published Time */}
            <div className="space-y-1.5 pl-4 border-l border-border">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Status (optional third column on lg) */}
            <div className="hidden lg:block space-y-1.5 sm:pl-4 border-l border-border">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Description Content Section */}
        <div className="lg:p-6 p-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="pt-2 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="pt-2 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
