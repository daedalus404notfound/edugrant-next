"use client";
import "ldrs/react/Ring.css";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "./application-data-table/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "./application-data-table/data-table-toolbar";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import useFetchStudents from "@/hooks/admin/getStudents";
import { useAdminStore } from "@/store/adminUserStore";
import { StudentUserFormData } from "@/hooks/user/zodUserProfile";
import useFetchApplicationCSV from "@/hooks/admin/getApplicationCSV";
import useFetchApplicationCSVShit from "@/hooks/admin/getShit";

export default function ApprovedApplication({
  setApproved,
}: {
  setApproved: (approved: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { admin } = useAdminStore();
  const accountId = admin?.accountId;

  // const { data: exportCsv } = useFetchApplicationCSV({
  //   filters:
  //     columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
  //   accountId: accountId ? accountId : 3,
  // });

  const { data, meta, loading } = useFetchStudents({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : undefined,
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    accountId: accountId ? accountId : 3,
  });
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    section: false,
    year: false,
  });
  useEffect(() => {
    if (meta?.totalRows !== undefined) {
      setApproved(meta.totalRows);
    }
  }, [meta?.totalRows, setApproved]);
  const { searchData, searchLoading, searchMeta } = useApplicantsSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
  });

  return (
    <DataTable<StudentUserFormData, unknown>
      data={data}
      columns={columns}
      meta={search.trim().length > 0 ? searchMeta : meta}
      pagination={pagination}
      setPagination={setPagination}
      getRowId={(row) => row.studentId}
      loading={search ? searchLoading : loading}
      search={search}
      setSearch={setSearch}
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
