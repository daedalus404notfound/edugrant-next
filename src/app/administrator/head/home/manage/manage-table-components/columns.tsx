"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Archive,
  Check,
  CheckCircle,
  CheckCircle2,
  CircleCheck,
  RefreshCcw,
  TriangleAlert,
} from "lucide-react";
import { getPhaseLabel } from "@/lib/phaseLevel";
export const columns = (status: string): ColumnDef<scholarshipFormData>[] => [
  // {
  //   accessorKey: "title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader className="pl-4" column={column} title="Title" />
  //   ),
  //   cell: ({ row }) => {
  //     const { title, logo } = row.original;
  //     return (
  //       <div className="flex gap-2  items-center pl-4">
  //         <Avatar>
  //           <AvatarImage className="object-cover" src={logo} />
  //           <AvatarFallback>
  //             {row.original.Scholarship_Provider.name.slice(0, 1)}
  //           </AvatarFallback>
  //         </Avatar>
  //         <div>
  //           <div className="font-medium truncate">{title}</div>
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorFn: (row) => row.title,
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scholarship" className="" />
    ),
    cell: ({ row }) => {
      const scholarship = row.original;
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={scholarship.logo} />
            <AvatarFallback className="uppercase">
              {scholarship.Scholarship_Provider?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <div>
              <div className="font-medium capitalize">{scholarship.title}</div>
              <p className="text-xs text-muted-foreground">
                {scholarship.Scholarship_Provider?.name}
              </p>
            </div>
            <Badge className="uppercase" variant="secondary">
              {getPhaseLabel(scholarship.phase)}
            </Badge>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.Scholarship_Provider?.name,
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sponsor" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("name")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("type")}</span>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: () => {
      return (
        <Badge
          className={`${
            status === "ACTIVE"
              ? "bg-green-500/10 text-green-700"
              : status === "EXPIRED"
              ? "bg-red-600/10 text-red-700"
              : status === "RENEW"
              ? "bg-blue-500/10 text-blue-700"
              : "bg-indigo-500/10 text-indigo-700"
          }`}
        >
          {status === "ACTIVE" ? (
            <CheckCircle />
          ) : status === "EXPIRED" ? (
            <TriangleAlert />
          ) : status === "RENEW" ? (
            <RefreshCcw />
          ) : (
            <Archive />
          )}{" "}
          {status}
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {format(
            new Date(row.getValue("deadline")),
            "MMM d, yyyy 'at' hh:mm a"
          )}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "pending",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pending" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {row.getValue("pending")}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "approved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {row.getValue("approved")}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "declined",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rejected" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {row.getValue("declined")}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  // {
  //   accessorKey: "scholarshipAmount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Amount" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = amount.find(
  //       (status) => status.value === String(row.getValue("scholarshipAmount"))
  //     );
  //     console.log("status", row.getValue("scholarshipAmount"));
  //     if (!status) {
  //       return null;
  //     }
  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} status={status} />,
  },
];
