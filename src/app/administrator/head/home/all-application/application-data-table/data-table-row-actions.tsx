"use client";

import { Row } from "@tanstack/react-table";
import { Maximize, MoreHorizontal, Trash2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import useDeleteApplication from "@/hooks/admin/postDeleteApplications";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { StudentUserFormData } from "@/hooks/user/zodUserProfile";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as StudentUserFormData;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteApplication({
    applicationId: [rowData.studentId],
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenAlert(false);
    }
  }, [isSuccess]);

  // ✅ Copy full row data to clipboard
  const handleCopyRow = () => {
    navigator.clipboard.writeText(JSON.stringify(rowData, null, 2));
  };

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
          href={`/administrator/head/home/all-application/${rowData.studentId}`}
        >
          <Button
            variant="ghost"
            size="lg"
            className="justify-start w-full"
            onClick={handleCopyRow}
          >
            <Maximize />
            View
          </Button>
        </Link>

        {/* <DeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
          onConfirm={onSubmit}
          loading={loading}
          title="Delete Account?"
          description="This will permanently delete application and cannot be undone."
          confirmText="Delete"
          cancelText="Keep Account"
          trigger={
            <Button
              onClick={() => setOpenAlert(true)}
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
