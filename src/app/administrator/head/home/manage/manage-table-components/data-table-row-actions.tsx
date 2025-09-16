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

import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useEffect, useState } from "react";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import Link from "next/link";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Separator } from "@/components/ui/separator";
import { useAdminStore } from "@/store/adminUserStore";
import useArchiveScholarship from "@/hooks/admin/postSetArchivedScholarship";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  status: string;
}

export function DataTableRowActions<TData>({
  row,
  status,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as scholarshipFormData;

  const { admin } = useAdminStore();
  const { onSubmit, deleteLoading, openDelete, setOpenDelete } =
    useDeleteScholarship({
      scholarshipId: rowData.scholarshipId,
      accountId: admin?.accountId,
    });
  const {
    onSubmit: onSubmitArchive,
    openArchive,
    setOpenArchive,
    archiveLoading,
  } = useArchiveScholarship({
    scholarshipId: [rowData.scholarshipId],
    accountId: admin?.accountId.toString(),
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
        className="grid grid-cols-1 w-[180px] !p-0 border"
      >
        <Link
          href={`/administrator/head/home/manage/${rowData.scholarshipId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" variant="ghost" className="justify-start w-full">
            <Maximize /> View
          </Button>
        </Link>
        <Separator />
        {status === "ACTIVE" ? (
          <Link
            href={`/administrator/head/home/manage/${rowData.scholarshipId}?section=edit`}
            scroll={false}
            prefetch
            className="w-full"
          >
            <Button size="lg" className="justify-start w-full" variant="ghost">
              <PencilLine /> Edit
            </Button>
          </Link>
        ) : status === "ARCHIVED" ? (
          <Link
            href={`/administrator/head/home/manage/${rowData.scholarshipId}?section=redeploy`}
            scroll={false}
            prefetch
            className="w-full"
          >
            <Button size="lg" className="justify-start w-full" variant="ghost">
              <RefreshCcw /> Renewal
            </Button>
          </Link>
        ) : status === "EXPIRED" ? (
          <DeleteDialog
            open={openArchive}
            onOpenChange={setOpenArchive}
            onConfirm={onSubmitArchive}
            loading={archiveLoading}
            confirmText="Archive"
            red={false}
            confirmTextLoading="Please wait..."
            title="Archive Scholarship?"
            description="Are you sure you want to archive this scholarship?"
            cancelText="Keep"
            trigger={
              <Button size="lg" variant="ghost" className="justify-start ">
                <Archive /> Archive
              </Button>
            }
          />
        ) : (
          ""
        )}
        <Separator />

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
              size="lg"
              variant="ghost"
              className="justify-start text-red-700 hover:text-red-600"
            >
              <Trash2 /> Delete
            </Button>
          }
        />
      </PopoverContent>
    </Popover>
  );
}
