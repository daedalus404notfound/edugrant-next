"use client";
import "ldrs/react/Ring.css";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { Archive } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/app/administrator/table-components/data-table";
import { columns } from "../manage-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../manage-table-components/data-table-toolbar";
import { ScholarshipTypes } from "@/hooks/types";
import TitleReusable from "@/components/ui/title";

export default function Manage() {
  const [status, setStatus] = useState("ARCHIVED");
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
    status: status,
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
  });

  console.log(columnFilters);
  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Archived Scholarships"
          description="Browse the list of archived scholarships."
          Icon={Archive}
        />

        <div className="py-8">
          <DataTable<ScholarshipTypes, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.scholarshipId}
            loading={loading}
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
