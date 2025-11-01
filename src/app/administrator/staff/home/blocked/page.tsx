"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "../staff-application-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../staff-application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";
import useApplicationDataStaff from "@/hooks/staff/getApplicationStaff";
import TitleReusable from "@/components/ui/title";
import { Ban } from "lucide-react";

export default function PendingStaffApplication() {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("BLOCKED");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, isLoading } = useApplicationDataStaff({
    pagination,
    sorting,
    columnFilters,
    status,
    search,
  });

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-85px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Blocked Applications"
          Icon={Ban}
          description="Applicants currently waiting for review."
        />

        <div className="py-8 space-y-5">
          <DataTable<ApplicationFormData, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.applicationId.toString()}
            loading={isLoading}
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
        </div>
      </div>
    </div>
  );
}
