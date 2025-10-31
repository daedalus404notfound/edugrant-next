"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
  OnChangeFn,
  SortingState,
  ColumnFiltersState,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { TourStep } from "@/components/tour/tour-step";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetaTypes } from "@/hooks/zodMeta";
import { DataTablePagination } from "./data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { QueryObserverResult } from "@tanstack/react-query";
export interface ToolbarProps<TData> {
  table: TanstackTable<TData>;
  getRowId?: (row: TData) => string | number;
  search?: string;
  setSearch?: (search: string) => void;
  status?: string;
  setStatus?: (search: string) => void;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  meta: MetaTypes;
  data: TData[];
  getRowId?: (row: TData) => string;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  loading: boolean;
  search?: string;
  status?: string;
  setStatus?: (status: string) => void;
  setSearch?: (search: string) => void;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  toolbar?: React.ComponentType<ToolbarProps<TData>>;
  columnVisibility?: Record<string, boolean>; // <-- added
  setColumnVisibility?: OnChangeFn<Record<string, boolean>>; // <-- added
  customLink?: boolean;
  setLink?: string;
  refetch?: () => Promise<QueryObserverResult<TData[], Error>>;
}

export function DataTable<TData, TValue>({
  columns,
  meta,
  data,
  getRowId,
  pagination,
  setPagination,
  loading,
  search,
  setSearch,
  status,
  setStatus,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  columnVisibility,
  setColumnVisibility,
  toolbar: ToolbarComponent,
  customLink,
  setLink,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: meta.totalPage,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: { pagination, sorting, columnFilters, columnVisibility },
  });

  return (
    <div className="space-y-3">
      {ToolbarComponent && (
        <ToolbarComponent
          table={table}
          getRowId={getRowId}
          search={search}
          status={status}
          setStatus={setStatus}
          setSearch={setSearch}
        />
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader
            className={`${
              status === "ACTIVE"
                ? "bg-emerald-100  dark:bg-emerald-900/60 "
                : status === "ARCHIVED"
                ? "bg-gray-100  dark:bg-gray-900/60 "
                : status === "PENDING"
                ? "bg-amber-100 dark:bg-amber-900/60 "
                : status === "DECLINED"
                ? "bg-red-100  dark:bg-red-800/60 "
                : status === "APPROVED"
                ? "bg-emerald-100  dark:bg-emerald-900/60 "
                : status === "RENEW"
                ? "bg-blue-100  dark:bg-blue-900/60 "
                : status === "INTERVIEW"
                ? "bg-indigo-100  dark:bg-indigo-900/60 "
                : status === "EXPIRED"
                ? "bg-red-100  dark:bg-red-900/60 "
                : "bg-emerald-100  dark:bg-emerald-900/60"
            } text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200`}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className=" text-center space-y-2"
                >
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {customLink ? (
                        <Link
                          href={`${setLink}/${row.id}`}
                          prefetch
                          scroll={false}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        table={table}
        totalPage={meta.totalPage}
        totalRows={meta.totalRows}
      />
    </div>
  );
}
