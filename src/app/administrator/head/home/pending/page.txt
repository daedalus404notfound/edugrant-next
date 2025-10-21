"use client";
import "ldrs/react/Ring.css";
import { UserRoundMinus } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "./application-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "./application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import useFetchApplications from "@/hooks/admin/getApplicant";
import TitleReusable from "@/components/ui/title";

export default function PendingApplication() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loading } = useFetchApplications({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });

  const { searchData, searchLoading, searchMeta } = useApplicantsSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
    status: status,
  });
  console.log(columnFilters);
  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Pending Applications"
          description="Applicants currently waiting for review."
          Icon={UserRoundMinus}
        />

        <div className="py-8">
          <DataTable<ApplicationFormData, unknown>
            data={search.trim().length > 0 ? searchData : data}
            columns={columns}
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
