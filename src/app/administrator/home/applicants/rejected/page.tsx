"use client";
import "ldrs/react/Ring.css";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { DataTable } from "@/app/administrator/table-components/data-table";
import { columns } from "../manage-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../manage-table-components/data-table-toolbar";
import { ApplicationTypes } from "@/hooks/types";
import useApplicantsSearch from "@/hooks/admin/getApplicantSearch";
import useFetchApplications from "@/hooks/admin/getApplicant";

export default function Manage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("DECLINED");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loading } = useFetchApplications({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
    status: status,
  });

  const { searchData, searchLoading, searchMeta } = useApplicantsSearch({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    query: search,
    status: status,
  });
  console.log(columnFilters);
  return (
    <div className="min-h-screen px-4 relative z-10">
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-xl font-semibold flex items-center gap-1.5
          "
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 7,
            ease: "linear",
          }}
        >
          <X strokeWidth={3} />
          Declined Applicants
        </motion.span>
        <p className="text-sm text-gray-300 mt-1">
          Applicants who have been declined
        </p>

        <div className="py-8">
          <DataTable<ApplicationTypes, unknown>
            data={search.trim().length > 0 ? searchData : data}
            columns={columns}
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
  );
}
