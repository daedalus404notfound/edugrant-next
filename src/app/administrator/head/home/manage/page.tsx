"use client";
import { GraduationCap } from "lucide-react";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourStep } from "@/components/tour/tour-step";
import { TourTrigger } from "@/components/tour/tour-trigger";
import { columns } from "./manage-table-components/columns";
import DataTableToolbar from "./manage-table-components/data-table-toolbar";
import type { TourStep as TourStepType } from "@/lib/use-tour";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useScholarshipData from "@/hooks/admin/getScholarship";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";
import { DataTable } from "@/app/table-components/data-table";
import { useUpdateScholarshipStore } from "@/store/editScholarStore";
import { useApplicationUIStore } from "@/store/updateUIStore";
export default function Manage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, meta, loading, setData } = useScholarshipData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });
  const { searchData, searchLoading, searchMeta, setSearchData } =
    useScholarshipSearch({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortBy: sorting[0]?.id ?? "",
      order: sorting[0]?.desc ? "desc" : "asc",
      query: search,
      status: status,
    });

  const { deletedScholarshipIds } = useApplicationUIStore();
  const filteredData = (search.trim().length > 0 ? searchData : data)?.filter(
    (item) => !deletedScholarshipIds.includes(item.scholarshipId)
  );

  const { updatedScholarship, clearUpdatedScholarship } =
    useUpdateScholarshipStore();

  useEffect(() => {
    if (!updatedScholarship) return;

    const now = new Date();
    const isExpired = new Date(updatedScholarship.deadline) < now;

    setData((prevData) =>
      prevData
        .map((item) =>
          item.scholarshipId === updatedScholarship.scholarshipId
            ? updatedScholarship
            : item
        )
        .filter(
          (item) =>
            !(
              item.scholarshipId === updatedScholarship.scholarshipId &&
              isExpired
            )
        )
    );

    if (search.trim().length > 0) {
      setSearchData((prevSearchData) =>
        prevSearchData
          .map((item) =>
            item.scholarshipId === updatedScholarship.scholarshipId
              ? updatedScholarship
              : item
          )
          .filter(
            (item) =>
              !(
                item.scholarshipId === updatedScholarship.scholarshipId &&
                isExpired
              )
          )
      );
    }

    clearUpdatedScholarship();
  }, [
    updatedScholarship,
    setData,
    setSearchData,
    clearUpdatedScholarship,
    search,
  ]);

  const tabs = [
    {
      id: "ACTIVE",
      label: "Active Scholarship",
      indicator: meta.count.countActive,
    },
    {
      id: "RENEW",
      label: "Scholarship Renewals",
      indicator: meta.count.countRenew,
    },
  ];
  const scholarshipTourSteps: TourStepType[] = [
    {
      id: "tabs",
      title: "Active vs Renewals",
      description:
        "Switch between active scholarships and renewal applications using these tabs.",
    },
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
    // {
    //   id: "export",
    //   title: "Export CSV",
    //   description:
    //     "Download the list of scholarships as a CSV file for easy access.",
    // },
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
  const [openGuide, setOpenGuide] = useState(true);
  return (
    <TourProvider steps={scholarshipTourSteps}>
      <div className="lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
        <Dialog open={openGuide} onOpenChange={setOpenGuide}>
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
                <TitleReusable
                  title="Welcome to Active Scholarship Management"
                  description=""
                />
              </DialogTitle>
              <DialogDescription className="mt-3">
                Begin managing scholarship programs. You can take a quick tour
                to learn the process, or skip it and start right away.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-3 mt-3">
              <Button
                className="flex-1"
                variant="secondary"
                onClick={() => setOpenGuide(false)}
              >
                Skip for Now
              </Button>
              <div onClick={() => setOpenGuide(false)} className="flex-1 ">
                <TourTrigger className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
          <TitleReusable
            title="Active Scholarship Management"
            description="View and manage scholarships. Switch between active scholarships and renewals using the tabs below."
            Icon={GraduationCap}
          />

          <div className="py-8 space-y-5">
            <div className="flex">
              <TourStep stepId="tabs">
                <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
              </TourStep>
            </div>
            <DataTable<scholarshipFormData, unknown>
              data={filteredData}
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
          </div>
        </div>
      </div>
    </TourProvider>
  );
}
