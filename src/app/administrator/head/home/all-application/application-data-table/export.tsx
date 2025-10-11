"use client";

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

export default function ExportCsvScholarship({ status }: { status?: string }) {
  const { data } = useFetchApplications({ status });
  const headers = [
    { name: "First Name", value: "fName" },
    { name: "Middle Name", value: "mName" },
    { name: "Last Name", value: "lName" },
    { name: "Student ID", value: "schoolId" },
    { name: "Gender", value: "gender" },
    { name: "Institute", value: "fName" },
    { name: "", value: "fName" },
    { name: "", value: "fName" },
    { name: "", value: "fName" },
    { name: "", value: "fName" },
    { name: "", value: "fName" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={data.length === 0}
          variant="outline"
          size="sm"
          className="bg-background hover:bg-accent transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 border-border bg-background">
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

        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className=""></div>
      </DialogContent>
    </Dialog>
  );
}
