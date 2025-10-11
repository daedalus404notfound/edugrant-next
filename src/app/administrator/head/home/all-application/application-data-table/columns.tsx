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
import { useState } from "react";
import { format } from "date-fns";
import { StudentUserFormData } from "@/hooks/user/zodUserProfile";

export const columns: ColumnDef<StudentUserFormData>[] = [
  {
    accessorFn: (row) => row.fName,
    id: "fName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" className="pl-4" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center pl-4">
          <Avatar>
            <AvatarImage src={`/avatars/${row.original.studentId}.jpg`} />
            <AvatarFallback className="uppercase">
              {row.original.fName.charAt(0)}
              {row.original.lName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize">
              {row.original.fName} {row.original.mName} {row.original.lName}
            </div>
            <p className="text-xs text-muted-foreground">
              {row.original.Account?.email}
            </p>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row.Account?.schoolId,
    id: "schoolId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
    cell: ({ row }) => <span className="">{row.getValue("schoolId")}</span>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.gender,
    id: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("gender")}</span>
    ),
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
      const course = row.original.course;
      const year = row.original.year;
      const section = row.original.section;
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
    id: "accountCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Created" />
    ),
    cell: ({ row }) => (
      <span className="">
        {row.original.dateCreated
          ? format(row.getValue("accountCreated"), "PPP p")
          : "N/A"}
      </span>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
