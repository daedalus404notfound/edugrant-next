"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "./application-data-table/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "./application-data-table/data-table-toolbar";
import TitleReusable from "@/components/ui/title";
import useGetAllStudents from "@/hooks/admin/getStudents";
import { StudentUserFormData } from "@/hooks/user/zodUserProfile";
import { Loader, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, isLoading, isFetching } = useGetAllStudents({
    pagination,
    sorting,
    columnFilters,

    search,
  });

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Registered Students"
          Icon={Users2}
          description="View and manage all registered students in the system."
        />

        <div className="py-8 space-y-5">
          {!isLoading && isFetching && (
            <div className="text-center">
              <Button variant="ghost">
                Refreshing List...
                <Loader className="animate-spin" />
              </Button>
            </div>
          )}
          <DataTable<StudentUserFormData, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.studentId.toString()}
            loading={isLoading}
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
        </div>
      </div>
    </div>
  );
}
