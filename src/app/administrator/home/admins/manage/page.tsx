"use client";
import "ldrs/react/Ring.css";
import { Activity } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import useAdminData from "@/hooks/admin/getAdmins";

export default function Manage() {
  const [pagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting] = useState<SortingState>([]);
  const [columnFilters] = useState<ColumnFiltersState>([]);
  const { data } = useAdminData({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: sorting[0]?.id ?? "",
    order: sorting[0]?.desc ? "desc" : "asc",
    filters:
      columnFilters.length > 0 ? JSON.stringify(columnFilters) : undefined,
  });

  console.log("admin data", data);
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

        <div className="py-8"></div>
      </div>
    </div>
  );
}
