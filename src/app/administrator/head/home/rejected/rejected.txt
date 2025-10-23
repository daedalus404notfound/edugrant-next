"use client";
import "ldrs/react/Ring.css";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "../pending/application-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../pending/application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import useFetchApplications from "@/hooks/admin/getApplicant";
import socket from "@/lib/socketLib";

export default function RejectedApplication({
  setRejected,
}: {
  setRejected: (approved: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("DECLINED");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loadingState, setData } = useFetchApplications({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });
  useEffect(() => {
    if (meta?.totalRows !== undefined) {
      setRejected(meta.totalRows);
    }
  }, [meta?.totalRows, setRejected]);
  const { searchData, searchLoading, searchMeta } = useApplicantsSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
    status: status,
  });
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });
  useEffect(() => {
    socket.on("declineApplication", (data) => {
      console.log("datadata", data);
      setData((prev) => [data.declineApplication, ...prev]);
    });

    return () => {
      socket.off("declineApplication");
    };
  }, []);
  return (
    <DataTable<ApplicationFormData, unknown>
      data={search.trim().length > 0 ? searchData : data}
      columns={columns}
      meta={search.trim().length > 0 ? searchMeta : meta}
      pagination={pagination}
      setPagination={setPagination}
      getRowId={(row) => row.scholarshipId}
      loading={search ? searchLoading : loadingState}
      search={search}
      setSearch={setSearch}
      status={status}
      setStatus={setStatus}
      sorting={sorting}
      setSorting={setSorting}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      toolbar={DataTableToolbar}
      columnVisibility={columnVisibility} // <-- pass visibility
      setColumnVisibility={setColumnVisibility} // <-- pass setter
    />
  );
}
