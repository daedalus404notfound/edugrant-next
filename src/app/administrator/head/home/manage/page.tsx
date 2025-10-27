"use client";
import { GraduationCap, RefreshCcw } from "lucide-react";
import { columns } from "./manage-table-components/columns";
import DataTableToolbar from "./manage-table-components/data-table-toolbar";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { DataTable } from "@/app/table-components/data-table";
import { useHeadScholarshipStore } from "@/store/headScholarshipMeta";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
export default function Manage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");
  const { query, meta } = useScholarshipData({
    status,
    pagination,
    sorting,
    columnFilters,
    search,
  });

  const tabs = [
    {
      id: "ACTIVE",
      label: "Active",
      indicator: meta.count?.countActive,
    },
    {
      id: "RENEW",
      label: "Renewals",
      indicator: meta.count?.countRenew,
    },
  ];
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [status, sorting, search, columnFilters]);

  const isLoading = query.isLoading;
  const data = query.data?.data ?? [];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        {status === "ACTIVE" ? (
          <TitleReusable
            title="Active Scholarships"
            description="Browse and manage all currently active scholarships. Use the tabs below to switch between active scholarships and renewals."
            Icon={GraduationCap}
          />
        ) : (
          <TitleReusable
            title="Scholarship Renewals"
            description="Browse and manage scholarship renewals. Use the tabs below to switch between active scholarships and renewals."
            Icon={RefreshCcw}
            textColor="text-blue-700/70"
          />
        )}

        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b sticky top-0 bg-background z-20">
          <Tabs
            tabs={tabs}
            activeTab={status}
            onTabChange={(tabId) => setStatus(tabId)}
          />
        </div>
        <div className="mt-10 lg:w-full md:min-w-5xl w-full mx-auto">
          <DataTable<scholarshipFormData, unknown>
            data={data}
            columns={columns(status)}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.scholarshipId.toString()}
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
          />
        </div>
      </div>
    </div>
  );
}
