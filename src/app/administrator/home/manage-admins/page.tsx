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
  Activity,
  Check,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Download,
  Plus,
  SearchIcon,
  UserRound,
  UsersRound,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const headers = [
  { label: "Name " },
  { label: "Role" },
  { label: "Status" },
  { label: "Date Created" },
  { label: "Last login" },
];

const sortList = [
  {
    value: "",
    label: "Default",
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

const mockAdminProfiles = [
  {
    id: "1",
    firstName: "John",
    middleName: "Anderson",
    lastName: "Doe",
    gender: "Male",
    role: "Super Admin",
    studentEmail: "john.doe@example.com",
    contactNumber: "+639171234567",
    password: "P@ssw0rd123",
    status: "Active",
    dateCreated: "2025-05-10T08:30:00.000Z",
    lastLogin: "2025-08-14T02:45:00.000Z",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    firstName: "Maria",
    middleName: "Santos",
    lastName: "Reyes",
    gender: "Female",
    role: "Admin",
    studentEmail: "maria.reyes@example.com",
    contactNumber: "+639182345678",
    password: "SecurePass!45",
    status: "Offline",
    dateCreated: "2025-03-22T15:10:00.000Z",
    lastLogin: "2025-08-12T14:25:00.000Z",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    firstName: "David",
    middleName: "Lee",
    lastName: "Cruz",
    gender: "Male",
    role: "Moderator",
    studentEmail: "david.cruz@example.com",
    contactNumber: "+639193456789",
    password: "MyPassword#99",
    status: "Active",
    dateCreated: "2025-07-01T09:15:00.000Z",
    lastLogin: "2025-08-14T08:55:00.000Z",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

import { cn } from "@/lib/utils";
import { ArrowSwapVertical } from "iconsax-reactjs";
export default function ManageAdmins() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(true);
  const [query, setQuery] = useState<string>("");
  console.log(query);

  return (
    <div className="min-h-screen px-4 relative z-10">
      <DynamicHeaderAdmin first="Scholarship" second="Manage" />

      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <motion.span
          className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-2xl font-semibold flex items-center gap-1.5
          "
          initial={{ backgroundPosition: "200% 0" }}
          animate={{ backgroundPosition: "-200% 0" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 7,
            ease: "linear",
          }}
        >
          <UsersRound strokeWidth={3} />
          Manage Administrators
        </motion.span>
        <p className="text-sm text-gray-300 mt-1">
          Browse the list of active scholarships. Use the available actions to
          modify or remove entries.
        </p>
        <div className="flex gap-3 justify-between items-center mt-5">
          <div className="relative w-xl">
            <Input
              onChange={(e) => setQuery(e.target.value)}
              className="peer ps-9 pe-9"
              placeholder="Search Scholarship Name..."
              type="search"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
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
                  <ArrowSwapVertical className="opacity-60" />
                  {sort
                    ? sortList.find((framework) => framework.value === sort)
                        ?.label
                    : "Sort"}
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

            <Button variant="outline">
              <Download /> Export
            </Button>
          </div>
        </div>

        <div className="container mx-auto space-y-3 mt-5">
          <Table>
            {/* <TableCaption>A list of active scholarships.</TableCaption> */}
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header.label}>{header.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={headers.length + 2}>
                    <Ring size={30} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : !query ? (
                mockAdminProfiles.length > 0 ? (
                  mockAdminProfiles.map((row) => (
                    <TableRow
                      key={row.role}
                      onClick={() =>
                        router.push(
                          `/administrator/home/manage-admins/${row.id}`
                        )
                      }
                    >
                      <TableCell className="flex gap-2.5 items-center">
                        <img
                          className="size-9 object-cover rounded-full"
                          src={row.avatar}
                          alt=""
                        />
                        <div className="space-y-1">
                          <p className="font-semibold">{row.firstName}</p>
                          <p className="text-xs"> {row.studentEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {row.dateCreated &&
                          format(row.dateCreated, "MMM d, yyyy 'at' h:mm a")}
                      </TableCell>
                      <TableCell className="">
                        <Badge className="bg-red-900 text-gray-300">
                          {row.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="">{row.status}</TableCell>

                      <TableCell>
                        {row.lastLogin &&
                          format(row.lastLogin, "MMM d, yyyy 'at' h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length + 2}>
                      No result found.
                    </TableCell>
                  </TableRow>
                )
              ) : searchLoading ? (
                <TableRow>
                  <TableCell colSpan={headers.length + 2}>
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : mockAdminProfiles.length > 0 ? (
                mockAdminProfiles.map((row) => (
                  <TableRow
                    key={row.role}
                    onClick={() =>
                      router.push(`/administrator/home/manage-admins/${row.id}`)
                    }
                  >
                    <TableCell className="flex gap-2.5 items-center">
                      <img
                        className="size-9 object-cover rounded-full"
                        src={row.avatar}
                        alt=""
                      />
                      <div className="space-y-1">
                        <p className="font-semibold">{row.firstName}</p>
                        <p className="text-xs"> {row.studentEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="">
                      <Badge className="bg-red-900 text-gray-300">
                        {row.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="">{row.status}</TableCell>

                    <TableCell>{row.dateCreated}</TableCell>
                    <TableCell>{row.lastLogin}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headers.length + 2}>
                    No result found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!query && mockAdminProfiles.length !== 0 && (
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
