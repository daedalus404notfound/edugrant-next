"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { StaffFormData } from "@/hooks/zod/staff";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { useTourContext } from "@/components/tour-2/tour-provider";
import { TourStep } from "@/components/tour-2/tour-step";
import { AdminProfileFormData } from "@/hooks/head-profile-edit";

export const columns: ColumnDef<AdminProfileFormData>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader className="pl-4" column={column} title="#" />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return (
        <div className="pl-4">{pageIndex * pageSize + row.index + 1}.</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <div className="pl-4">
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="pl-4">
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     </div>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  // },

  {
    accessorFn: (row) => row.ISPSU_Staff.fName,
    id: "fName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" className="pl-4" />
    ),
    cell: ({ row }) => {
      const { isActive, activeTourName } = useTourContext();
      const first = row.original.ISPSU_Staff?.fName;
      const middle = row.original.ISPSU_Staff?.mName;
      const last = row.original.ISPSU_Staff?.lName;
      const email = row.original.email;
      const profile = row.original.ISPSU_Staff?.profileImg?.publicUrl;
      const content = (
        <Link
          href={`/administrator/head/home/manage-staff/${row.original.accountId}`}
          className="flex gap-2 items-center pl-4"
        >
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={profile || "https://github.com/shadcn.png"}
            />
            <AvatarFallback className="uppercase">
              {first.charAt(0)}
              {last.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize underline">
              {first} {middle} {last}
            </div>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </Link>
      );

      if (isActive && row.index === 0) {
        return (
          <TourStep
            link={`/administrator/head/home/manage-staff/${row.original.accountId}`}
            stepId="activate-1"
          >
            {content}
          </TourStep>
        );
      }

      return content;
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
    accessorKey: "validated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account status" />
    ),
    cell: ({ row }) => {
      const validated = row.original.ISPSU_Staff?.validated;

      return (
        <span className="max-w-[500px] truncate">
          {validated ? "Active" : "Inactive"}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "lastOnline",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Last online" />
  //   ),
  //   cell: ({ row }) => {
  //     const validated = row.getValue("validated") as boolean;
  //     return (
  //       <span className="max-w-[500px] truncate">
  //         {validated ? "Active" : "Inactive"}
  //       </span>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
