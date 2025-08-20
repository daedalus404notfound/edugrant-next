"use client";
import {
  ArrowRightIcon,
  GraduationCap,
  Loader,
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
import { DataTableViewOptions } from "@/app/administrator/table-components/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/administrator/table-components/data-table-faceted-filter";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import { useEffect, useState } from "react";
import useDeleteApplication from "@/hooks/admin/postDeleteApplications";

import { ToolbarProps } from "@/app/administrator/table-components/data-table";

export default function DataTableToolbar<
  TData extends { applicationId: number }
>({ table, search, setSearch }: ToolbarProps<TData>) {
  const { filter } = useGetFilter({
    applicationStatus: "PENDING",
    scholarshipStatus: "ACTIVE",
  });
  const isFiltered = table.getState().columnFilters.length > 0;
  console.log(filter);
  const course = filter?.optionsApplication.distinctCourse.value.map(
    (item: string) => ({
      label: item,
      value: item,
      icon: GraduationCap,
    })
  );
  const year = filter?.optionsApplication.distinctYear.value.map(
    (item: string) => ({
      label: item,
      value: item,
      icon: GraduationCap,
    })
  );

  const scholarships = filter?.optionsScholarship.scholarshipTitle.value.map(
    (item: string) => ({
      label: item,
      value: item,
      icon: GraduationCap,
    })
  );

  const selectedRows = table.getSelectedRowModel().rows;
  const applicationIds = selectedRows.map((row) => row.original.applicationId);

  console.log("applicationId", applicationIds);

  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, loading } = useDeleteApplication({
    applicationId: applicationIds,
  });
  useEffect(() => {
    if (isSuccess) {
      table.toggleAllRowsSelected(false);
      setOpenAlert(false);
    }
  }, [isSuccess, table]);

  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder="Filter scholarship..."
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
        <DataTableFacetedFilter
          disabled={!!search}
          column={table.getColumn("scholarshipTitle")}
          title="Scholarship"
          options={scholarships ?? []}
        />
        <DataTableFacetedFilter
          disabled={!!search}
          column={table.getColumn("course")}
          title="Course"
          options={course ?? []}
        />

        <DataTableFacetedFilter
          disabled={!!search}
          column={table.getColumn("year")}
          title="Year"
          options={year ?? []}
        />

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
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
