"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { DataTableColumnHeader } from "@/app/table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { getPhaseLabel } from "@/lib/phaseLevel";
import { AnnouncementFormDataGet } from "@/hooks/zod/announcement";
import { Textarea } from "@/components/ui/textarea";
export const columns: ColumnDef<AnnouncementFormDataGet>[] = [
  // {
  //   accessorKey: "title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader className="pl-4" column={column} title="Title" />
  //   ),
  //   cell: ({ row }) => {
  //     const { title, logo } = row.original;
  //     return
  //       <div className="flex gap-2  items-center pl-4">
  //         <Avatar>
  //           <AvatarImage className="object-cover" src={logo} />
  //           <AvatarFallback>
  //             {row.original.Scholarship_Provider.name.slice(0, 1)}
  //           </AvatarFallback>
  //         </Avatar>
  //         <div>
  //           <div className="font-medium truncate">{title}</div>
  //         </div>
  //       </div>
  //     );
  //   },
  // },

  {
    accessorFn: (row) => row.title,
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("title")}</span>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.description,
    id: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="w-full overflow-hidden truncate whitespace-nowrap">
          {row.getValue("description")}
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} status={status} />,
  },
];
