"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScholarshipTypes } from "@/hooks/types";
import { useState } from "react";
import { Button } from "./button";
import { Export } from "iconsax-reactjs";
import { Activity, Braces, Download, Text } from "lucide-react";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { Input } from "./input";

type JsonRecord = Record<string, unknown>;

/**
 * Convert JSON array into CSV string with custom headers
 */
function jsonToCsv(data: JsonRecord[], headers: string[]): string {
  if (!data.length) return "";

  const csvRows = [headers.join(",")];

  for (const row of data) {
    const values = headers.map((header) => JSON.stringify(row[header] ?? ""));
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

/**
 * ExportCSV button
 */
function ExportCSV({
  data,
  headers,
  filename,
}: {
  data: JsonRecord[];
  headers: string[];
  filename: string;
}) {
  const handleExport = () => {
    const csv = jsonToCsv(data, headers);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={headers.length === 0}
      variant="destructive"
    >
      <Download /> Download CSV
    </Button>
  );
}
function formatHeader(header: string): string {
  return header
    .replace(/([A-Z])/g, " $1") // insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
}

export default function ExportScholarshipDialog({
  data,
}: {
  data: JsonRecord[];
}) {
  const [filename, setFilename] = useState("scholarships.csv");
  // const excludeHeaders = [
  //   "scholarshipId",
  //   "adminId",
  //   "scholarshipCloudinaryId",
  //   "scholarshipDocuments",
  //   "scholarshipLogo",
  //   "scholarshipCover",
  //   "applicationId",
  //   "userId",
  //   "userPassword",
  // ];
  // const allHeaders =
  //   data.length > 0
  //     ? Object.keys(data[0]).filter((key) => !excludeHeaders.includes(key))
  //     : [];
  const allHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>(allHeaders);
  const toggleHeader = (header: string) => {
    setSelectedHeaders((prev) =>
      prev.includes(header)
        ? prev.filter((h) => h !== header)
        : [...prev, header]
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={data.length === 0} variant="outline" size="sm">
          <Download /> Download CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full p-8 space-y-5">
        <DialogHeader>
          <DialogTitle className="flex gap-3 items-center">
            <Activity />
            Generate Report
          </DialogTitle>
          <DialogDescription>
            Choose which fields to include and download your scholarship data as
            a CSV file.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {allHeaders.map((header) => (
            <div
              key={header}
              className="border-transparent has-data-[state=checked]:border-red-900 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none bg-card"
            >
              <Checkbox
                checked={selectedHeaders.includes(header)}
                onCheckedChange={() => toggleHeader(header)}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="flex grow items-center gap-3">
                <Text />
                <div className="grid gap-2">
                  <Label>{formatHeader(header)}</Label>
                  <p className="text-muted-foreground text-xs line-clamp-1">
                    Include {formatHeader(header)} in the exported file.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Export button */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex gap-3 w-full">
            <Label>Export File Name</Label>
            <div className="flex-1">
              <Input
                placeholder="e.g., scholarships_report.csv"
                onChange={(e) => setFilename(e.target.value)}
              />
            </div>
          </div>
          <ExportCSV
            data={data}
            filename={filename}
            headers={selectedHeaders}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
