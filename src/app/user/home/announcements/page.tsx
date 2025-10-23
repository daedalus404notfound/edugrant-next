"use client";

import {
  Megaphone,
  ArrowRight,
  Calendar,
  SearchIcon,
  ArrowRightIcon,
  X,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
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
export default function AdminAnnouncement() {
  const { meta, page, setOrder, order, search, setSearch, setPage } =
    useAnnouncementUserStore();
  const [id, setId] = useState(0);
  const { fullData, loading, refetch } = useGetAnnouncementByIdUser(id);
  const { data, isLoading } = useAnnouncementFetchUser();
  const [open, setOpen] = useState(false);

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
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <div className="pb-6 border-b">
          <TitleReusable
            title="Announcements"
            description="Here's what's new! Stay tuned for the latest updates."
            Icon={Megaphone}
          />
        </div>
        <div className="mt-15 lg:w-[80%] md:min-w-5xl w-full mx-auto space-y-3">
          <div className="flex justify-between">
            <div className="relative max-w-lg w-full">
              <Input
                placeholder="Search announcement..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full peer ps-9 pe-9"
                type="search"
              />

              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} />
              </button>
            </div>
            <Select value={order} onValueChange={(value) => setOrder(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <AnnouncementSkeleton key={i} />
                ))}
              </>
            ) : data.length === 0 ? (
              <NoDataFound />
            ) : (
              data.slice(0, 6).map((item) => (
                <div
                  key={item.announcementId}
                  onClick={() => {
                    setId(item.announcementId);

                    setOpen(true);
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
                        {item.dateCreated && format(item.dateCreated, "PPP p")}
                      </time>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

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
                    disabled={page === meta.totalPage || meta.totalPage === 0}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-5xl overflow-hidden  gap-0 p-1 border-0"
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
              <Button className="ghost" variant="ghost" size="sm">
                <X />
              </Button>
            </div>
          </div>

          <div className="bg-background rounded-t-md max-h-[90vh]  overflow-auto">
            <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30  rounded-b-lg overflow-hidden ">
              {/* Header Section */}
              <div className="relative flex lg:flex-row flex-col lg:items-end items-center  py-8 px-4">
                <img
                  className="lg:w-70 w-50 absolute right-0 -translate-y-[40%] top-[60%] z-0 mask-gradient opacity-15 "
                  src={logo.src}
                  alt=""
                />
                <div className="flex-1 px-4 py-2 z-10 space-y-3">
                  <h1 className="text-base lg:text-xl font-medium text-foreground capitalize line-clamp-1">
                    {fullData?.title}
                  </h1>

                  {/* <p className="font-medium font-mono text-base tracking-wide">
                        {fullData?.Scholarship_Provider.name}
                      </p>{" "} */}
                  <div>
                    {fullData?.tags?.data && fullData.tags.data.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {fullData.tags.data.map((tag, i) => (
                          <Badge key={i} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              {/* Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 px-4 bg-card relative z-10">
                <div className="space-y-1.5 border-l-2 pl-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <h1 className="text-xs text-muted-foreground">
                      Published Date
                    </h1>
                  </div>

                  <p className="font-medium text-foreground">
                    {fullData?.dateCreated &&
                      format(fullData.dateCreated, "PPP")}
                  </p>
                </div>{" "}
                <div className="space-y-1.5  border-l-2 pl-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <h1 className="text-xs text-muted-foreground">
                      Published Time
                    </h1>
                  </div>

                  <span className="font-medium text-foreground">
                    {fullData?.dateCreated && format(fullData.dateCreated, "p")}
                  </span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-3/4 rounded-lg" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-48 rounded-lg" />
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-32 rounded-lg" />
                  </div>
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-28 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                  </div>

                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Skeleton className="h-9 flex-1" />{" "}
                  <Skeleton className="h-9 flex-1" />
                </div>
              </div>
            ) : (
              <TipTapViewer
                content={fullData?.description || ""}
                className="p-6"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
