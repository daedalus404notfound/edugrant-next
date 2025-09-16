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

import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useEffect, useState } from "react";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import Link from "next/link";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Separator } from "@/components/ui/separator";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  status: string;
}

export function DataTableRowActions<TData>({
  row,
  status,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as scholarshipFormData;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, deleteLoading } = useDeleteScholarship({
    scholarshipId: rowData.scholarshipId,
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
          href={`/administrator/staff/home/scholarship/${rowData.scholarshipId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" variant="ghost" className="justify-start w-full">
            <Maximize /> View
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
