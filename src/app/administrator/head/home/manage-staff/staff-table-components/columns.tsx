"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { StaffFormData } from "@/hooks/zod/staff";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export const columns: ColumnDef<StaffFormData>[] = [
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
    accessorKey: "staffId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff ID" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {row.getValue("staffId")}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "fName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">{row.getValue("fName")}</span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "mName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Middle Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">{row.getValue("mName")}</span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">{row.getValue("lName")}</span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {format(
            new Date(row.getValue("dateCreated")),
            "MMM d, yyyy 'at' hh:mm a"
          )}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
