"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Activity, Download, File, Loader, UserRound } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import TitleReusable from "@/components/ui/title";
import { Input } from "@/components/ui/input";
import useFetchApplicationCSVShit from "@/hooks/admin/getShit";
import useFetchApplicationCSV from "@/hooks/admin/getApplicationCSV";

export default function ExportCsvScholarship({ status }: { status?: string }) {
  const { data, loading, onSubmitting } = useFetchApplicationCSVShit({
    accountId: 3,
  });

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  console.log(selectedFields);
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedFields([...data]); 
    } else {
      setSelectedFields([]); 
    }
  };

  const handleFieldToggle = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedFields((prev) => [...prev, value]);
    } else {
      setSelectedFields((prev) => prev.filter((item) => item !== value));
    }
  };
  const allSelected = selectedFields.length === data.length && data.length > 0;
  const {
    loading: loadingCSV,
    onSubmit,
    setFilename,
  } = useFetchApplicationCSV({
    accountId: 3,
    dataSelections: JSON.stringify(selectedFields), // works directly
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onSubmitting}
          variant="outline"
          size="sm"
          className=" hover:bg-accent transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full p-6 border-border bg-background">
        <DialogHeader>
          <DialogTitle>
            <TitleReusable
              title="Generate Export Report"
              description="  Select the data fields you want to include in your CSV export."
              Icon={Activity}
            />
          </DialogTitle>
          <DialogDescription className="text-muted-foreground"></DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={allSelected}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="text-sm ">
              Select All
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {data.map((item) => (
            <div
              key={item}
              className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
            >
              <Checkbox
                className="order-1 after:absolute after:inset-0"
                checked={selectedFields.includes(item)}
                onCheckedChange={(checked) =>
                  handleFieldToggle(item, checked as boolean)
                }
              />
              <div className="grid grow gap-2">
                <Label className="line-clamp-1 capitalize">{item}</Label>
              </div>
            </div>
          ))}
        </div>{" "}
        <div className="flex items-center gap-3 justify-end">
          {selectedFields.length === 0 ? (
            <p className="text-red-700 text-sm font-medium">
              Select at least one header to export data.
            </p>
          ) : (
            <p className="text-green-700 text-sm font-medium">
              Select headers needed for export
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Input
            disabled={loadingCSV || selectedFields.length === 0}
            onChange={(e) => setFilename(e.target.value)}
            className="max-w-sm"
            placeholder="Filename"
          />
          <Button
            disabled={loadingCSV || selectedFields.length === 0}
            onClick={onSubmit}
          >
            {loadingCSV ? (
              <>
                Exporting... <Loader className="animate-spin" />
              </>
            ) : (
              <>
                {" "}
                Export Excel <Download />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
