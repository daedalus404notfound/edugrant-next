"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import TitleReusable from "@/components/ui/title";

import { Activity, Loader, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetAllStaffLogs, {
  AllStaffLogsType,
} from "@/hooks/admin/getAllStaffLogs";
import { columns } from "./staff-table-components/columns";

import DataTableToolbar from "./staff-table-components/data-table-toolbar";
export default function PendingStaffApplication() {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, isLoading, isFetching } = useGetAllStaffLogs({
    pagination,
    sorting,
    columnFilters,
  });

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Activity Logs"
          Icon={Activity}
          description="Monitor, review, activities and actions recorded in the system."
        />

        <div className="py-8 space-y-5">
          {!isLoading && isFetching && (
            <div className="text-center">
              <Button variant="ghost">
                Refreshing List...
                <Loader className="animate-spin" />
              </Button>
            </div>
          )}
          <DataTable<AllStaffLogsType, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.logsId.toString()}
            loading={isLoading}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            toolbar={DataTableToolbar}
            columnVisibility={columnVisibility} // <-- pass visibility
            setColumnVisibility={setColumnVisibility} // <-- pass setter
          />
        </div>
      </div>
    </div>
  );
}
