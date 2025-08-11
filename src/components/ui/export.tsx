// import { useCsvExport } from "@/hooks/useExport";
// import { useState, useMemo, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export interface CsvExportButtonProps<T extends Record<string, any>> {
//   data: T[];
//   filename?: string;
//   buttonText?: string;
//   className?: string;
//   showHeaderSelection?: boolean;
//   onExport?: () => void;
//   variant?:
//     | "default"
//     | "destructive"
//     | "outline"
//     | "secondary"
//     | "ghost"
//     | "link";
//   size?: "default" | "sm" | "lg" | "icon";
// }

// export const CsvExportButton = <T extends Record<string, any>>({
//   data,
//   filename = "export.csv",
//   buttonText = "Export CSV",
//   className = "",
//   showHeaderSelection = true,
//   onExport,
//   variant = "default",
//   size = "default",
// }: CsvExportButtonProps<T>) => {
//   const { exportToCsv } = useCsvExport<T>();
//   const [showModal, setShowModal] = useState(false);
//   const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);

//   // Get all available headers from the data
//   const availableHeaders = useMemo(() => {
//     if (!data || data.length === 0) return [];

//     const headersSet = new Set<string>();
//     data.forEach((row) => {
//       Object.keys(row).forEach((key) => headersSet.add(key));
//     });

//     return Array.from(headersSet);
//   }, [data]);

//   useEffect(() => {
//     if (availableHeaders.length > 0 && selectedHeaders.length === 0) {
//       setSelectedHeaders(availableHeaders);
//     }
//   }, [availableHeaders]);

//   const handleExport = () => {
//     if (!showHeaderSelection) {
//       // Export all data without header selection
//       exportToCsv(data, { filename });
//     } else {
//       // Export with selected headers
//       exportToCsv(data, { filename, selectedHeaders });
//     }

//     setShowModal(false);
//     onExport?.();
//   };

//   const handleHeaderToggle = (header: string, checked: boolean) => {
//     setSelectedHeaders((prev) =>
//       checked ? [...prev, header] : prev.filter((h) => h !== header)
//     );
//   };

//   const selectAllHeaders = () => {
//     setSelectedHeaders(availableHeaders);
//   };

//   const deselectAllHeaders = () => {
//     setSelectedHeaders([]);
//   };

//   if (!data || data.length === 0) {
//     return (
//       <Button disabled variant={variant} size={size} className={className}>
//         {buttonText} (No Data)
//       </Button>
//     );
//   }

//   return (
//     <>
//       <Button
//         onClick={() =>
//           showHeaderSelection ? setShowModal(true) : handleExport()
//         }
//         variant={variant}
//         size={size}
//         className={className}
//       >
//         {buttonText}
//       </Button>

//       <Dialog open={showModal} onOpenChange={setShowModal}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Select Headers to Export</DialogTitle>
//             <DialogDescription>
//               Choose which columns you want to include in your CSV export.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4">
//             <div className="flex gap-2">
//               <Button onClick={selectAllHeaders} variant="outline" size="sm">
//                 Select All
//               </Button>
//               <Button onClick={deselectAllHeaders} variant="outline" size="sm">
//                 Deselect All
//               </Button>
//             </div>

//             <ScrollArea className="h-64 w-full">
//               <div className="space-y-3 p-1">
//                 {availableHeaders.map((header) => (
//                   <div key={header} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`header-${header}`}
//                       checked={selectedHeaders.includes(header)}
//                       onCheckedChange={(checked) =>
//                         handleHeaderToggle(header, checked as boolean)
//                       }
//                     />
//                     <Label
//                       htmlFor={`header-${header}`}
//                       className="text-sm font-normal cursor-pointer"
//                     >
//                       {header}
//                     </Label>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </div>

//           <DialogFooter>
//             <Button onClick={() => setShowModal(false)} variant="outline">
//               Cancel
//             </Button>
//             <Button
//               onClick={handleExport}
//               disabled={selectedHeaders.length === 0}
//             >
//               Export ({selectedHeaders.length} columns)
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };
