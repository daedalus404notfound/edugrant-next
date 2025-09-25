"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ApplicationFormData } from "@/hooks/zod/application";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { getPhaseLabel } from "@/lib/phaseLevel";
export const columns: ColumnDef<ApplicationFormData>[] = [
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
    accessorKey: "fName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const student = row.original.Student;
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={`/avatars/${student.studentId}.jpg`} />
            <AvatarFallback className="uppercase">
              {student.fName.charAt(0)}
              {student.lName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize">
              {student.fName} {student.mName} {student.lName}
            </div>
            {/* <p className="text-xs text-muted-foreground">{student?.email}</p> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.Student.Account.schoolId,
    id: "schoolId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
    cell: ({ row }) => <span className="">{row.getValue("schoolId")}</span>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.Student.institute,
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
    accessorFn: (row) => row.Student.course,
    id: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("course")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.Student.year,
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
    accessorFn: (row) => ({
      title: row.Scholarship?.title,
      renew: row.Scholarship?.phase,
    }),
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scholarship" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("title") as {
        title?: string;
        phase?: number;
      };
      return (
        <div className="flex items-center gap-2">
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          className={
            row.getValue("status") === "PENDING"
              ? "bg-yellow-500/10 text-yellow-500"
              : row.getValue("status") === "DECLINED"
              ? "bg-red-500/10 text-red-500"
              : row.getValue("status") === "INTERVIEW"
              ? "bg-blue-500/10 text-blue-500"
              : row.getValue("status") === "APPROVED"
              ? "bg-green-500/10 text-green-500"
              : "bg-gray-500/10 text-gray-400"
          }
        >
          <Clock />
          {row.getValue("status")}
        </Badge>
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
