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
  getRowId?: (row: TData) => string | number;
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
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
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
      <TourStep stepId="table">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader
              className={` ${
                status === "ACTIVE"
                  ? "dark:bg-green-900 bg-green-100"
                  : status === "ARCHIVED"
                  ? "dark:bg-gray-900 bg-gray-100"
                  : status === "PENDING"
                  ? "dark:bg-yellow-900 bg-yellow-100"
                  : status === "DECLINED"
                  ? "dark:bg-red-900 bg-red-100"
                  : status === "APPROVED"
                  ? "dark:bg-green-900 bg-green-100"
                  : status === "RENEW"
                  ? "dark:bg-blue-900 bg-blue-100"
                  : status === "REVIEWED"
                  ? "dark:bg-blue-900 bg-blue-100"
                  : status === "EXPIRED"
                  ? "dark:bg-red-900 bg-orange-100"
                  : "bg-card"
              }`}
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
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
      </TourStep>
      <DataTablePagination
        table={table}
        totalPage={meta.totalPage}
        totalRows={meta.totalRows}
      />
    </div>
  );
}
