"use client";
import { Archive, Clock, GraduationCap } from "lucide-react";
import { columns } from "../manage/manage-table-components/columns";
import DataTableToolbar from "../manage/manage-table-components/data-table-toolbar";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { DataTable } from "@/app/table-components/data-table";
import { useHeadInactiveScholarshipStore } from "@/store/headInactiveScholarshipStore";
import useScholarshipInactiveData from "@/hooks/admin/getScolarshipInactive";
export default function Manage() {
  const {
    metaInactive,
    statusInactive,
    setStatusInactive,
    paginationInactive,
    setPaginationInactive,
    searchInactive,
    setSearchInactive,
    setSortingInactive,
    sortingInactive,
    columnFiltersInactive,
    setColumnFiltersInactive,
  } = useHeadInactiveScholarshipStore();
  const { data, isLoading } = useScholarshipInactiveData();

  const tabs = [
    {
      id: "EXPIRED",
      label: "Expired",
      indicator: metaInactive.count.countExpired
        ? metaInactive.count.countExpired
        : null,
    },
    {
      id: "ENDED",
      label: "Ended",
      indicator: metaInactive.count.countArchived
        ? metaInactive.count.countArchived
        : null,
    },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        {statusInactive === "EXPIRED" ? (
          <TitleReusable
            title="Inactive Scholarships"
            description="View and manage all scholarships that are currently inactive. Use the tabs below to navigate between inactive and ended scholarships."
            Icon={Archive} // remains Archive for inactive
            textColor="text-red-700/70"
          />
        ) : (
          <TitleReusable
            title="Ended Scholarships"
            description="View and manage all scholarships that have ended. Use the tabs below to navigate between inactive and ended scholarships."
            Icon={Clock} // changed to Clock to represent ended
            textColor="text-indigo-700/70"
          />
        )}

        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          <Tabs
            tabs={tabs}
            activeTab={statusInactive}
            onTabChange={(tabId) => setStatusInactive(tabId)}
          />
        </div>
        <div className="mt-10 lg:w-full md:min-w-5xl w-full mx-auto">
          <DataTable<scholarshipFormData, unknown>
            data={data}
            columns={columns(statusInactive)}
            meta={metaInactive}
            pagination={paginationInactive}
            setPagination={setPaginationInactive}
            getRowId={(row) => row.scholarshipId}
            loading={isLoading}
            search={searchInactive}
            setSearch={setSearchInactive}
            status={statusInactive}
            setStatus={setStatusInactive}
            sorting={sortingInactive}
            setSorting={setSortingInactive}
            columnFilters={columnFiltersInactive}
            setColumnFilters={setColumnFiltersInactive}
            toolbar={DataTableToolbar}
          />
        </div>
      </div>
    </div>
  );
}
