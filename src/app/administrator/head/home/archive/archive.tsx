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
import { useApplicationUIStore } from "@/store/updateUIStore";
import { useAdminStore } from "@/store/adminUserStore";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";

export default function ManageArchivedScholarship({
  setArchived,
}: {
  setArchived: (archived: number) => void;
}) {
  const [status, setStatus] = useState("ARCHIVED");
  const { admin } = useAdminStore();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loadingState } = useScholarshipData({
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
      setArchived(meta.totalRows);
    }
  }, [meta?.totalRows, setArchived]);

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
  const { deletedScholarshipIds } = useApplicationUIStore();
  const filteredData = (search.trim().length > 0 ? searchData : data)?.filter(
    (item) => !deletedScholarshipIds.includes(item.scholarshipId)
  );
  return (
    <DataTable<scholarshipFormData, unknown>
      data={filteredData}
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
