"use client";

import {
  ArrowRightIcon,
  PhilippinePeso,
  Plus,
  SearchIcon,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/administrator/table-components/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/administrator/table-components/data-table-faceted-filter";
import Link from "next/link";
import useGetFilter from "@/hooks/admin/getDynamicFilter";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";
import { useEffect, useState } from "react";
import { ToolbarProps } from "@/app/administrator/table-components/data-table";
import { DeleteDialog } from "@/components/ui/delete-dialog";
export default function DataTableToolbar<TData>({
  table,
  getRowId,
  search,
  setSearch,
}: ToolbarProps<TData>) {
  const { filter } = useGetFilter({ scholarshipStatus: "ACTIVE" });
  const isFiltered = table.getState().columnFilters.length > 0;
  // const amountOptions =
  //   filter?.Scholarships.scholarshipAmount?.map((meow) => ({
  //     value: String(meow),
  //     label: String(meow),
  //   })) || [];

  // const providerOptions =
  //   filter?.Scholarships.scholarshipProvider?.map((meow) => ({
  //     value: meow,
  //     label: meow,
  //   })) || [];
  console.log(filter);
  const amount = filter?.optionsScholarship.scholarshipAmount.value.map(
    (item: string) => ({
      label: item,
      value: item,
      icon: PhilippinePeso,
    })
  );
  const selectedRows = table.getSelectedRowModel().rows;
  const scholarshipId = selectedRows.map((row) =>
    getRowId ? getRowId(row.original) : row.id
  );
  console.log(scholarshipId);

  const [openAlert, setOpenAlert] = useState(false);
  const { onSubmit, isSuccess, deleteLoading } = useDeleteScholarship({
    scholarshipId,
  });
  useEffect(() => {
    if (isSuccess) {
      table.toggleAllRowsSelected(false);
      setOpenAlert(false);
    }
  }, [isSuccess, table]);

  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <Input
            placeholder="Filter scholarship..."
            className="peer ps-9 pe-9 h-8 w-[150px] lg:w-[250px]"
            onChange={(e) => setSearch?.(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRightIcon size={16} aria-hidden="true" />
          </button>
        </div>

        <DataTableFacetedFilter
          disabled={!!search}
          column={table.getColumn("scholarshipAmount")}
          title="Amount"
          options={amount ?? []}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      {selectedRows.length > 0 && (
        <DeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
          onConfirm={onSubmit}
          loading={deleteLoading}
          title="Delete Scholarship?"
          description="Are you sure you want to delete this scholarship?"
          cancelText="Keep"
          trigger={
            <Button size="sm" variant="outline" className="justify-start">
              <Trash2 /> Delete
            </Button>
          }
        />
      )}
      <DataTableViewOptions table={table} />
      <Link prefetch href={`/administrator/home/scholarships/create`}>
        <Button size="sm" variant="secondary" className="relative">
          <Plus /> Add scholarship
        </Button>
      </Link>
    </div>
  );
}
