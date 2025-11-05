"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { motion } from "motion/react";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import useAnnouncementFetcPublic from "@/hooks/admin/getAnnouncementPublic";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Megaphone,
  X,
} from "lucide-react";
import { format } from "date-fns";
import NoDataFound from "@/components/ui/nodata";
import { Skeleton } from "@/components/ui/skeleton";
import { AnnouncementFormDataGet } from "@/hooks/zod/announcement";
import { TipTapViewer } from "@/components/ui/tiptap-viewer";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ModalHeader from "@/components/ui/modal-header";
import { ScrollArea } from "@/components/ui/scroll-area";

const INITIAL_ANNOUNCEMENT: AnnouncementFormDataGet = {
  title: "",
  description: "",
  tags: { data: [] },
  announcementId: 0,
  dateCreated: new Date(),
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

export default function PublicAnnouncement({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [full, setFull] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementFormDataGet>(INITIAL_ANNOUNCEMENT);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });

  const [sorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);

  const [columnFilters] = useState<ColumnFiltersState>([]);

  const { query, meta } = useAnnouncementFetcPublic({
    pagination,
    sorting,
    columnFilters,
    search,
  });

  const data = query.data?.announcements ?? [];
  const isLoading = query.isLoading;

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

  const handleBackToList = () => {
    setFull(false);
    setSelectedAnnouncement(INITIAL_ANNOUNCEMENT);
  };

  const handleViewDetails = (announcement: AnnouncementFormDataGet) => {
    setFull(true);
    setSelectedAnnouncement(announcement);
  };
  useEffect(() => {
    if (!open) {
      // Reset when drawer closes
      handleBackToList();
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-[98%] max-w-4xl mx-auto border-0 p-1 lg:p-2 bg-background outline-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Announcements</DrawerTitle>
          <DrawerDescription>View all public announcements</DrawerDescription>
        </DrawerHeader>
        <ModalHeader text="Announcements" HandleCloseDrawer={setOpen} />
        {full ? (
          <ScrollArea className=" max-h-[70dvh] h-full">
            <div className="bg-card p-4 rounded-md">
              <TipTapViewer content={selectedAnnouncement?.description} />
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <AnnouncementSkeleton key={i} />
                ))}
              </>
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.map((announcement, index) => (
                <div
                  key={announcement.announcementId}
                  onClick={() => handleViewDetails(announcement)}
                  className="bg-gradient-to-br dark:to-card/70 to-card/50 dark:from-card/50 from-card/30 overflow-hidden relative shadow rounded-md cursor-pointer group hover:bg-card transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="line-clamp-2 group-hover:text-green-700  transition-all duration-200">
                        {announcement.title || "Untitled Announcement"}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        {announcement.tags.data
                          .slice(0, 1)
                          .map((tag, tagIndex) => (
                            <Badge
                              key={`${tag}-${tagIndex}`}
                              className="bg-green-700/20 text-green-600"
                            >
                              {tag}
                            </Badge>
                          ))}

                        {/* On mobile: show +count */}
                        {announcement.tags.data.length > 1 && (
                          <Badge className="bg-muted text-muted-foreground sm:hidden">
                            +{announcement.tags.data.length - 1}
                          </Badge>
                        )}

                        {/* On desktop: show all tags */}
                        <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                          {announcement.tags.data.map((tag, tagIndex) => (
                            <Badge
                              key={`desktop-${tag}-${tagIndex}`}
                              className="bg-green-700/20 text-green-600"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="line-clamp-2 text-sm text-muted-foreground mt-3"
                      // sanitize before inserting to avoid XSS:
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          announcement.description || ""
                        ),
                      }}
                    />
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

                  <div className="lg:grid grid-cols-2 lg:grid-cols-3 bg-card/50 relative z-10 p-2 hidden">
                    <div className="space-y-1.5 pl-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <h4 className="text-xs text-muted-foreground">
                          Published Date
                        </h4>
                      </div>
                      <p className="font-medium text-sm text-foreground">
                        {announcement?.dateCreated &&
                          format(announcement.dateCreated, "yyyy/MM/dd")}
                      </p>
                    </div>

                    <div className="space-y-1.5 pl-4 border-l ">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <h4 className="text-xs text-muted-foreground">
                          Published Time
                        </h4>
                      </div>
                      <p className="font-medium text-sm text-foreground">
                        {announcement?.dateCreated &&
                          format(announcement.dateCreated, "p")}
                      </p>
                    </div>

                    {/* <div className="flex justify-end items-end col-span-2 lg:col-span-1">
                      <Button
                        className="w-full lg:w-auto"
                        size="sm"
                        onClick={() => handleViewDetails(announcement)}
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div> */}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <DrawerFooter className="px-0">
          {meta.totalRows > 3 && !full && (
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
                      size="sm"
                      variant="outline"
                      disabled={meta.page === 1 || isLoading}
                      onClick={handlePrev}
                    >
                      <ChevronLeft /> Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      size="sm"
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
            </div>
          )}
          {full && (
            <Button size="sm" onClick={handleBackToList} variant="secondary">
              <ArrowLeft />
              Back
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
