"use client";

import { Row } from "@tanstack/react-table";
import {
  Copy,
  Maximize,
  MoreHorizontal,
  PencilLine,
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
      <PopoverContent align="end" className="grid grid-cols-1 w-[180px] !p-2">
        <Link
          href={`/administrator/home/scholarships/manage/${rowData.scholarshipId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button variant="ghost" className="justify-start w-full">
            <Maximize /> View
          </Button>
        </Link>

        <Link
          href={`/administrator/home/scholarships/manage/${rowData.scholarshipId}?edit=true`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button className="justify-start w-full" variant="ghost">
            <PencilLine /> Edit
          </Button>
        </Link>
        <Button className="justify-start" variant="ghost">
          <Copy /> Copy row
        </Button>
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
            <Button size="sm" variant="ghost" className="justify-start">
              <Trash2 /> Delete
            </Button>
          }
        />
      </PopoverContent>
    </Popover>
  );
}
