"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import useScholarshipSearch from "@/hooks/admin/getScholarshipSearch";
import { Input } from "@/components/ui/input";
import useScholarshipData from "@/hooks/admin/getScholarship";
import DynamicHeaderAdmin from "../dynamic-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlignHorizontalDistributeCenter,
  ArrowRightIcon,
  Check,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
  SearchIcon,
  SlidersVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const headers = [
  { label: "Sponsor" },
  { label: "Scholarship Title" },
  { label: "Status" },
  { label: "Deadline" },
  { label: "Approved" },
  { label: "Applicants" },
];
const sortList = [
  {
    value: "",
    label: "No Sort",
  },
  {
    value: "asc",
    label: "Ascending",
  },
  {
    value: "desc",
    label: "Descending",
  },
];
import { cn } from "@/lib/utils";
export default function Manage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const [open, setOpen] = useState(false);
  const { data, loading, totalPages } = useScholarshipData({
    currentPage,
    rowsPerPage,
    sort,
  });

  const [query, setQuery] = useState<string>("");
  console.log(query);
  const { searchData, searchLoading } = useScholarshipSearch({ query });

  return (
    <div className="  min-h-screen px-4">
      <DynamicHeaderAdmin first="Scholarship" second="Manage" />

      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <SlidersVertical size={20} />
          Manage Scholarships ({data.length || "-"})
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse the list of active scholarships. Use the available actions to
          modify or remove entries.
        </p>
        <div className="container mx-auto py-10 space-y-3">
          <div className="flex gap-3 justify-between items-center">
            <div className="relative flex-1">
              <Input
                onChange={(e) => setQuery(e.target.value)}
                className="peer ps-9 pe-9"
                placeholder="Search Student Name or ID..."
                type="search"
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
            <div className="flex gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                  >
                    <AlignHorizontalDistributeCenter />
                    {sort
                      ? sortList.find((framework) => framework.value === sort)
                          ?.label
                      : "Sort by"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {sortList.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setSort(
                                currentValue === sort
                                  ? ""
                                  : (currentValue as "" | "asc" | "desc")
                              );
                              setOpen(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                sort === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button variant="outline">Export CSV</Button>
            </div>
          </div>
          <Table>
            {/* <TableCaption>A list of active scholarships.</TableCaption> */}
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead
                    className={
                      header.label === "Approved" ||
                      header.label === "Applicants"
                        ? "text-center"
                        : ""
                    }
                    key={header.label}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + 2}
                    className="text-center"
                  >
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : !query ? (
                data.length > 0 ? (
                  data.map((row) => (
                    <TableRow
                      key={row.scholarshipId}
                      onClick={() =>
                        router.push(
                          `/administrator/home/manage/${row.scholarshipId}`
                        )
                      }
                    >
                      <TableCell className="">
                        {row.scholarshipProvider}
                      </TableCell>
                      <TableCell className="font-medium">
                        {/* <Link
                          href={`/administrator/home/manage/${row.scholarshipId}`}
                          prefetch={true}
                        > */}

                        <div className="flex gap-2.5 items-center">
                          <img
                            className="size-9 object-cover rounded-full border-2"
                            src={row.scholarshipLogo}
                            alt=""
                          />{" "}
                          {row.scholarshipTitle}
                        </div>
                        {/* </Link> */}
                      </TableCell>
                      <TableCell className="">
                        <Badge className="bg-green-900 text-gray-300">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="">
                        {new Date(row.scholarshipDealine).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.totalApproved}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.totalApplicants}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length + 2}
                      className="text-center"
                    >
                      No result found.
                    </TableCell>
                  </TableRow>
                )
              ) : searchLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + 2}
                    className="text-center"
                  >
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : searchData.length > 0 ? (
                searchData.map((row) => (
                  <TableRow
                    key={row.scholarshipId}
                    onClick={() =>
                      router.push(
                        `/administrator/home/manage/${row.scholarshipId}`
                      )
                    }
                  >
                    <TableCell className="">
                      {row.scholarshipProvider}
                    </TableCell>
                    <TableCell className="font-medium">
                      {/* <Link
                          href={`/administrator/home/manage/${row.scholarshipId}`}
                          prefetch={true}
                        > */}

                      <div className="flex gap-2.5 items-center">
                        <img
                          className="size-9 object-cover rounded-full border-2"
                          src={row.scholarshipLogo}
                          alt=""
                        />{" "}
                        {row.scholarshipTitle}
                      </div>
                      {/* </Link> */}
                    </TableCell>
                    <TableCell className="">
                      <Badge className="bg-green-900 text-gray-300">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="">
                      {new Date(row.scholarshipDealine).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.totalApproved}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.totalApplicants}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + 2}
                    className="text-center"
                  >
                    No result found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!query && data.length !== 0 && (
            <div className="flex items-center justify-between gap-8">
              {/* Results per page */}
              <div className="flex items-center gap-3">
                <Label className="max-sm:sr-only">Rows per page</Label>
                <Select
                  onValueChange={(value) => {
                    setRowsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                  value={rowsPerPage.toString()}
                >
                  <SelectTrigger size="sm" className="w-fit whitespace-nowrap">
                    <SelectValue placeholder="Select number of results" />
                  </SelectTrigger>
                  <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                    {[1, 5, 10, 25, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Page number information */}
              <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                <p
                  className="text-muted-foreground text-sm whitespace-nowrap"
                  aria-live="polite"
                >
                  <span className="text-foreground">{currentPage}</span> of{" "}
                  <span className="text-foreground">{totalPages}</span>
                </p>
              </div>

              {/* Pagination buttons */}

              <div>
                <Pagination>
                  <PaginationContent>
                    {/* First */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        aria-label="Go to first page"
                      >
                        <ChevronFirstIcon size={16} />
                      </Button>
                    </PaginationItem>

                    {/* Previous */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        aria-label="Go to previous page"
                      >
                        <ChevronLeftIcon size={16} />
                      </Button>
                    </PaginationItem>

                    {/* Next */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        aria-label="Go to next page"
                      >
                        <ChevronRightIcon size={16} />
                      </Button>
                    </PaginationItem>

                    {/* Last */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        aria-label="Go to last page"
                      >
                        <ChevronLastIcon size={16} />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
