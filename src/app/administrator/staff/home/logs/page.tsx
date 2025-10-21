"use client";
import "ldrs/react/Ring.css";
import { Activity, UsersRound } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "./staff-table-components/columns";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "./staff-table-components/data-table-toolbar";
import { StaffFormData } from "@/hooks/zod/staff";
import useAdminData from "@/hooks/admin/getAdmins";
import useAdminsSearch from "@/hooks/admin/getAdminSearch";
import TitleReusable from "@/components/ui/title";
import useGetAllStaffLogs, {
  AllStaffLogsType,
} from "@/hooks/admin/getAllStaffLogs";
export default function Manage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, loading, meta } = useGetAllStaffLogs({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
  });

  return (
    <div className="min-h-screen px-4 relative z-10">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Activity Log"
          description="Review and monitor activities."
          Icon={Activity}
        />

        <div className="py-8">
          <DataTable<AllStaffLogsType, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.logsId}
            loading={loading}
            search={search}
            setSearch={setSearch}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            toolbar={DataTableToolbar}
          />
        </div>
      </div>
    </div>
  );
}
