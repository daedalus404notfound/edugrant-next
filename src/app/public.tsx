"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { AnimatePresence, motion } from "motion/react";
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
  ArrowRightIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Megaphone,
  SearchIcon,
  X,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import NoDataFound from "@/components/ui/nodata";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TitleReusable from "@/components/ui/title";
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
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PublicAnnouncement({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [full, setFull] = useState(false);

  const [announce, setAnnounce] = useState<AnnouncementFormDataGet>({
    title: "",
    description: "",
    tags: { data: [] },
    announcementId: 0,
    dateCreated: new Date(), // ✅ correct
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const router = useRouter();
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

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

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { query, meta } = useAnnouncementFetcPublic({
    pagination,
    sorting,
    columnFilters,
    search,
  });
  const loadingState = query.isLoading;
  const data = query.data?.announcements ?? [];
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-[98%] max-w-4xl mx-auto">
        <DrawerHeader className="hidden">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="flex items-center justify-between pb-2 sticky top "
        >
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start "
              variant="ghost"
              size="sm"
            >
              <Megaphone />
              Announcements
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
        </motion.div>
        <div className="flex  flex-col gap-3 bg-background lg:p-4 p-2 rounded-md">
          {loadingState ? (
            <>
              {[...Array(3)].map((_, i) => (
                <AnnouncementSkeleton key={i} />
              ))}
            </>
          ) : data.length === 0 ? (
            <NoDataFound />
          ) : (
            data.map((meow, index) => (
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
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start lg:p-6 p-4">
                  <div className="flex  ">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
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
                        setFull(true);
                        setAnnounce(meow);
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

        <DrawerFooter>
          {meta.totalRows > 2 && !full && (
            <motion.div
              className="flex items-center justify-between gap-3 "
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

//  <Dialog open={open} onOpenChange={setOpen}>
//    <DialogContent
//      showCloseButton={false}
//      className="max-w-4xl border-0 rounded-lg gap-0  p-1"
//    >
//      <motion.div
//        initial={{ opacity: 0, y: 20 }}
//        animate={{ opacity: 1, y: 0 }}
//        transition={{ duration: 0.2, delay: 0.4 }}
//        className="flex items-center justify-between pb-2 sticky top "
//      >
//        <div className="flex items-center gap-3">
//          <Button className="relative justify-start " variant="ghost" size="sm">
//            <Megaphone />
//            Announcements
//          </Button>
//        </div>
//        <div className="flex items-center gap-2">
//          <Button
//            className="ghost"
//            variant="ghost"
//            size="sm"
//            onClick={() => setOpen(false)}
//          >
//            <X />
//          </Button>
//        </div>
//      </motion.div>

//      <DialogHeader className="sr-only">
//        <DialogTitle className=" font-semibold">Announcements</DialogTitle>
//      </DialogHeader>

//      <ScrollArea className="max-h-[80dvh] lg:p-4 p-2 bg-background/80 lg:rounded-lg rounded-md  ">
//        {full ? (
//          <div className="">
//            <div className="flex justify-between items-center">
//              <Button
//                onClick={() => {
//                  setFull(false);
//                  setAnnounce({
//                    title: "",
//                    description: "",
//                    tags: { data: [] },
//                    announcementId: 0,
//                    dateCreated: new Date(),
//                  });
//                }}
//                variant="ghost"
//              >
//                <ArrowLeft />
//                Back
//              </Button>
//              {/* <p className="text-sm text-muted-foreground ">
//                   Published:{" "}
//                   {announce.dateCreated &&
//                     format(announce.dateCreated, "PPP p")}
//                 </p> */}
//            </div>

//            <TipTapViewer
//              content={announce?.description}
//              className="lg:p-4 p-2"
//            />
//          </div>
//        ) : (
//          <div className="flex  flex-col gap-3">
//            {loadingState ? (
//              <>
//                {[...Array(3)].map((_, i) => (
//                  <AnnouncementSkeleton key={i} />
//                ))}
//              </>
//            ) : data.length === 0 ? (
//              <NoDataFound />
//            ) : (
//              data.map((meow, index) => (
//                <motion.div
//                  key={meow.announcementId}
//                  initial={{ y: 50, opacity: 0 }}
//                  animate={{ y: 0, opacity: 1 }}
//                  transition={{
//                    duration: 0.2,
//                    delay: index * 0.1,
//                    ease: "easeOut",
//                  }}
//                  className="bg-gradient-to-br dark:to-card/70 to-card/50 dark:from-card/50 from-card/30 rounded-lg overflow-hidden relative"
//                >
//                  {/* Header Section */}
//                  {/* <img
//                     className=" w-full object-cover "
//                     src={meow.Scholarship.cover || "/placeholder.svg"}
//                     alt=""
//                   /> */}
//                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start lg:p-6 p-4">
//                    <div className="flex  ">
//                      <div className="flex items-center gap-3 flex-1 min-w-0">
//                        {/* <Avatar className="size-10 flex-shrink-0">
//                           <AvatarImage
//                             className="object-cover"
//                             src={meow.Scholarship.logo || "/placeholder.svg"}
//                           />
//                           <AvatarFallback>CN</AvatarFallback>
//                         </Avatar> */}
//                        <div className="min-w-0 flex-1">
//                          <div className="flex lg:gap-6 gap-4 flex-col lg:flex-row">
//                            <h3 className="font-semibold text-base line-clamp-1">
//                              {meow.title || "Unknown Provider"}
//                            </h3>
//                            <div className="flex gap-2 flex-wrap">
//                              {meow.tags.data.map((meow, index) => (
//                                <Badge
//                                  key={`${meow}-${index}`}
//                                  className="bg-indigo-800 text-gray-200 text-xs"
//                                >
//                                  {meow}
//                                </Badge>
//                              ))}
//                            </div>
//                          </div>
//                          <p
//                            className="line-clamp-2 text-sm leading-relaxed text-foreground/80 text-pretty w-[90%] mt-3  max-w-none"
//                            dangerouslySetInnerHTML={{
//                              __html: meow.description,
//                            }}
//                          />
//                        </div>
//                      </div>
//                    </div>
//                  </div>
//                  <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

//                  {/* Info Grid - Responsive */}
//                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-4 md:py-6 px-4 md:px-6 bg-card/50 relative z-10">
//                    {/* Application Date */}
//                    <div className="space-y-1.5 sm:pl-4 border-l hidden lg:block">
//                      <div className="flex items-center gap-2">
//                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
//                        <h1 className="text-xs text-muted-foreground">
//                          Published Date
//                        </h1>
//                      </div>
//                      <p className="font-medium text-sm text-foreground">
//                        {meow?.dateCreated &&
//                          format(meow?.dateCreated, "yyyy/MM/dd")}
//                      </p>
//                    </div>

//                    {/* Scholarship Deadline */}
//                    <div className="space-y-1.5 sm:pl-4 border-l hidden lg:block">
//                      <div className="flex items-center gap-2">
//                        <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
//                        <h1 className="text-xs text-muted-foreground">
//                          Published Time
//                        </h1>
//                      </div>
//                      <p className="font-medium text-sm text-foreground">
//                        {meow?.dateCreated && format(meow?.dateCreated, "p")}
//                      </p>
//                    </div>

//                    {/* Status */}
//                    <div className="flex justify-end  items-end col-span-2 lg:col-span-1">
//                      <Button
//                        className="w-full lg:w-auto"
//                        size="sm"
//                        onClick={() => {
//                          setFull(true);
//                          setAnnounce(meow);
//                        }}
//                      >
//                        View Details <ArrowRight className="w-4 h-4" />
//                      </Button>
//                    </div>
//                  </div>
//                </motion.div>
//              ))
//            )}
//          </div>
//        )}
//      </ScrollArea>
//      {meta.totalRows > 3 && !full && (
//        <motion.div
//          className="flex items-center justify-between gap-3 p-2"
//          initial={{ opacity: 0, y: -20 }}
//          animate={{ opacity: 1, y: 0 }}
//          transition={{ duration: 0.2, delay: 0.4 }}
//        >
//          <p className="grow text-sm text-muted-foreground" aria-live="polite">
//            Page <span className="text-foreground">{meta.page}</span> of{" "}
//            <span className="text-foreground">{meta.totalPage}</span>
//          </p>

//          <Pagination className="w-auto">
//            <PaginationContent className="gap-3">
//              <PaginationItem>
//                <Button
//                  variant="outline"
//                  disabled={meta.page === 1 || loadingState}
//                  onClick={handlePrev}
//                >
//                  <ChevronLeft /> Previous
//                </Button>
//              </PaginationItem>
//              <PaginationItem>
//                <Button
//                  variant="outline"
//                  disabled={
//                    meta.page === meta.totalPage ||
//                    meta.totalPage === 0 ||
//                    loadingState
//                  }
//                  onClick={handleNext}
//                >
//                  Next
//                  <ChevronRight />
//                </Button>
//              </PaginationItem>
//            </PaginationContent>
//          </Pagination>
//        </motion.div>
//      )}
//    </DialogContent>
//  </Dialog>;
