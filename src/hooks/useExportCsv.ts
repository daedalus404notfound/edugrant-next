import { useState } from "react";
import { generateCSV } from "@/lib/csvutils";

export function useExportCsv<T extends Record<string, any>>(
  data: T[],
  defaultFilename = "export.csv"
) {
  const allHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>(allHeaders);
  const [filename, setFilename] = useState(defaultFilename);

  const toggleHeader = (header: string) => {
    setSelectedHeaders((prev) =>
      prev.includes(header)
        ? prev.filter((h) => h !== header)
        : [...prev, header]
    );
  };

  const handleExport = () => {
    generateCSV(data, selectedHeaders, filename);
  };

  return {
    filename,
    setFilename,
    allHeaders,
    selectedHeaders,
    toggleHeader,
    handleExport,
  };
}
