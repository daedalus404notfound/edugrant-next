"use client";
import "ldrs/react/Ring.css";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { Activity } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { DataTable } from "@/app/administrator/table-components/data-table";
import { columns } from "@/app/administrator/home/scholarships/table-components/columns";
import { PaginationState, SortingState } from "@tanstack/react-table";
export default function Manage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data, meta, loading } = useScholarshipData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    active: true,
    search,
  });
  console.log(search);
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
          <Activity strokeWidth={3} />
          Manage Scholarships
        </motion.span>
        <p className="text-sm text-gray-300 mt-1">
          Browse the list of active scholarships. Use the available actions to
          modify or remove entries.
        </p>

        <div className="py-8">
          <DataTable
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.scholarshipId}
            loading={loading}
            setSearch={setSearch}
            sorting={sorting} // ✅ pass sorting
            setSorting={setSorting} // ✅ pass setter
          />
        </div>
      </div>
    </div>
  );
}
