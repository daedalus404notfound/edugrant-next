"use client";
import { GraduationCap, RefreshCcw } from "lucide-react";
import { columns } from "./manage-table-components/columns";
import DataTableToolbar from "./manage-table-components/data-table-toolbar";
import TitleReusable from "@/components/ui/title";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "@/assets/post-undraw.svg";
import { Tabs } from "@/components/ui/vercel-tabs";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import useScholarshipData from "@/hooks/admin/getScholarship";
import { DataTable } from "@/app/table-components/data-table";
import { useHeadScholarshipStore } from "@/store/headScholarshipMeta";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { TourTrigger } from "@/components/tour-2/tour-trigger";
import { useTourStore } from "@/store/useTourStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Manage() {
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
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");
  const { query, meta } = useScholarshipData({
    status,
    pagination,
    sorting,
    columnFilters,
    search,
  });
  const {
    openEditScholarship,
    setOpenEditScholarship,
    openRenewScholarship,
    setOpenRenewScholarship,
  } = useTourStore();
  console.log(openEditScholarship);
  const tabs = [
    {
      id: "ACTIVE",
      label: "Active",
      indicator: meta.count?.countActive ? meta.count?.countActive : null,
    },
    {
      id: "RENEW",
      label: "Renewals",
      indicator: meta.count?.countRenew ? meta.count?.countRenew : null,
    },
  ];
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [status, sorting, search, columnFilters]);

  const isLoading = query.isLoading;
  const data = query.data?.data ?? [];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-85px)] min-h-[calc(100dvh-134px)] ">
      <Dialog open={openEditScholarship} onOpenChange={setOpenEditScholarship}>
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
              <TitleReusable title="Edit Scholarship Tour" description="" />
            </DialogTitle>
            <DialogDescription className="mt-3">
              Learn how to efficiently update and manage your scholarship
              details. Take a quick guided tour to understand each editing step,
              or skip it to begin making changes right away.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-3">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setOpenEditScholarship(false)}
            >
              Skip for Now
            </Button>
            <div
              onClick={() => {
                setOpenEditScholarship(false);
              }}
              className="flex-1 "
            >
              <TourTrigger
                tourName="editScholarship"
                className="h-9 !bg-green-900 !text-gray-200 !border-0 w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto w-[95%] lg:py-10  py-4">
        {status === "ACTIVE" ? (
          <TitleReusable
            title="Active Scholarships"
            description="Browse and manage all currently active scholarships. Use the tabs below to switch between active scholarships and renewals."
            Icon={GraduationCap}
          />
        ) : (
          <TitleReusable
            title="Scholarship Renewals"
            description="Browse and manage scholarship renewals. Use the tabs below to switch between active scholarships and renewals."
            Icon={RefreshCcw}
            textColor="text-blue-700/70"
          />
        )}

        <div className="overflow-y-hidden overflow-x-auto pb-1.5 pt-6 no-scrollbar border-b sticky top-0 bg-background z-20">
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
            // customLink={true}
            // setLink="/administrator/head/home/manage"
          />
        </div>
      </div>
    </div>
  );
}
