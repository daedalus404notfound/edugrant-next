// "use client";
// import "ldrs/react/Ring.css";
// import { UsersRound } from "lucide-react";
// import { useState } from "react";
// import { DataTable } from "@/app/table-components/data-table";
// import { columns } from "./staff-table-components/columns";
// import { TourProvider } from "@/components/tour/tour-provider";
// import { TourStep } from "@/components/tour/tour-step";
// import type { TourStep as TourStepType } from "@/lib/use-tour";
// import {
//   ColumnFiltersState,
//   PaginationState,
//   SortingState,
// } from "@tanstack/react-table";
// import DataTableToolbar from "./staff-table-components/data-table-toolbar";
// import { StaffFormData } from "@/hooks/zod/staff";
// import useAdminData from "@/hooks/admin/getAdmins";
// import useAdminsSearch from "@/hooks/admin/getAdminSearch";
// import TitleReusable from "@/components/ui/title";
// import useGetAllStaffLogs, {
//   AllStaffLogsType,
// } from "@/hooks/admin/getAllStaffLogs";
// export default function Manage() {
//   const [search, setSearch] = useState("");
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

//   const { data, loading, meta } = useGetAllStaffLogs({
//     page: pagination.pageIndex + 1,
//     pageSize: pagination.pageSize,
//     sortBy: sorting[0]?.id ?? "",
//     order: sorting[0]?.desc ? "desc" : "asc",
//   });

//   return (
//     <div className="min-h-screen px-4 relative z-10">
//       <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
//         <TitleReusable
//           title="Staff Logs"
//           description="Review and monitor staff activities."
//           Icon={UsersRound}
//         />

//         <div className="py-8">
//           <DataTable<AllStaffLogsType, unknown>
//             data={data}
//             columns={columns}
//             meta={meta}
//             pagination={pagination}
//             setPagination={setPagination}
//             getRowId={(row) => row.logsId}
//             loading={loading}
//             search={search}
//             setSearch={setSearch}
//             sorting={sorting}
//             setSorting={setSorting}
//             columnFilters={columnFilters}
//             setColumnFilters={setColumnFilters}
//             toolbar={DataTableToolbar}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import TitleReusable from "@/components/ui/title";

import { Loader, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetAllStaffLogs, {
  AllStaffLogsType,
} from "@/hooks/admin/getAllStaffLogs";
import { columns } from "./staff-table-components/columns";

import DataTableToolbar from "./staff-table-components/data-table-toolbar";
export default function PendingStaffApplication() {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, isLoading, isFetching } = useGetAllStaffLogs({
    pagination,
    sorting,
    columnFilters,
  });

  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Staff Activity Logs"
          Icon={Users2}
          description="Monitor, review, and manage all staff activities and actions recorded in the system."
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
          <DataTable<AllStaffLogsType, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.logsId.toString()}
            loading={isLoading}
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
