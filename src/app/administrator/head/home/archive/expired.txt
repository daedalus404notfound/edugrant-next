"use client";
import "ldrs/react/Ring.css";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "../manage/manage-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../manage/manage-table-components/data-table-toolbar";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useAdminStore } from "@/store/adminUserStore";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";
import socket from "@/lib/socketLib";

export default function ManageExpiredScholarship({
  setExpired,
}: {
  setExpired: (expired: number) => void;
}) {
  const [status, setStatus] = useState("EXPIRED");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { admin } = useAdminStore();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loadingState, setData } = useScholarshipData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    status: status,
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    accountId: admin?.accountId,
  });
  useEffect(() => {
    if (meta?.totalRows !== undefined) {
      setExpired(meta.totalRows);
    }
  }, [meta?.totalRows, setExpired]);
  const { searchData, searchLoading, searchMeta, setSearchData } =
    useScholarshipSearch({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortBy: sorting[0]?.id ?? "",
      order: sorting[0]?.desc ? "desc" : "asc",
      query: search,
      status: status,
      accountId: admin?.accountId,
    });

  useEffect(() => {
    socket.on("deleteScholarship", (data) => {
      setData((prev) => {
        const filtered = prev.filter(
          (meow) => meow.scholarshipId !== data.deletedScholarship.scholarshipId
        );
        return filtered;
      });
    });

    socket.on("renewScholarship", (data) => {
      setData((prev) => {
        const filtered = prev.filter(
          (meow) => meow.scholarshipId !== data.renewScholar.scholarshipId
        );
        return filtered;
      });
    });

    return () => {
      socket.off("deleteScholarship");
      socket.off("renewScholarship");
    };
  }, []);

  return (
    <DataTable<scholarshipFormData, unknown>
      data={search.trim().length > 0 ? searchData : data}
      columns={columns(status)}
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
    />
  );
}
