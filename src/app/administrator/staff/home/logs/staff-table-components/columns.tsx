"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { AllStaffLogsType } from "@/hooks/admin/getAllStaffLogs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Ban, Check, MessagesSquare, X } from "lucide-react";

export const columns: ColumnDef<AllStaffLogsType>[] = [
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
  //     <div className="">
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
  //     <div className="">
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
    accessorFn: (row) => row.application,
    id: "student",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Processed Student" />
    ),
    cell: ({ row }) => {
      const student = row.original.application.Student;
      return (
        <div className="flex gap-2 items-center ">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={
                student.profileImg?.publicUrl || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback className="uppercase">
              {student.fName.charAt(0)}
              {student.lName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize">
              {student.fName} {student.mName} {student.lName}
            </div>
            <p className="text-xs text-muted-foreground">
              {student.Account?.schoolId}
            </p>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.scholarship,
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Scholarship" />
    ),
    cell: ({ row }) => {
      const scholarship = row.original.scholarship;
      return (
        <div className="flex gap-2 items-center ">
          <Avatar>
            <AvatarImage src={scholarship.logo} />
            <AvatarFallback className="uppercase">
              {scholarship.title.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize">{scholarship.title}</div>
            <p className="text-xs text-muted-foreground">
              {scholarship.Scholarship_Provider.name}
            </p>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Processed Date" />
    ),
    cell: ({ row }) => {
      return (
        <span className=" truncate">
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
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          className={
            row.getValue("action") === "PENDING"
              ? "bg-yellow-500/10 text-yellow-500"
              : row.getValue("action") === "DECLINE"
              ? "bg-red-500/10 text-red-500"
              : row.getValue("action") === "INTERVIEW"
              ? "bg-blue-500/10 text-blue-500"
              : row.getValue("action") === "APPROVED"
              ? "bg-emerald-500/10 text-emerald-600"
              : row.getValue("action") === "BLOCKED"
              ? "bg-gray-500/10 text-gray-500"
              : ""
          }
        >
          {row.getValue("action") === "PENDING" ? (
            <Calendar />
          ) : row.getValue("action") === "DECLINE" ? (
            <X />
          ) : row.getValue("action") === "INTERVIEW" ? (
            <MessagesSquare />
          ) : row.getValue("action") === "APPROVED" ? (
            <Check />
          ) : row.getValue("action") === "BLOCKED" ? (
            <Ban />
          ) : (
            ""
          )}

          {row.getValue("action")}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  // {
  //   accessorKey: "action",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Action" />
  //   ),
  //   cell: ({ row }) => {
  //     return <span className=" truncate">{row.getValue("action")}</span>;
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
