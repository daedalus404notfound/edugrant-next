"use client";

import { ArrowRightIcon, Plus, SearchIcon, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/table-components/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/table-components/data-table-faceted-filter";
import Link from "next/link";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import { useEffect, useState } from "react";
import { ToolbarProps } from "@/app/table-components/data-table";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { format } from "date-fns";
import { TourTrigger } from "@/components/tour/tour-trigger";
import { TourStep } from "@/components/tour/tour-step";
export default function DataTableToolbar<TData>({
  table,
  getRowId,
  search,
  status,
  setSearch,
}: ToolbarProps<TData>) {
  const { filter } = useGetFilter({ scholarshipStatus: status });
  const isFiltered = table.getState().columnFilters.length > 0;
  const providerOption =
    filter?.getScholarshipsFilters.provider?.map((meow: string) => ({
      value: String(meow),
      label: String(meow),
    })) || [];
  console.log(filter);
  const selectedRows = table.getSelectedRowModel().rows;
  const scholarshipId = selectedRows.map((row) =>
    getRowId ? getRowId(row.original) : row.id
  );
  console.log(scholarshipId);

  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <TourStep stepId="search">
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
        </TourStep>
        <TourStep stepId="filters">
          <div className="flex gap-2">
            <DataTableFacetedFilter
              disabled={!!search}
              column={table.getColumn("title")}
              title="Scholarship Title"
              options={providerOption ?? []}
            />
            <DataTableFacetedFilter
              disabled={!!search}
              column={table.getColumn("Scholarship_Provider_name")}
              title="Provider"
              options={providerOption ?? []}
            />
          </div>
        </TourStep>
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
      <TourTrigger />

      <TourStep stepId="view">
        <DataTableViewOptions table={table} />
      </TourStep>
    </div>
  );
}
