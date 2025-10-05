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

export const columns: ColumnDef<ApplicationFormData>[] = [
  {
    accessorFn: (row) => row.Student.fName,
    id: "fName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" className="pl-4" />
    ),
    cell: ({ row }) => {
      const student = row.original.Student;
      return (
        <div className="flex gap-2 items-center pl-4">
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
            <p className="text-xs text-muted-foreground">
              {student.Account.email}
            </p>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row.Student.Account.schoolId,
    id: "Student_Account_studentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
    cell: ({ row }) => (
      <span className="">{row.getValue("Student_Account_studentId")}</span>
    ),
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
      <DataTableColumnHeader column={column} title="Course, Year & Section" />
    ),
    cell: ({ row }) => {
      const course = row.original.Student.course;
      const year = row.original.Student.year;
      const section = row.original.Student.section;
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
    accessorFn: (row) => row.Student.section,
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
    accessorFn: (row) => row.Scholarship.phase,
    id: "phase",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phase" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("phase")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row.dateCreated,
    id: "applicationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Date" />
    ),
    cell: ({ row }) => (
      <span className="">
        {format(row.getValue("applicationDate"), "PPP p")}
      </span>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row.Application_Decision?.dateCreated,
    id: "decisionDateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Processed Date" />
    ),
    cell: ({ row }) => (
      <span className="">
        {row.original.Application_Decision?.dateCreated
          ? format(row.getValue("decisionDateCreated"), "PPP p")
          : "N/A"}
      </span>
    ),
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
              : row.getValue("status") === "BLOCKED"
              ? "bg-gray-500/10 text-gray-500"
              : ""
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
