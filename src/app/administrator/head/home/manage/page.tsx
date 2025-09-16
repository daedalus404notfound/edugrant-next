"use client";
import "ldrs/react/Ring.css";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { Activity } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "./manage-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";
import DataTableToolbar from "./manage-table-components/data-table-toolbar";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import TitleReusable from "@/components/ui/title";
import { useApplicationUIStore } from "@/store/deleteScholarshipStore";
export default function Manage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const { deletedScholarshipIds } = useApplicationUIStore();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loading } = useScholarshipData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });

  const { searchData, searchLoading, searchMeta } = useScholarshipSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
    status: status,
  });
  const filteredData = (search.trim().length > 0 ? searchData : data)?.filter(
    (item) => !deletedScholarshipIds.includes(item.scholarshipId)
  );

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Active Scholarships"
          description="Browse the list of active scholarships. Use the available actions to
          modify or remove entries."
          Icon={Activity}
        />

        <div className="py-8">
          <DataTable<scholarshipFormData, unknown>
            data={search.trim().length > 0 ? searchData : filteredData}
            columns={columns(status)}
            meta={search.trim().length > 0 ? searchMeta : meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.scholarshipId}
            loading={search ? searchLoading : loading}
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
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
