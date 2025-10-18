"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export default function PublicAnnouncement() {
  const [open, setOpen] = useState(true);
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
  const { data, loading, meta } = useAnnouncementFetcPublic({
    page,
    pageSize,
  });
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
    <Dialog
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DialogContent className="max-w-4xl border-0 rounded-lg gap-0  p-1">
        <div className="flex items-center justify-between pb-2 sticky top ">
          <div className="flex items-center gap-3">
            <Button
              className="relative justify-start"
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
              onClick={() => HandleCloseDrawer(false)}
            >
              <X />
            </Button>
          </div>
        </div>
        <div className=" bg-background p-4 rounded-md space-y-6 ">
          <DialogHeader className="sr-only">
            <DialogTitle className=" font-semibold">Announcements</DialogTitle>
          </DialogHeader>

          {full ? (
            <div className="">
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    setFull(false);
                    setAnnounce({
                      title: "",
                      description: "",
                      tags: { data: [] },
                      announcementId: 0,
                      dateCreated: new Date(),
                    });
                  }}
                >
                  <ArrowLeft />
                  Back
                </Button>
                <p className="text-sm text-muted-foreground ">
                  Published:{" "}
                  {announce.dateCreated &&
                    format(announce.dateCreated, "PPP p")}
                </p>
              </div>

              <TipTapViewer content={announce?.description} className="p-6" />
            </div>
          ) : (
            <div className="flex  flex-col gap-3">
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
                  <div
                    key={item.announcementId}
                    onClick={() => {
                      setFull(true);
                      setAnnounce({
                        title: item.title,
                        description: item.description,
                        tags: item.tags,
                        announcementId: item.announcementId,
                        dateCreated: item.dateCreated,
                      });
                    }}
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
                          {item.dateCreated &&
                            format(item.dateCreated, "PPP p")}
                        </time>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {!full && (
            <DialogFooter>
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
                        disabled={
                          page === meta.totalPage || meta.totalPage === 0
                        }
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
