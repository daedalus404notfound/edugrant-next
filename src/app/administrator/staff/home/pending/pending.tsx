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

import socket from "@/lib/socketLib";

export default function PendingStaffApplication() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });

  const { data, meta, loadingState, setData } = useFetchApplications({
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
    socket.on("applyScholarship", (data) => {
      setData((insert) => [data.newApplication, ...insert]);
    });

    socket.on("approveApplication", (data) => {
      console.log("approved", data);
      setData((prev) => {
        const approvedId = data.approvedApplication.applicationId;
        const blockedIds = data.blockedApplicationIDs;
        const filtered = prev.filter(
          (app) =>
            app.applicationId !== approvedId &&
            !blockedIds.includes(app.applicationId)
        );
        return filtered;
      });
    });

    socket.on("declineApplication", (data) => {
      console.log("declinedId", data);
      setData((prev) => {
        const declinedId = data.declineApplication.applicationId;
        const filtered = prev.filter((app) => app.applicationId !== declinedId);
        return filtered;
      });
    });

    socket.on("forInterview", (data) => {
      console.log("forInterview", data);
      setData((prev) => {
        const forInterviewId = data.interviewApplication.applicationId;
        const filtered = prev.filter(
          (app) => app.applicationId !== forInterviewId
        );
        return filtered;
      });
    });

    return () => {
      socket.off("applyScholarship");
      socket.off("approveApplication");
      socket.off("declineApplication");
      socket.off("forInterview");
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
