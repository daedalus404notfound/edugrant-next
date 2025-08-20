"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ScholarshipTypes } from "@/hooks/types";
import { DataTableColumnHeader } from "@/app/administrator/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
export const columns: ColumnDef<ScholarshipTypes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "scholarshipTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title / Provider" />
    ),
    cell: ({ row }) => {
      const { scholarshipTitle, scholarshipProvider, scholarshipLogo } =
        row.original;
      return (
        <div className="flex gap-2  ">
          <Avatar>
            <AvatarImage src={scholarshipLogo} />
            <AvatarFallback>
              {row.original.scholarshipProvider.slice(0.1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium truncate  w-50">
              {scholarshipTitle}
            </div>
            <p className="text-xs text-muted-foreground">
              {scholarshipProvider}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalApplicants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicants" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {row.getValue("totalApplicants")}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "scholarshipAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("scholarshipAmount"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

      return (
        <span className="max-w-[500px] truncate font-medium">{formatted}</span>
      );
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
        <Badge className="bg-green-500/10 text-green-700">
          <CircleCheck />
          Active
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "scholarshipDeadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {format(
            new Date(row.getValue("scholarshipDeadline")),
            "MMM d, yyyy 'at' hh:mm a"
          )}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "totalApproved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {row.getValue("totalApproved")}
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
