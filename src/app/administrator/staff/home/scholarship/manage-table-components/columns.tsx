"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { getPhaseLabel } from "@/lib/phaseLevel";
export const columns = (status: string): ColumnDef<scholarshipFormData>[] => [
  {
    accessorFn: (row) => ({
      title: row?.title,
      renew: row?.phase,
      logo: row?.logo,
    }),
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="pl-4"
        column={column}
        title="Scholarship Title"
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue("title") as {
        title?: string;
        phase?: number;
        logo?: string;
      };
      return (
        <div className="flex items-center gap-2 pl-4">
          <Avatar>
            <AvatarImage className="object-cover" src={value.logo} />
            <AvatarFallback>
              {row.original.Scholarship_Provider.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <span className="capitalize">{value?.title}</span>
          {value?.phase && (
            <Badge className="bg-blue-800 text-gray-200">
              {getPhaseLabel(value.phase)}
            </Badge>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.Scholarship_Provider?.name,
    id: "Scholarship_Provider_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sponsor" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.getValue("Scholarship_Provider_name")}
      </span>
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
              : status === "DECLINED"
              ? "bg-red-500/10 text-red-700"
              : status === "INTERVIEW"
              ? "bg-indigo-500/10 text-indigo-700"
              : status === "BLOCKED"
              ? "bg-gray-500/10 text-gray-700"
              : "bg-green-500/10 text-green-700"
          }`}
        >
          <CircleCheck />
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
