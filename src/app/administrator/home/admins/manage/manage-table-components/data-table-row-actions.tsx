"use client";

import { Row } from "@tanstack/react-table";
import {
  Loader,
  Logs,
  Maximize,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { AdminProfileTypes } from "@/hooks/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import useDeleteAdmin from "@/hooks/admin/postDeleteAdmin";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as AdminProfileTypes;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteAdmin({
    adminId: [rowData.adminId],
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
      <PopoverContent align="end" className="grid grid-cols-1 w-[180px] !p-0">
        <Link
          href={`/administrator/home/admins/manage/${rowData.adminId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button variant="outline" className="justify-start w-full">
            <Logs /> View Logs
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
