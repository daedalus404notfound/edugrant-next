"use client";
import {
  ArrowRightIcon,
  Building,
  GraduationCap,
  RefreshCcw,
  SearchIcon,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/table-components/data-table-view-options";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableFacetedFilter } from "@/app/table-components/data-table-faceted-filter";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import { useEffect, useState } from "react";
import useDeleteApplication from "@/hooks/admin/postDeleteApplications";

import { ToolbarProps } from "@/app/table-components/data-table";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import useFetchApplications from "@/hooks/admin/getApplicant";

export default function DataTableToolbar<TData extends { studentId: number }>({
  table,
  search,
  setSearch,
  status,
}: ToolbarProps<TData>) {
  const { filter } = useGetFilter({
    scholarshipStatus: "ACTIVE",
  });

  console.log(filter);
  const isFiltered = table.getState().columnFilters.length > 0;
  console.log(filter);
  const course = filter?.getFilterData.course.map((meow) => ({
    label: meow,
    value: meow,
    icon: GraduationCap,
  }));
  const year = filter?.getFilterData.year.map((meow) => ({
    label: meow,
    value: meow,
    icon: GraduationCap,
  }));
  const institute = filter?.getFilterData.institute.map((meow) => ({
    label: meow,
    value: meow,
    icon: Building,
  }));

  const scholarships = filter?.getScholarshipsFilters.scholarship.map(
    (meow) => ({
      label: meow,
      value: meow,
      icon: GraduationCap,
    })
  );

  const selectedRows = table.getSelectedRowModel().rows;
  const applicationIds = selectedRows.map((row) => row.original.studentId);

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
  const isFetching = useIsFetching({ queryKey: ["studentsDataHead"] }) > 0;
  const queryClient = useQueryClient();
  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder="Search name..."
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

        <div className="space-x-1">
          <DataTableFacetedFilter
            disabled={!!search}
            column={table.getColumn("institute")}
            title="Institute"
            options={institute ?? []}
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
        <DeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
          onConfirm={onSubmit}
          loading={loading}
          title="Delete application?"
          description="This will permanently delete all applications and cannot be undone."
          confirmText="Delete All"
          cancelText="Keep Items"
          trigger={
            <Button
              onClick={() => setOpenAlert(true)}
              size="sm"
              variant="destructive"
              className="justify-start"
            >
              <Trash2 /> Delete
            </Button>
          }
        />
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant={isFetching ? "outline" : "default"}
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["studentsDataHead"],
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
