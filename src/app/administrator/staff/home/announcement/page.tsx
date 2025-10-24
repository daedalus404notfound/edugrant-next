"use client";

import {
  Megaphone,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Bell,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useApplicationUIStore } from "@/store/updateUIStore";
import NoDataFound from "@/components/ui/nodata";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useAnnouncementDataAdmin from "@/hooks/admin/getAnnouncement";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetAnnouncementByIdAdmin from "@/hooks/admin/getAnnouncementById";
import { Separator } from "@/components/ui/separator";
import { TipTapViewer } from "@/components/ui/tiptap-viewer";
import { Badge } from "@/components/ui/badge";
import TitleReusable from "@/components/ui/title";

export default function AdminAnnouncement() {
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

  const [search, setSearch] = useState("");

  const { query, meta } = useAnnouncementDataAdmin({
    pagination,
    sorting,
    columnFilters,
    search,
  });

  const [id, setId] = useState<null | number>(null);
  const [open, setOpen] = useState(false);
  const { fullData, loading, refetch } = useGetAnnouncementByIdAdmin(id);
  const { deletedAnnouncementIds } = useApplicationUIStore();

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

  const isLoading = query.isLoading;
  const data = query.data?.announcements ?? [];

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [sorting, search, columnFilters]);

  const AnnouncementSkeleton = () => (
    <div className="flex gap-6 pb-8">
      <div className="flex-shrink-0 w-24">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-2/3 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
      </div>
    </div>
  );

  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        {" "}
        <motion.div
          className="flex justify-between items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          <TitleReusable
            title="Announcements"
            description="View the list of scholarships currently open for application."
            Icon={Bell}
          />
        </motion.div>{" "}
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent mt-6" />
        <div className="lg:mt-15 mt-10 lg:w-[80%] md:min-w-5xl w-full mx-auto lg:space-y-8 space-y-6">
          <div className=" space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 bg-card/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <Select
                value={sorting[0]?.desc ? "desc" : "asc"}
                onValueChange={(e) =>
                  setSorting([{ id: "dateCreated", desc: e === "desc" }])
                }
              >
                <SelectTrigger className="w-full lg:w-40 bg-card/50 border-border/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-0">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <AnnouncementSkeleton key={i} />
                ))}
              </>
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="space-y-4">
                {data.slice(0, 6).map((item, index) => (
                  <div
                    key={item.announcementId}
                    className="flex gap-6 pb-8 relative p-5 bg-card rounded-lg "
                  >
                    {/* Announcement Card */}
                    <div
                      onClick={() => {
                        setId(item.announcementId);
                        setOpen(true);
                      }}
                      className="flex-1"
                    >
                      <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-base font-semibold  text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 jakarta tracking-wide">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </p>

                        {/* Tags */}
                        {item.tags.data.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.tags.data.slice(0, 2).map((tag, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {item.tags.data.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.tags.data.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className=" font-semibold havelock  uppercase tracking-tighter">
                        {item.dateCreated && format(item.dateCreated, "MMM dd")}
                      </div>
                      <div className="text-sm  mt-1">
                        {item.dateCreated && format(item.dateCreated, "yyyy")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                    disabled={meta.page === 1 || isLoading}
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
                      isLoading
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

      {/* Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl  gap-0 p-0 border-0"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Announcement Details</DialogTitle>
            <DialogDescription>View announcement details</DialogDescription>
          </DialogHeader>

          {/* Modal Header */}

          {/* Modal Content */}
          <div className=" bg-card">
            {/* Header Section */}
            <div className="border-b border-border/50 bg-gradient-to-br from-card/50 to-card/30 p-6 rounded-b-lg">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight text-foreground line-clamp-2">
                  {fullData?.title}
                </h1>

                {/* Tags */}
                {fullData?.tags?.data && fullData.tags.data.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-sm">
                    {fullData.tags.data.map((tag, i) => (
                      <span className="" key={i}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      Published Date
                    </div>
                    <p className="font-medium text-foreground">
                      {fullData?.dateCreated &&
                        format(fullData.dateCreated, "PPP")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      Published Time
                    </div>
                    <p className="font-medium text-foreground">
                      {fullData?.dateCreated &&
                        format(fullData.dateCreated, "p")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <div className="p-6 space-y-6 lg:p-8">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-3/4 rounded-lg" />
                  <Skeleton className="h-5 w-full rounded-lg" />
                  <Skeleton className="h-5 w-5/6 rounded-lg" />
                </div>
                <Separator className="bg-border/40" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                </div>
              </div>
            ) : (
              <TipTapViewer
                content={fullData?.description || ""}
                className="p-6 lg:p-8"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
