"use client";

import { Table } from "@tanstack/react-table";
import {
  ArrowRightIcon,
  
  Plus,
  SearchIcon,

  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import Link from "next/link";

// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import useGetFilter from "@/hooks/admin/getDynamicFilter";

export const amount = [
  {
    value: "10000",
    label: "10000",
   
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  getRowId?: (row: TData) => string | number;
  setSearch: (search: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  getRowId,
  setSearch,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows;
  
  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
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
        </div>

        {table.getColumn("scholarshipAmount") && (
          <DataTableFacetedFilter
            column={table.getColumn("scholarshipAmount")}
            title="Provider"
            options={amount}
          />
        )}
        {table.getColumn("scholarshipAmount") && (
          <DataTableFacetedFilter
            column={table.getColumn("scholarshipAmount")}
            title="Amount"
            options={amount}
          />
        )}

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
        <Button
          size="sm"
          className="bg-red-700/20 text-red-600 hover:bg-red-700/30"
          onClick={() => {
            const ids = selectedRows.map((row) =>
              getRowId ? getRowId(row.original) : row.id
            );
            console.log("Delete:", ids);
          }}
        >
          <Trash2 /> Delete
        </Button>
      )}
      <DataTableViewOptions table={table} />
      <Link prefetch href={`/administrator/home/scholarships/create`}>
        <Button size="sm" variant="secondary" className="relative">
          <Plus /> Add scholarship
        </Button>
      </Link>
    </div>
  );
}
