"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AdminProfileTypes } from "@/hooks/types";
import { DataTableColumnHeader } from "@/app/administrator/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AdminProfileTypes>[] = [
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
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const profileImage = row.original.profileImage;
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={profileImage} className="object-cover" />
            <AvatarFallback className="uppercase">
              {row.original.firstName.charAt(0)}
              {row.original.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize">
              {row.original.firstName} {row.original.middleName}{" "}
              {row.original.lastName}
            </div>
            <p className="text-xs text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "dateCreate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {format(
            new Date(row.getValue("dateCreate")),
            "MMM d, yyyy 'at' hh:mm a"
          )}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact No." />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">{row.getValue("phone")}</span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return <Badge variant="destructive">{row.getValue("role")}</Badge>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Loggin" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate">
          {format(
            new Date(row.getValue("lastLogin")),
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
