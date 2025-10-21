"use client";
import { GraduationCap } from "lucide-react";
import { columns } from "../manage/manage-table-components/columns";
import DataTableToolbar from "../manage/manage-table-components/data-table-toolbar";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useEffect, useState } from "react";
import useScholarshipData from "@/hooks/admin/getScholarship";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";
import { DataTable } from "@/app/table-components/data-table";
import socket from "@/lib/socketLib";
export default function Manage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [status, setStatus] = useState("EXPIRED");
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, meta, loadingState, setData } = useScholarshipData({
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

  const tabs = [
    {
      id: "EXPIRED",
      label: "Expired Scholarship",
      indicator: meta.count.countExpired ? meta.count.countExpired : null,
    },
    {
      id: "ARCHIVED",
      label: "Completed Scholarships",
      indicator: meta.count.countArchived ? meta.count.countArchived : null,
    },
  ];

  useEffect(() => {
    socket.on("deleteScholarship", (data) => {
      console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);

      setData((prev) =>
        prev.filter(
          (meow) => meow.scholarshipId !== data.deletedScholarship.scholarshipId
        )
      );
    });
    return () => {
      socket.off("deleteScholarship");
    };
  }, []);
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        <TitleReusable
          title="Active Scholarship Management"
          description="View and manage scholarships. Switch between active scholarships and renewals using the tabs below."
          Icon={GraduationCap}
        />{" "}
        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
        </div>
        <div className="mt-15 lg:w-full md:min-w-5xl w-full mx-auto">
          <DataTable<scholarshipFormData, unknown>
            data={search.trim().length > 0 ? searchData : data}
            columns={columns(status)}
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
          />
        </div>
      </div>
    </div>
  );
}
