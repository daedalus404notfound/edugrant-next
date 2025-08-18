"use client";

import { Row } from "@tanstack/react-table";
import {
  Copy,
  Loader,
  Maximize,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
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

import { ScholarshipTypes } from "@/hooks/types";
import { useEffect, useState } from "react";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const rowData = row.original as ScholarshipTypes;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteScholarship({
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

        <Button className="justify-start" variant="ghost">
          <PencilLine /> Edit
        </Button>
        <Button className="justify-start" variant="ghost">
          <Copy /> Copy row
        </Button>
        <div />
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className=" text-red-600  justify-start"
            >
              <Trash2 /> Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-00">
                Delete selected scholarship?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The scholarship will be
                permanently removed from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={loading}
                onClick={onSubmit}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
}
