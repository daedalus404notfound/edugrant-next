"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ApplicationFormData } from "@/hooks/zod/application";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
export const columns: ColumnDef<ApplicationFormData>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader className="pl-4" column={column} title="Name" />
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
            {/* <p className="text-xs text-muted-foreground">{student?.email}</p> */}
          </div>
        </div>
      );
    },
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
    accessorKey: "scholarshipTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scholarship" />
    ),
    cell: ({ row }) => {
      const scholar = row.original.Scholarship;
      return <div className="font-medium truncate  w-50">{scholar.title}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) =>
      `${row.Student.course} - ${row.Student.year.slice(0, 1)}${
        row.Student.section
      }`,
    id: "Course_Year_&_Section",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course, Year & Section" />
    ),
    cell: ({ row }) => <span>{row.getValue("Course_Year_&_Section")}</span>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "institute",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institute" />
    ),
    cell: ({ row }) => {
      const scholar = row.original.Student;
      return (
        <div className="font-medium truncate  w-50">{scholar.institute}</div>
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
  // {
  //   accessorKey: "applicationDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Application Date" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[500px] truncate">
  //         {format(
  //           (row.getValue("applicationDate")),
  //           "MMM d, yyyy 'at' hh:mm a"
  //         )}
  //       </span>
  //     );
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
