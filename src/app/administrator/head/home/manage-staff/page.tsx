"use client";
import "ldrs/react/Ring.css";
import { UsersRound } from "lucide-react";
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
export default function Manage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, loading, meta } = useAdminData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
  });

  const { searchData, searchLoading, searchMeta } = useAdminsSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
  });

  return (
    <div className="min-h-screen px-4 relative z-10">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Manage Staffs"
          description=" View, search, and manage staff accounts."
          Icon={UsersRound}
        />

        <div className="py-8">
          <DataTable<StaffFormData, unknown>
            data={search.trim().length > 0 ? searchData : data}
            columns={columns}
            meta={search.trim().length > 0 ? searchMeta : meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.staffId}
            loading={search ? searchLoading : loading}
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
