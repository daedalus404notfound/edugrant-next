"use client";
import "ldrs/react/Ring.css";
import { Ban, UserRoundSearch } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "../pending/application-table-components/columns";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../pending/application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import useFetchApplications from "@/hooks/admin/getApplicant";
import TitleReusable from "@/components/ui/title";

export default function PendingApplication() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("BLOCKED");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loadingState } = useFetchApplications({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });
  const { searchData, searchLoading, searchMeta } = useApplicantsSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
    status: status,
  });
  const applicationTourSteps: TourStepType[] = [
    {
      id: "search",
      title: "Search Scholarships",
      description:
        "Find scholarships quickly by typing their name in the search bar.",
    },
    {
      id: "filters",
      title: "Filter Options",
      description:
        "Apply filters to narrow down scholarships based on specific criteria.",
    },
    {
      id: "export",
      title: "Export CSV",
      description:
        "Download the list of scholarships as a CSV file for easy access.",
    },
    {
      id: "view",
      title: "Table View Options",
      description: "Show or hide table columns to customize your view.",
    },

    {
      id: "table",
      title: "Scholarship Table",
      description:
        "View all available scholarships in a table format. Click a row to see more details.",
    },
    {
      id: "rowperpage",
      title: "Table Row Per Page",
      description:
        "Navigate between multiple pages of scholarships using the pagination controls.",
    },
    {
      id: "pagination",
      title: "Table Pagination",
      description:
        "Navigate between multiple pages of scholarships using the pagination controls.",
    },
  ];

  return (
    <TourProvider steps={applicationTourSteps}>
      <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
        <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
          <TitleReusable
            title="Blocked Applications"
            description="Automatically moved when a student has an approved government scholarship."
            Icon={Ban}
            textColor="text-gray-700/70"
          />

          <div className="py-8">
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
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
