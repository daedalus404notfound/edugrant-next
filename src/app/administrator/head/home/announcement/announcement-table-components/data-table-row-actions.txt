"use client";

import { Row } from "@tanstack/react-table";
import {
  Archive,
  Copy,
  Maximize,
  MoreHorizontal,
  PencilLine,
  RefreshCcw,
  Trash2,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useAdminStore } from "@/store/adminUserStore";
import useArchiveScholarship from "@/hooks/admin/postSetArchivedScholarship";
import { useModeStore } from "@/store/scholarshipModalStore";
import { AnnouncementFormDataGet } from "@/hooks/zod/announcement";
import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnouncement";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  status: string;
}

export function DataTableRowActions<TData>({
  row,
  status,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as AnnouncementFormDataGet;
  const { admin } = useAdminStore();
  const { onSubmit, deleteLoading, openDelete, setOpenDelete, isSuccess } =
    useDeleteAnnouncement({
      id: rowData.announcementId,
      accountId: admin?.accountId,
    });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="justify-start" variant="ghost">
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="grid grid-cols-1 gap-0.5 w-[180px] !p-0 !border-0 bg-background"
      >
        <Link
          href={`/administrator/head/home/announcement/${rowData.announcementId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" variant="green" className="justify-start w-full">
            <Maximize /> View
          </Button>
        </Link>

        <Link
          href={`/administrator/head/home/announcement/${rowData.announcementId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" className="justify-start w-full" variant="blue">
            <PencilLine /> Edit
          </Button>
        </Link>

        <DeleteDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          onConfirm={onSubmit}
          loading={deleteLoading}
          title="Delete Scholarship?"
          description="Are you sure you want to delete this scholarship?"
          cancelText="Keep"
          trigger={
            <Button
              onClick={() => setOpenDelete(true)}
              size="lg"
              variant="red"
              className="justify-start"
            >
              <Trash2 /> Delete
            </Button>
          }
        />
      </PopoverContent>
    </Popover>
  );
}
