"use client";

import useScholarshipData from "@/hooks/admin/getScholarship";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Download,
  Text,
  CheckSquare,
  Square,
  FileText,
  Users,
  Filter,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useExportCsv } from "@/hooks/useExportCsv";
import { formatHeader } from "@/lib/csvutils";
import useFetchApplications from "@/hooks/admin/getApplicant";
import { useState } from "react";
import TitleReusable from "@/components/ui/title";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAdminStore } from "@/store/adminUserStore";

export default function ExportCsvScholarship({ status }: { status?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { admin } = useAdminStore();
  const { data } = useScholarshipData({ status, accountId: admin?.accountId });

  // Prepare exportable data
  const exportableData = data.map((meow) => ({
    scholarshipTitle: meow.title,
    scholarshipProvider: meow.Scholarship_Provider?.name ?? "N/A",
    scholarshipGwa: meow.requiredGWA,
    scholarshipDeadline: meow.deadline
      ? format(new Date(meow.deadline), "PPP p")
      : "N/A",
    scholarshipLimit: meow.limit,
    totalPending: meow.pending,
    totalApproved: meow.approved,
    totalRejected: meow.declined,
  }));
  const {
    filename,
    setFilename,
    allHeaders,
    selectedHeaders,
    toggleHeader,
    handleExport,
  } = useExportCsv(exportableData, "scholarship.csv");

  // Filter headers based on search
  const filteredHeaders = allHeaders.filter((header) =>
    formatHeader(header).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select/Deselect all functionality
  const isAllSelected =
    filteredHeaders.length > 0 &&
    filteredHeaders.every((header) => selectedHeaders.includes(header));

  const isSomeSelected = filteredHeaders.some((header) =>
    selectedHeaders.includes(header)
  );

  const handleSelectAll = () => {
    if (isAllSelected) {
      // Deselect all filtered headers
      filteredHeaders.forEach((header) => {
        if (selectedHeaders.includes(header)) {
          toggleHeader(header);
        }
      });
    } else {
      // Select all filtered headers
      filteredHeaders.forEach((header) => {
        if (!selectedHeaders.includes(header)) {
          toggleHeader(header);
        }
      });
    }
  };

  // Group headers by category for better organization
  const headerCategories = {
    "Scholarship Information": [
      "scholarshipTitle",
      "scholarshipProvider",
      "scholarshipGwa",
      "scholarshipDeadline",

      "scholarshipLimit",
      "totalPending",
      "totalApproved",
      "totalRejected",
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={data.length === 0}
          variant="outline"
          size="sm"
          className=" hover:bg-accent transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 border-border !bg-card">
        {/* Header */}
        <DialogHeader className="sr-only">
          <DialogTitle>
            <TitleReusable
              title="Generate Export Report"
              description=""
              Icon={Activity}
            />
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select the data fields you want to include in your CSV export.
            <Badge variant="outline">
              <Users />
              {data.length} records
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div className="flex justify-center gap-3 items-center">
            <TitleReusable title="Generate Export Report" description="" />{" "}
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <Badge variant="outline">
              <UsersRound />
              {data.length} Records
            </Badge>
          </div>
          <div className="text-muted-foreground text-sm">
            Select the data fields you want to include in your CSV export.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10  border-input"
              />
            </div>

            {/* Select All */}
            <Button
              variant="outline"
              onClick={handleSelectAll}
              className="shrink-0  hover:bg-accent"
            >
              {isAllSelected ? (
                <>
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Deselect All
                </>
              ) : (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Select All
                </>
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-cente justify-end r gap-2 text-sm text-muted-foreground">
              {selectedHeaders.length} of {filteredHeaders.length} fields
              selected
            </div>
            {searchTerm && (
              <div className="text-xs text-muted-foreground">
                Showing {filteredHeaders.length} of {allHeaders.length} fields
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="">
          {/* Controls */}

          {/* Selection Summary */}

          {/* Header Grid */}
          <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4 p-4">
            {Object.entries(headerCategories).map(
              ([category, categoryHeaders]) => {
                const visibleHeaders = categoryHeaders.filter(
                  (header) =>
                    allHeaders.includes(header) &&
                    (searchTerm === "" ||
                      formatHeader(header)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
                );

                if (visibleHeaders.length === 0) return null;

                return (
                  <div key={category} className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground/80 px-2">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {visibleHeaders.map((header) => (
                        <div
                          key={header}
                          className={`
                          group relative flex items-start gap-3 rounded-md border p-3 
                          transition-all duration-200 cursor-pointer hover:shadow-sm
                          ${
                            selectedHeaders.includes(header)
                              ? "border-primary/50 bg-primary/5 shadow-sm"
                              : "border-border bg-card hover:border-border/60 hover:bg-accent/30"
                          }
                        `}
                          onClick={() => toggleHeader(header)}
                        >
                          <Checkbox
                            checked={selectedHeaders.includes(header)}
                            onCheckedChange={() => toggleHeader(header)}
                            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />

                          <div className="flex items-center gap-2">
                            <Label className="font-medium text-sm text-foreground cursor-pointer">
                              {formatHeader(header)}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* Export Section */}
          <div className="border-border p-4 space-y-4 sticky bottom-0 ">
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="filename"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Export File Name
                </Label>
                {!selectedHeaders.length && (
                  <p className="text-xs text-destructive/80 flex items-center gap-2">
                    Please select at least one field to export
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <Input
                  id="filename"
                  placeholder="e.g., scholarship_report_2025.csv"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
                <Button
                  onClick={handleExport}
                  disabled={!selectedHeaders.length}
                >
                  <Download />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
