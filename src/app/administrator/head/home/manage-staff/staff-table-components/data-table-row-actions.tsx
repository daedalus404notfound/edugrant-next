"use client";

import { Row } from "@tanstack/react-table";
import { ExternalLink, MoreHorizontal, View } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { StaffFormData } from "@/hooks/head/zodHeadProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
import useDeleteAdmin from "@/hooks/admin/postDeleteAdmin";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as StaffFormData;
  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteAdmin({
    adminId: [rowData.staffId],
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
      <PopoverContent align="end" className="p-0 w-[150px]">
        <Link
          href={`/administrator/head/home/manage-staff/${rowData.staffId}`}
          scroll={false}
          prefetch
        >
          <Button variant="secondary" className="justify-start w-full">
            View <ExternalLink />
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
