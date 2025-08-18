"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AdminProfileTypes } from "@/hooks/types";
import { DataTableColumnHeader } from "@/app/administrator/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

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
            <AvatarImage src={`/avatars/${profileImage}.jpg`} />
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

  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <Badge className="bg-yellow-500/10 text-yellow-500">
  //         <Clock />
  //         {row.getValue("status")}
  //       </Badge>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  // {
  //   accessorKey: "scholarship.scholarshipTitle",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Scholarship" />
  //   ),
  //   cell: ({ row }) => {
  //     const scholar = row.original.scholarship;
  //     return (
  //       <div className="font-medium truncate  w-50">
  //         {scholar.scholarshipTitle}
  //       </div>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  // {
  //   id: "course", // 👈 use a simple id
  //   accessorFn: (row) => row.student.course, // safe way to access nested
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Course, Year & Section" />
  //   ),
  //   cell: ({ row }) => {
  //     const scholar = row.original.student;
  //     return (
  //       <span className="max-w-[500px] truncate">
  //         {scholar.course}-{scholar.year.slice(0, 1)}
  //         {scholar.section}
  //       </span>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
