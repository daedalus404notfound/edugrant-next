"use client";
import "ldrs/react/Ring.css";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { Archive } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { DataTable } from "@/app/administrator/table-components/data-table";
import { columns } from "./archived-table-components/columns";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "./archived-table-components/data-table-toolbar";
import { ScholarshipTypes } from "@/hooks/types";

export default function Manage() {
  const [status, setStatus] = useState("ARCHIVED");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, loading } = useScholarshipData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    status: status,
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
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
          <Archive strokeWidth={3} />
          Archived Scholarships
        </motion.span>
        <p className="text-sm text-gray-300 mt-1">
          Browse the list of archived scholarships
        </p>

        <div className="py-8">
          <DataTable<ScholarshipTypes, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.scholarshipId}
            loading={loading}
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
