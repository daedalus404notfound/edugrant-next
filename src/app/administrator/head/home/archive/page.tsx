"use client";
import { Archive, Clock, GraduationCap } from "lucide-react";
import { columns } from "../manage/manage-table-components/columns";
import DataTableToolbar from "../manage/manage-table-components/data-table-toolbar";
import TitleReusable from "@/components/ui/title";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { DataTable } from "@/app/table-components/data-table";
import { useHeadInactiveScholarshipStore } from "@/store/headInactiveScholarshipStore";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { useHeadScholarshipStore } from "@/store/headScholarshipMeta";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useTourStore } from "@/store/useTourStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
export default function Manage() {
  const {
    openEditScholarship,
    setOpenEditScholarship,
    openRenewScholarship,
    setOpenRenewScholarship,
  } = useTourStore();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [status, setStatus] = useState("EXPIRED");
  const [search, setSearch] = useState("");
  const { query, meta } = useScholarshipData({
    status,
    pagination,
    sorting,
    columnFilters,
    search,
  });

  const tabs = [
    {
      id: "EXPIRED",
      label: "Expired",
      indicator: meta.count.countExpired ? meta.count.countExpired : null,
    },
    {
      id: "ENDED",
      label: "Ended",
      indicator: meta.count.countEnded ? meta.count.countEnded : null,
    },
  ];

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [status, sorting, search, columnFilters]);

  const isLoading = query.isLoading;
  const data = query.data?.data ?? [];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      {" "}
      <Dialog
        open={openRenewScholarship}
        onOpenChange={setOpenRenewScholarship}
      >
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
              <TitleReusable title="Post scholarship guide" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Begin managing scholarship programs. You can take a quick tour to
              learn the process, or skip it and start right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenRenewScholarship(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setOpenRenewScholarship(false);
              }}
              className="flex-1 "
            >
              <TourTrigger
                tourName="renewScholarship"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        {status === "EXPIRED" ? (
          <TitleReusable
            title="Inactive Scholarships"
            description="View and manage all scholarships that are currently inactive. Use the tabs below to navigate between inactive and ended scholarships."
            Icon={Archive} // remains Archive for inactive
            textColor="text-red-700/70"
          />
        ) : (
          <TitleReusable
            title="Ended Scholarships"
            description="View and manage all scholarships that have ended. Use the tabs below to navigate between inactive and ended scholarships."
            Icon={Clock} // changed to Clock to represent ended
            textColor="text-emerald-700/70"
          />
        )}

        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b">
          <Tabs
            tabs={tabs}
            activeTab={status}
            onTabChange={(tabId) => setStatus(tabId)}
          />
        </div>
        <div className="mt-10 lg:w-full md:min-w-5xl w-full mx-auto">
          <DataTable<scholarshipFormData, unknown>
            data={data}
            columns={columns(status)}
            meta={meta}
            pagination={pagination}
            setPagination={setPagination}
            getRowId={(row) => row.scholarshipId.toString()}
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
          />
        </div>
      </div>
    </div>
  );
}
