"use client";

import { Row } from "@tanstack/react-table";
import {
  Archive,
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
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import Link from "next/link";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { useAdminStore } from "@/store/adminUserStore";
import useArchiveScholarship from "@/hooks/admin/postSetArchivedScholarship";
import { useModeStore } from "@/store/scholarshipModalStore";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  status: string;
}

export function DataTableRowActions<TData>({
  row,
  status,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as scholarshipFormData;
  const { mode, setMode, resetMode } = useModeStore();
  const { admin } = useAdminStore();

  const {
    onSubmit: onSubmitArchive,
    openArchive,
    setOpenArchive,
    archiveLoading,
  } = useArchiveScholarship({
    scholarshipId: rowData.scholarshipId,
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
          href={`/administrator/head/home/manage/${rowData.scholarshipId}`}
          scroll={false}
          prefetch
          className="w-full"
        >
          <Button size="lg" variant="green" className="justify-start w-full">
            <Maximize /> View
          </Button>
        </Link>

        {status === "ACTIVE" || status === "RENEW" ? (
          <Link
            href={`/administrator/head/home/manage/${rowData.scholarshipId}`}
            scroll={false}
            prefetch
            className="w-full"
            onClick={() => setMode("edit")}
          >
            <Button size="lg" className="justify-start w-full" variant="blue">
              <PencilLine /> Edit
            </Button>
          </Link>
        ) : status === "EXPIRED" ? (
          <>
            <Link
              href={`/administrator/head/home/manage/${rowData.scholarshipId}`}
              scroll={false}
              prefetch
              className="w-full"
              onClick={() => setMode("renewal")}
            >
              <Button
                size="lg"
                className="justify-start w-full"
                variant="indigo"
              >
                <RefreshCcw /> Renewal
              </Button>
            </Link>

            <DeleteDialog
              open={openArchive}
              onOpenChange={setOpenArchive}
              onConfirm={onSubmitArchive}
              loading={archiveLoading}
              confirmText="Complete"
              red={false}
              confirmTextLoading="Please wait..."
              title="End Scholarship"
              description="Are you sure you want to end this scholarship?"
              cancelText="Keep"
              trigger={
                <Button
                  onClick={() => setOpenArchive(true)}
                  size="lg"
                  variant="yellow"
                  className="justify-start "
                >
                  <Archive /> End
                </Button>
              }
            />
          </>
        ) : (
          ""
        )}
      </PopoverContent>
    </Popover>
  );
}
