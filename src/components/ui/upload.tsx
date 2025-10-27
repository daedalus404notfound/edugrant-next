// DragAndDropArea.tsx
"use client";

import { Button } from "@/components/ui/button";
import SpotlightBorderWrapper from "@/components/ui/border";
import { useFileUpload } from "@/hooks/useUpload";
import { BGPattern } from "./grid";

import { Upload, X } from "lucide-react";
import { useEffect } from "react";

function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function DragAndDropArea({
  label,
  accept,
  onFilesChange,
  initialImageUrl,
  reset,
  setReset,
}: {
  label: string;
  accept: string[];
  onFilesChange: (files: File[]) => void;
  initialImageUrl?: string;
  reset?: boolean;
  setReset?: (reset: boolean) => void;
}) {
  const {
    uploadedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    removeFile,
    clearAllFiles,
    maxSize,
  } = useFileUpload({
    accept,
    onFilesChange,
  });

  useEffect(() => {
    if (reset && uploadedFiles.length > 0) {
      clearAllFiles();
    } else {
      setReset?.(false); // ✅ safe optional call
    }
  }, [reset, uploadedFiles, clearAllFiles, setReset]);
  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };
  return (
    <SpotlightBorderWrapper>
      <div className="space-y-3 border-dashed border p-2  rounded-lg ">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center   rounded-lg p-6 text-center transition bg-card dark:bg-input/30
            ${
              uploadedFiles.length > 0
                ? "cursor-not-allowed opacity-70 text-muted-foreground/20 bg-muted/20 hover:bg-muted/20"
                : "cursor-pointer"
            }
            ${
              isDragActive && uploadedFiles.length === 0
                ? "border-primary bg-accent/30"
                : "border-card hover:bg-background/20"
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="z-10 relative size-15 flex justify-center items-center">
            {/* <BGPattern variant="grid" mask="fade-edges" /> */}
            <Upload />
          </div>

          <p className="text-muted-foreground text-sm hidden lg:block">
            {isDragActive
              ? `Drop your ${label} file here...`
              : `Drag & drop or click to upload ${label}`}
          </p>
          <span className="flex gap-3 items-center justify-center mt-2 tracking-wide">
            {accept.map((format, formatIndex) => (
              <p key={formatIndex} className="text-xs">
                {mimeToLabelMap[format] || format}
              </p>
            ))}
          </span>
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-2 space-y-1 text-sm text-red-700 text-center">
            {fileRejections.map(({ file, errors }) =>
              errors.map((e) => (
                <p key={`${file.name}-${e.code}`}>
                  {e.code === "file-too-large"
                    ? `${
                        file.name
                      } is too large. Max allowed size is ${formatBytes(
                        maxSize
                      )}.`
                    : e.message}
                </p>
              ))
            )}
          </div>
        )}

        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const previewUrl = isImage ? URL.createObjectURL(file) : null;

            return (
              <div
                key={file.name}
                className="flex items-center gap-3 justify-between border border-border rounded-lg p-2 mb-2"
              >
                <div className="flex items-center gap-3">
                  {isImage ? (
                    <img
                      src={previewUrl!}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">
                      📄
                    </div>
                  )}
                  <span className="text-sm break-all max-w-[200px] truncate">
                    {file.name}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        {uploadedFiles.length === 0 && initialImageUrl && (
          <div className="flex items-center gap-3 justify-between border border-border rounded-lg p-2 mb-2">
            <div className="flex items-center gap-3">
              <img
                src={initialImageUrl}
                alt="Existing"
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-sm break-all max-w-[200px] truncate">
                Existing Document
              </span>
            </div>
          </div>
        )}
      </div>
    </SpotlightBorderWrapper>
  );
}
