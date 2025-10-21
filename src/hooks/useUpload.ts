// useFileUpload.ts
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UseFileUploadOptions {
  accept: string[];
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
}

export function useFileUpload({
  accept,
  maxSize = 2 * 1024 * 1024, // 2MB default
  onFilesChange,
}: UseFileUploadOptions) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedFiles(acceptedFiles);
      onFilesChange?.(acceptedFiles);
    },
    [onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(newFiles);
      onFilesChange?.(newFiles);
    },
    [uploadedFiles, onFilesChange]
  );

  const clearAllFiles = useCallback(() => {
    setUploadedFiles([]);
    onFilesChange?.([]);
  }, [onFilesChange]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize,
      accept: accept.reduce((acc, type) => {
        acc[type] = [];
        return acc;
      }, {} as Record<string, string[]>),
      disabled: uploadedFiles.length > 0,
    });

  return {
    uploadedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    removeFile,
    clearAllFiles,
    maxSize,
  };
}
