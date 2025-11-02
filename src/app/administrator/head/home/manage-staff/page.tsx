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
// export default function Manage() {
//   const [search, setSearch] = useState("");
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

//   const { data, loading, meta } = useAdminData({
//     page: pagination.pageIndex + 1,
//     pageSize: pagination.pageSize,
//     sortBy: sorting[0]?.id ?? "",
//     order: sorting[0]?.desc ? "desc" : "asc",
//   });

//   const { searchData, searchLoading, searchMeta } = useAdminsSearch({
//     page: pagination.pageIndex + 1,
//     pageSize: pagination.pageSize,
//     sortBy: sorting[0]?.id ?? "",
//     order: sorting[0]?.desc ? "desc" : "asc",
//     query: search,
//   });

//   return (
//     <div className="min-h-screen px-4 relative z-10">
//       <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
//         <TitleReusable
//           title="Manage Staffs"
//           description=" View, search, and manage staff accounts."
//           Icon={UsersRound}
//         />

//         <div className="py-8">
//           <DataTable<StaffFormData, unknown>
//             data={search.trim().length > 0 ? searchData : data}
//             columns={columns}
//             meta={search.trim().length > 0 ? searchMeta : meta}
//             pagination={pagination}
//             setPagination={setPagination}
//             getRowId={(row) => row.staffId}
//             loading={search ? searchLoading : loading}
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
import { columns } from "./staff-table-components/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DataTableToolbar from "./staff-table-components/data-table-toolbar";
import useAdminData from "@/hooks/admin/getAdmins";
import { StaffFormData } from "@/hooks/zod/staff";
import { useTourStore } from "@/store/useTourStore";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { AdminProfileFormData } from "@/hooks/head-profile-edit";
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
  const { data, meta, isLoading, isFetching } = useAdminData({
    pagination,
    sorting,
    columnFilters,
    search,
  });
  const { activateStaff, setActivateStaff } = useTourStore();
  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-85px)] min-h-[calc(100dvh-134px)] ">
      {" "}
      <Dialog open={activateStaff} onOpenChange={setActivateStaff}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable title="Post scholarship guide" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setActivateStaff(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setActivateStaff(false);
              }}
              className="flex-1 "
            >
              {data.length === 0 ? (
                <Button disabled>No data for demonstration</Button>
              ) : (
                <TourTrigger
                  tourName="activateStaff"
                  className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Manage Staff"
          Icon={Users2}
          description="Monitor, review, and manage all staff activities and actions recorded in the system."
        />

        <div className="py-8 space-y-5">
          <DataTable<AdminProfileFormData, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => String(row.accountId)}
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
