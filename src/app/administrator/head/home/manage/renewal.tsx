"use client";
import "ldrs/react/Ring.css";
import { useEffect, useState } from "react";
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
import { useApplicationUIStore } from "@/store/updateUIStore";
import useRenewScholarshipData from "@/hooks/admin/getRenewScholarship";
import { useAdminStore } from "@/store/adminUserStore";
import useScholarshipData from "@/hooks/admin/getScholarship";
export default function ManageRenewScholarship({
  setRenewal,
}: {
  setRenewal: (renewal: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("RENEW");
  const { admin } = useAdminStore();
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
    accountId: admin?.accountId,
  });
  useEffect(() => {
    if (meta?.totalRows !== undefined) {
      setRenewal(meta.totalRows);
    }
  }, [meta?.totalRows, setRenewal]);

  const { searchData, searchLoading, searchMeta } = useScholarshipSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
    status: status,
    accountId: admin?.accountId,
  });
  const { deletedScholarshipIds } = useApplicationUIStore();
  const filteredData = (search.trim().length > 0 ? searchData : data)?.filter(
    (item) => !deletedScholarshipIds.includes(item.scholarshipId)
  );

  return (
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
  );
}
