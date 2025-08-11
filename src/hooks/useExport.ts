// // useCsvExport.ts - Custom Hook
// import { useCallback } from "react";
// import Papa from "papaparse";

// export interface CsvExportOptions {
//   filename?: string;
//   selectedHeaders?: string[];
// }

// export const useCsvExport = <T extends Record<string, any>>() => {
//   const exportToCsv = useCallback(
//     (data: T[], options: CsvExportOptions = {}) => {
//       const { filename = "export.csv", selectedHeaders } = options;

//       if (!data || data.length === 0) {
//         console.warn("No data to export");
//         return;
//       }

//       let processedData = data;

//       // Filter data to only include selected headers if specified
//       if (selectedHeaders && selectedHeaders.length > 0) {
//         processedData = data.map((row) => {
//           const filteredRow: Partial<T> = {};
//           selectedHeaders.forEach((header) => {
//             if (header in row) {
//               filteredRow[header as keyof T] = row[header];
//             }
//           });
//           return filteredRow as T;
//         });
//       }

//       // Convert to CSV
//       const csv = Papa.unparse(processedData, {
//         header: true,
//         skipEmptyLines: true,
//       });

//       // Create and trigger download
//       const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);

//       link.setAttribute("href", url);
//       link.setAttribute("download", filename);
//       link.style.visibility = "hidden";

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       URL.revokeObjectURL(url);
//     },
//     []
//   );

//   return { exportToCsv };
// };
