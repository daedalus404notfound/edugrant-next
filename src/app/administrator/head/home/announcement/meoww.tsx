// "use client";
// import { GraduationCap, Megaphone } from "lucide-react";
// import { TourProvider } from "@/components/tour/tour-provider";
// import { TourStep } from "@/components/tour/tour-step";
// import { TourTrigger } from "@/components/tour/tour-trigger";
// import { columns } from "./announcement-table-components/columns";
// import DataTableToolbar from "./announcement-table-components/data-table-toolbar";
// import type { TourStep as TourStepType } from "@/lib/use-tour";
// import TitleReusable from "@/components/ui/title";
// import { Tabs } from "@/components/ui/vercel-tabs";
// import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
// import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   ColumnFiltersState,
//   PaginationState,
//   SortingState,
// } from "@tanstack/react-table";
// import { DataTable } from "@/app/table-components/data-table";
// import { useUpdateScholarshipStore } from "@/store/editScholarStore";
// import { useApplicationUIStore } from "@/store/updateUIStore";
// import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
// import { AnnouncementFormDataGet } from "@/hooks/zod/announcement";
// export default function Manage() {
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const [search, setSearch] = useState("");
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

//   const { data, meta, loading, setData } = useAnnouncementFetch({
//     page: pagination.pageIndex + 1,
//     pageSize: pagination.pageSize,
//     sortBy: sorting[0]?.id ?? "",
//     order: sorting[0]?.desc ? "desc" : "asc",
//     filters:
//       columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
//   });

//   const { deletedAnnouncementIds } = useApplicationUIStore();
//   const filteredData = data?.filter(
//     (item) => !deletedAnnouncementIds.includes(item.announcementId)
//   );

//   return (
//     <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
//       <div className="mx-auto w-[95%] lg:py-10  py-4">
//         <TitleReusable
//           title="Announcements"
//           description="Here’s what’s new! Stay tuned for the latest updates."
//           Icon={Megaphone}
//         />
//         <div className="mt-15 lg:w-full md:min-w-5xl w-full mx-auto">
//           <DataTable<AnnouncementFormDataGet, unknown>
//             data={filteredData}
//             columns={columns}
//             meta={meta}
//             pagination={pagination}
//             setPagination={setPagination}
//             getRowId={(row) => row.announcementId}
//             loading={loading}
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
