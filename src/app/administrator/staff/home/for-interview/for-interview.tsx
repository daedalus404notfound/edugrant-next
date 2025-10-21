"use client";
import "ldrs/react/Ring.css";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "../staff-application-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../staff-application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import useFetchApplications from "@/hooks/admin/getApplicant";
import TitleReusable from "@/components/ui/title";
import { useApplicationUIStore } from "@/store/updateUIStore";
import socket from "@/lib/socketLib";

export default function ForInterviewApplication({
  setInterview,
}: {
  setInterview: (interview: number) => void;
}) {
  useEffect(() => {
    socket.on("forInterview", ({ forInterview }) => {
      console.log("forInterview:", forInterview);
    });

    return () => {
      socket.off("forInterview");
    };
  }, []);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("INTERVIEW");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loadingState } = useFetchApplications({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
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
  console.log("dataa", data);
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
      setInterview(meta.totalRows);
    }
  }, [meta?.totalRows, setInterview]);
  const { rejectedIds, approvedIds, forInterviewIds } = useApplicationUIStore();

  const filteredData = (search.trim().length > 0 ? searchData : data)?.filter(
    (item) =>
      !rejectedIds.includes(item.applicationId) &&
      !approvedIds.includes(item.applicationId)
  );

  return (
    <DataTable<ApplicationFormData, unknown>
      data={filteredData}
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
