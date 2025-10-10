"use client";

import { Row } from "@tanstack/react-table";
import {
  Copy,
  Maximize,
  MoreHorizontal,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { ApplicationFormData } from "@/hooks/zod/application";
import { useEffect, useState } from "react";
import Link from "next/link";
import useDeleteApplication from "@/hooks/admin/postDeleteApplications";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Separator } from "@/components/ui/separator";
import StyledToast from "@/components/ui/toast-styled";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as ApplicationFormData;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteApplication({
    applicationId: [rowData.applicationId],
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
          href={`/administrator/head/home/application/${rowData.applicationId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button variant="ghost" size="lg" className="justify-start w-full">
            <SquareArrowOutUpRight />
            Open
          </Button>
        </Link>

        <Separator />

        {/* <DeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
          onConfirm={onSubmit}
          loading={loading}
          title="Delete application?"
          description="This will permanently delete application and cannot be undone."
          confirmText="Delete All"
          cancelText="Keep Items"
          trigger={
            <Button
              size="lg"
              variant="ghost"
              className="justify-start text-red-600 hover:text-red-500"
            >
              <Trash2 /> Delete
            </Button>
          }
        /> */}
      </PopoverContent>
    </Popover>
  );
}
