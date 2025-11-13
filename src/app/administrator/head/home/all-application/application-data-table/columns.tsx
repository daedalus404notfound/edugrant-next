"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { StudentUserFormData } from "@/hooks/user/zodUserProfile";
import Link from "next/link";
export const columns: ColumnDef<StudentUserFormData>[] = [
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
  {
    accessorFn: (row) => row.fName,
    id: "fName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" className="pl-4" />
    ),
    cell: ({ row }) => {
      const student = row.original;
      return (
        <Link
          className="flex gap-2 items-center pl-4 "
          href={`/administrator/head/home/all-application/${student.studentId}`}
        >
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={
                student.profileImg?.publicUrl || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback className="uppercase">
              {student?.fName?.charAt(0) ?? ""}
              {student?.lName?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize underline">
              {student.lName}, {student.fName} {student.mName}
            </div>
            <p className="text-xs text-muted-foreground">
              {student.Account?.email}
            </p>
          </div>
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row.Account?.schoolId,
    id: "studentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
    cell: ({ row }) => <span className="">{row.getValue("studentId")}</span>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.gender,
    id: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <span className="">{row.getValue("gender")}</span>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.institute,
    id: "institute",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institute" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("institute")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.course,
    id: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course, Year & Section" />
    ),
    cell: ({ row }) => {
      const course = row.original.course ?? "";
      const year = row.original.year ?? "";
      const section = row.original.section ?? "";
      return (
        <div className="flex gap-2 items-center">
          <div className="font-medium capitalize">
            {course} - {year.slice(0, 1)}
            {section}
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.year,
    id: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year Level" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("year")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.section,
    id: "section",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Section" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("section")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row.dateCreated,
    id: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date created" />
    ),
    cell: ({ row }) => (
      <span className="">{format(row.getValue("dateCreated"), "PPP p")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
