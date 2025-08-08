"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/vercel-tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

import DynamicHeaderAdmin from "../dynamic-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileDown,
  SearchIcon,
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
import useAdminReview from "@/hooks/admin/getApplicant";

const headers = [
  { label: "Student ID" },
  { label: "Student Name" },
  { label: "Course, Year & Section" },
  { label: "Scholarship" },
  { label: "Status" },
  { label: "Application Date" },
];

import ApplicationFilter from "./filter";
import useApplicationpSearch from "@/hooks/admin/getApplicantSearch";
import { Badge } from "@/components/ui/badge";
import SortApplicants from "./sort";

export default function Manage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState("");
  const [scholar, setScholar] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [sort, setSort] = useState<"" | "asc" | "desc" | "newest" | "oldest">(
    ""
  );

  const { data, loading, totalPages } = useAdminReview({
    currentPage,
    rowsPerPage,
    sort,
    scholar,
    course,
    year,
    section,
    status,
  });

  const tabs = [
    { id: "", label: "All Applicants", indicator: "1" },
    { id: "PENDING", label: "Under Review", indicator: "1" },
    { id: "APPROVE", label: "Approved", indicator: "1" },
    { id: "DECLINE", label: "Declined", indicator: "1" },
  ];

  const [query, setQuery] = useState<string>("");

  const { searchData, searchLoading } = useApplicationpSearch({
    query,
    status,
  });

  return (
    <div className="   min-h-screen px-4">
      <DynamicHeaderAdmin first="Applicants" second="Manage Applicants" />

      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        {/* <h1 className="text-2xl font-semibold flex items-center gap-2">
          <UsersRound />
          Pending Review
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review submitted documents and take action on scholarship
          applications. You can approve, decline, or manage applicants.
        </p> */}
        <div className="container mx-auto ">
          <div className="flex gap-3 justify-between">
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

            <div className="flex gap-3 items-center">
              {" "}
              <SortApplicants query={query} setSort={setSort} sort={sort} />
              <ApplicationFilter
                setCourse={setCourse}
                setYear={setYear}
                setScholar={setScholar}
                setSections={setSection}
                scholar={scholar}
                course={course}
                year={year}
                section={section}
                disable={query !== ""}
              />
              <Button variant="outline">
                <FileDown />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="flex justify-between  mt-8">
            <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />
            <div className="space-x-1.5 uppercase">
              {course && <Badge variant="secondary">{course}</Badge>}

              {year && <Badge variant="secondary">{year} Year</Badge>}
              {section && <Badge variant="secondary">Section {section}</Badge>}
              {scholar && <Badge variant="secondary">{scholar}</Badge>}
            </div>
          </div>
          <div className="mt-7">
            <Table>
              {/* <TableCaption>A list of active scholarships.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead
                      className={
                        header.label === "Application Date" ? "text-center" : ""
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
                    <TableCell colSpan={headers.length} className="text-center">
                      <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                    </TableCell>
                  </TableRow>
                ) : !query ? (
                  data.length > 0 ? (
                    data.map((row) => (
                      <TableRow
                        key={row.applicationId}
                        onClick={() =>
                          router.push(
                            `/administrator/home/applicants/${row.applicationId}`
                          )
                        }
                        onMouseEnter={() =>
                          router.prefetch(
                            `/administrator/home/applicants/${row.applicationId}`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <TableCell className="">
                          {row.student.studentId}
                        </TableCell>
                        <TableCell className="font-medium flex items-center gap-3">
                          {/* <Link
                          href={`/administrator/home/applicants/${row.applicationId}`}
                          scroll={false}
                          prefetch={true}
                          className="underline h-full w-full"
                        > */}
                          {`${row.student.lastName}, ${row.student.firstName} ${row.student.middleName}`}
                          {/* </Link> */}
                        </TableCell>

                        <TableCell>
                          {`${row.student.course}-
                        ${row.student.year.slice(0, 1)}${row.student.section}`}
                        </TableCell>
                        <TableCell>
                          {row.scholarship.scholarshipTitle}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              row.status == "APPROVE"
                                ? "bg-green-800"
                                : row.status == "PENDING"
                                ? "bg-yellow-700"
                                : row.status === "DECLINE"
                                ? "bg-red-800"
                                : ""
                            } text-gray-200`}
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {row.applicationDate
                            ? format(row.applicationDate, "PPP")
                            : "Not specified"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={headers.length}
                        className="text-center"
                      >
                        No result found.
                      </TableCell>
                    </TableRow>
                  )
                ) : searchLoading ? (
                  <TableRow>
                    <TableCell colSpan={headers.length} className="text-center">
                      <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                    </TableCell>
                  </TableRow>
                ) : searchData.length > 0 ? (
                  searchData.map((row) => (
                    <TableRow
                      key={row.applicationId}
                      onClick={() =>
                        router.push(
                          `/administrator/home/applicants/${row.applicationId}`
                        )
                      }
                      onMouseEnter={() =>
                        router.prefetch(
                          `/administrator/home/applicants/${row.applicationId}`
                        )
                      }
                      className="cursor-pointer"
                    >
                      <TableCell className="">
                        {row.student.studentId}
                      </TableCell>
                      <TableCell className="font-medium flex items-center gap-3">
                        {`${row.student.lastName}, ${row.student.firstName} ${row.student.middleName}`}
                      </TableCell>

                      <TableCell>
                        {`${row.student.course}-
                        ${row.student.year.slice(0, 1)}${row.student.section}`}
                      </TableCell>
                      <TableCell>{row.scholarship.scholarshipTitle}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            row.status == "APPROVE"
                              ? "bg-green-800"
                              : row.status == "PENDING"
                              ? "bg-yellow-700"
                              : row.status === "DECLINE"
                              ? "bg-red-800"
                              : ""
                          } text-gray-200`}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {row.applicationDate
                          ? format(row.applicationDate, "PPP")
                          : "Not specified"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length} className="text-center">
                      No result found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {!query && data.length !== 0 && !loading && (
            <div className="flex items-center justify-between gap-8 mt-3">
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
