"use client";

import { Table } from "@tanstack/react-table";
import { Loader, Plus, Trash2, X } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "../../../../table-components/data-table-view-options";

import Link from "next/link";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/vercel-tabs";
import useScholarshipData from "@/hooks/admin/getScholarship";
import ExportScholarshipDialog from "@/components/ui/export";
import { format } from "date-fns";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  getRowId?: (row: TData) => string | number;
  search?: string;
  setSearch?: (search: string) => void;
  status?: string;
  setStatus?: (status: string) => void;
}

export default function DataTableToolbar<TData>({
  table,
  getRowId,
  status,
  setStatus,
}: // search,
// setSearch,
DataTableToolbarProps<TData>) {
  const { filter } = useGetFilter({});
  const isFiltered = table.getState().columnFilters.length > 0;
  // const amountOptions =
  //   filter?.Scholarships.scholarshipAmount?.map((meow) => ({
  //     value: String(meow),
  //     label: String(meow),
  //   })) || [];

  // const providerOptions =
  //   filter?.Scholarships.scholarshipProvider?.map((meow) => ({
  //     value: meow,
  //     label: meow,
  //   })) || [];
  console.log(filter);
  const tabs = [
    { id: "ARCHIVED", label: "Archived", indicator: "" },
    { id: "EXPIRED", label: "Expired", indicator: "" },
  ];
  const selectedRows = table.getSelectedRowModel().rows;
  const scholarshipId = selectedRows.map((row) =>
    getRowId ? getRowId(row.original) : row.id
  );
  console.log("emow", status);

  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, deleteLoading } = useDeleteScholarship({
    scholarshipId,
  });
  useEffect(() => {
    if (isSuccess) {
      table.toggleAllRowsSelected(false);
      setOpenAlert(false);
    }
  }, [isSuccess, table]);
  const { data } = useScholarshipData({ status: "EXPIRED" });
  const filteredHeader = data.map((meow) => ({
    scholarshipTitle: meow.scholarshipTitle,
    scholarshipProvider: meow.scholarshipProvider,
    scholarshipGwa: meow.gwa,
    scholarshipDeadline: format(meow.scholarshipDeadline, "PPP p"),
    scholarshipLimit: meow.scholarshipLimit,
    totalApplicants: meow.totalApplicants,
    totalApproved: meow.totalApproved,
  }));

  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        {setStatus && (
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        )}
        {/* <div className="relative">
          <Input
            placeholder="Filter scholarship..."
            className="peer ps-9 pe-9 h-8 w-[150px] lg:w-[250px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </div> */}

        {/* {table.getColumn("scholarshipTitle") && (
          <DataTableFacetedFilter
            disabled={!!search}
            column={table.getColumn("scholarshipTitle")}
            title="Title"
            options={providerOptions}
          />
        )}

        {table.getColumn("scholarshipAmount") && (
          <DataTableFacetedFilter
            disabled={!!search}
            column={table.getColumn("scholarshipAmount")}
            title="Amount"
            options={amountOptions}
          />
        )} */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      {selectedRows.length > 0 && (
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="bg-red-700/20 text-red-600 hover:bg-red-700/30"
            >
              <Trash2 />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-00">
                Delete selected scholarship(s)?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The scholarship will be
                permanently removed from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteLoading}>
                Cancel
              </AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={deleteLoading}
                onClick={onSubmit}
              >
                {deleteLoading ? (
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
      )}
      <ExportScholarshipDialog data={filteredHeader} />
      <DataTableViewOptions table={table} />
      <Link prefetch href={`/administrator/home/scholarships/create`}>
        <Button size="sm" variant="secondary" className="relative">
          <Plus /> Add scholarship
        </Button>
      </Link>
    </div>
  );
}
