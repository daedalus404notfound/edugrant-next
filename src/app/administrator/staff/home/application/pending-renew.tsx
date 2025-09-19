"use client";
import "ldrs/react/Ring.css";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "./staff-application-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "./staff-application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import { useApplicationUIStore } from "@/store/updateUIStore";
import useFetchRenewApplications from "@/hooks/admin/getRenewApplication";

export default function PendingRenewalApplication({
  setPendingRenew,
}: {
  setPendingRenew: (approved: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loading } = useFetchRenewApplications({
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
  useEffect(() => {
    if (meta?.totalRows !== undefined) {
      setPendingRenew(meta.totalRows);
    }
  }, [meta?.totalRows, setPendingRenew]);
  const { rejectedIds } = useApplicationUIStore();
  const { approvedIds } = useApplicationUIStore();
  const { ForInterviewIds } = useApplicationUIStore();
  const filteredData = (search.trim().length > 0 ? searchData : data)?.filter(
    (item) =>
      !rejectedIds.includes(item.applicationId) &&
      !approvedIds.includes(item.applicationId) &&
      !ForInterviewIds.includes(item.applicationId)
  );

  return (
    <DataTable<ApplicationFormData, unknown>
      data={filteredData}
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
  );
}
