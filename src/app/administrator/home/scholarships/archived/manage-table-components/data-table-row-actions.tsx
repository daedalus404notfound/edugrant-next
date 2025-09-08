"use client";

import { Row } from "@tanstack/react-table";
import {
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

import { ScholarshipTypes } from "@/hooks/types";
import { useEffect, useState } from "react";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import Link from "next/link";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Separator } from "@/components/ui/separator";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as ScholarshipTypes;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, deleteLoading } = useDeleteScholarship({
    scholarshipId: [rowData.scholarshipId],
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenAlert(false);
    }
  }, [isSuccess]);

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
          href={`/administrator/home/scholarships/manage/${rowData.scholarshipId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" variant="ghost" className="justify-start w-full">
            <Maximize /> View
          </Button>
        </Link>
        <Separator />
        <Link
          href={`/administrator/home/scholarships/manage/${rowData.scholarshipId}?section=redeploy`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" className="justify-start w-full" variant="ghost">
            <RefreshCcw /> Redeploy
          </Button>
        </Link>
        <Separator />

        <div />

        <DeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
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
