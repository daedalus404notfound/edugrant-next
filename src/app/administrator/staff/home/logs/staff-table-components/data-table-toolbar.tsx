"use client";

import {
  ArrowRightIcon,
  Loader,
  RefreshCcw,
  SearchIcon,
  Trash2,
  X,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/table-components/data-table-view-options";
import { useEffect, useState } from "react";
import useDeleteAdmin from "@/hooks/admin/postDeleteAdmin";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import { ToolbarProps } from "@/app/table-components/data-table";
export default function DataTableToolbar<TData>({
  table,
  getRowId,
  search,
  setSearch,
}: ToolbarProps<TData>) {
  console.log(search);
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows;
  const adminId = selectedRows.map((row) =>
    getRowId ? getRowId(row.original) : row.id
  );
  console.log(adminId);

  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteAdmin({
    adminId,
  });

  useEffect(() => {
    if (isSuccess) {
      table.toggleAllRowsSelected(false);
      setOpenAlert(false);
    }
  }, [isSuccess, table]);
  const isFetching = useIsFetching({ queryKey: ["staffLogsData"] }) > 0;
  const queryClient = useQueryClient();
  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder="Search names..."
            className="peer ps-9 pe-9 h-8 w-[150px] lg:w-[250px]"
            onChange={(e) => setSearch?.(e.target.value)}
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
        </div>

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
              <AlertDialogTitle className="text-red-600">
                Delete selected administrator(s)?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The administrator account(s) will
                be permanently removed from the system.
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
      )}{" "}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant={isFetching ? "outline" : "default"}
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["staffLogsData"],
              })
            }
          >
            <RefreshCcw
              className={`transition-transform ${
                isFetching ? "spin-reverse" : ""
              }`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFetching ? "Refreshing..." : "Refresh table"}</p>
        </TooltipContent>
      </Tooltip>
      <DataTableViewOptions table={table} />
    </div>
  );
}
