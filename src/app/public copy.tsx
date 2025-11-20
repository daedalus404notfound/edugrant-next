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
        {/* <ModalHeader text="Announcements" HandleCloseDrawer={setOpen} /> */}

        <ScrollArea className=" max-h-[70dvh] h-full">
          <div className="bg-card/30 p-4 rounded-md">
            <TipTapViewer content={selectedAnnouncement?.description} />
          </div>
        </ScrollArea>

        <DrawerFooter className="px-0">
          {full && (
            <Button size="sm" onClick={handleBackToList}>
              <ArrowLeft />
              Back
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
