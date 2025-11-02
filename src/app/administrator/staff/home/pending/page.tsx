"use client";
import "ldrs/react/Ring.css";
import { useState } from "react";
import { DataTable } from "@/app/table-components/data-table";
import { columns } from "../staff-application-table-components/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import DataTableToolbar from "../staff-application-table-components/data-table-toolbar";
import { ApplicationFormData } from "@/hooks/zod/application";

import useApplicationDataStaff from "@/hooks/staff/getApplicationStaff";
import TitleReusable from "@/components/ui/title";
import { Clock, Hourglass } from "lucide-react";
import { useTourStore } from "@/store/useTourStore";
import { Button } from "@/components/ui/button";
import { TourTrigger } from "@/components/tour-2/tour-trigger";

export default function PendingStaffApplication() {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    phase: false,
    section: false,
    year: false,
    institute: false,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, meta, isLoading } = useApplicationDataStaff({
    pagination,
    sorting,
    columnFilters,
    status,
    search,
  });
  const { reviewPending, setReviewPending } = useTourStore();
  return (
    <div className="lg:px-4 lg:min-h-[calc(100vh-85px)] min-h-[calc(100dvh-134px)] ">
      <Dialog open={reviewPending} onOpenChange={setReviewPending}>
        <DialogContent
          className="!bg-card w-lg p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>
              <TitleReusable title="Review Application Tour" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Learn how to efficiently review a application details. Take a
              quick guided tour to understand each reviewing step, or skip it to
              begin making changes right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setReviewPending(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setReviewPending(false);
              }}
              className="flex-1 "
            >
              {data.length === 0 ? (
                <Button disabled>No data for demonstration</Button>
              ) : (
                <TourTrigger
                  tourName="reviewApplication"
                  className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <TitleReusable
          title="Pending Applications"
          textColor="text-yellow-700/70"
          Icon={Clock}
          description="Applicants currently waiting for review."
        />

        <div className="py-8 space-y-5">
          <DataTable<ApplicationFormData, unknown>
            data={data}
            columns={columns}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.applicationId.toString()}
            loading={isLoading}
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            toolbar={DataTableToolbar}
            columnVisibility={columnVisibility} // <-- pass visibility
            setColumnVisibility={setColumnVisibility} // <-- pass setter
          />
        </div>
      </div>
    </div>
  );
}
