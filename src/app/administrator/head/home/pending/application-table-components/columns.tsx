"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ApplicationFormData } from "@/hooks/zod/application";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { getPhaseLabel } from "@/lib/phaseLevel";
import { format } from "date-fns";
import Link from "next/link";

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
        <Link
          href={`/administrator/head/home/application/${row.original.applicationId}`}
          className="flex gap-2 items-center pl-4"
        >
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={student.profileImg?.publicUrl || ""}
            />
            <AvatarFallback className="uppercase">
              {student.fName.charAt(0)}
              {student.lName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium capitalize underline">
              {student.fName} {student.mName} {student.lName}
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
    accessorFn: (row) => row.Student.Account?.schoolId,
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
    accessorFn: (row) => row.Scholarship.title,
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scholarship" className="" />
    ),
    cell: ({ row }) => {
      const scholarship = row.original.Scholarship;
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={scholarship.logo} />
            <AvatarFallback className="uppercase">
              {scholarship.Scholarship_Provider?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <div>
              <div className="font-medium capitalize">{scholarship.title}</div>
              <p className="text-xs text-muted-foreground">
                {scholarship.Scholarship_Provider?.name}
              </p>
            </div>
            <Badge className="uppercase" variant="secondary">
              {getPhaseLabel(scholarship.phase)}
            </Badge>
          </div>
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
    id: "dateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Date" />
    ),
    cell: ({ row }) => (
      <span className="">{format(row.getValue("dateCreated"), "PPP p")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorFn: (row) => row?.dateCreated,
    id: "processedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Processed Date" />
    ),
    cell: ({ row }) => {
      const currentPhase = row.original.Scholarship.phase - 1;
      const approved =
        row.original.Application_Decision[currentPhase]?.dateCreated;
      const interview =
        row.original.Interview_Decision[currentPhase]?.dateCreated;

      const status = row.original.status === "INTERVIEW" ? interview : approved;
      return (
        <span className="">{status ? format(status, "PPP p") : "N/A"}</span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <Badge
  //         className={
  //           row.getValue("status") === "PENDING"
  //             ? "bg-yellow-500/10 text-yellow-500"
  //             : row.getValue("status") === "DECLINED"
  //             ? "bg-red-500/10 text-red-500"
  //             : row.getValue("status") === "INTERVIEW"
  //             ? "bg-blue-500/10 text-blue-500"
  //             : row.getValue("status") === "APPROVED"
  //             ? "bg-emerald-500/10 text-emerald-600"
  //             : row.getValue("status") === "BLOCKED"
  //             ? "bg-gray-500/10 text-gray-500"
  //             : ""
  //         }
  //       >
  //         {row.getValue("status") === "PENDING" ? (
  //           <Calendar />
  //         ) : row.getValue("status") === "DECLINED" ? (
  //           <X />
  //         ) : row.getValue("status") === "INTERVIEW" ? (
  //           <MessagesSquare />
  //         ) : row.getValue("status") === "APPROVED" ? (
  //           <Check />
  //         ) : row.getValue("status") === "BLOCKED" ? (
  //           <Ban />
  //         ) : (
  //           ""
  //         )}

  //         {row.getValue("status")}
  //       </Badge>
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
