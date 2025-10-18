// "use client";

// import { Button } from "@/components/ui/button";

// import { useFileUpload } from "@/hooks/useUpload";
// import defaultProfile from "@/assets/default-profile.jpg";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Edit, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// function formatBytes(bytes: number, decimals = 2): string {
//   if (!+bytes) return "0 Bytes";
//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ["Bytes", "KB", "MB", "GB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
// }

// export function DragAndDropAreaProfile({
//   label,
//   accept,
//   onFilesChange,
//   initialImageUrl,
//   reset,
//   setReset,
// }: {
//   label: string;
//   accept: string[];
//   onFilesChange: (files: File[]) => void;
//   initialImageUrl?: string;
//   reset?: boolean;
//   setReset?: (reset: boolean) => void;
// }) {
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const {
//     uploadedFiles,
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     fileRejections,
//     removeFile,
//     clearAllFiles,
//     maxSize,
//   } = useFileUpload({
//     accept,
//     onFilesChange,
//   });
//   useEffect(() => {
//     if (fileRejections.length > 0) {
//       setIsAlertOpen(true);
//     }
//   }, [fileRejections]);

//   useEffect(() => {
//     if (reset && uploadedFiles.length > 0) {
//       clearAllFiles();
//     } else {
//       setReset?.(false);
//     }
//   }, [reset, uploadedFiles, clearAllFiles, setReset]);
//   const previewUrl =
//     uploadedFiles.length > 0 ? URL.createObjectURL(uploadedFiles[0]) : null;

//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   return (
//     <div className="relative">
//       <Avatar className="size-30 border-2 border-background">
//         <AvatarImage
//           className="object-cover"
//           src={previewUrl || initialImageUrl || defaultProfile.src}
//         />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//       <div className="absolute right-0 bottom-0">
//         {uploadedFiles.length > 0 ? (
//           <Button
//             type="button"
//             className="rounded-full"
//             variant="destructive"
//             size="icon"
//             onClick={() => removeFile(0)}
//           >
//             <X className="w-4 h-4" />
//           </Button>
//         ) : (
//           <Button
//             className="rounded-full"
//             type="button"
//             size="icon"
//             variant="secondary"
//             {...getRootProps()}
//           >
//             <input {...getInputProps()} />

//             <Edit />
//           </Button>
//         )}
//       </div>

//       {fileRejections.length > 0 && (
//         <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>File Upload Error</AlertDialogTitle>
//               <AlertDialogDescription>
//                 {fileRejections.map(({ file, errors }) =>
//                   errors.map((e) => (
//                     <span key={`${file.name}-${e.code}`}>
//                       {file.name}:{" "}
//                       {e.code === "file-too-large"
//                         ? `File too large. Max allowed size is ${formatBytes(
//                             maxSize
//                           )}.`
//                         : e.message}
//                     </span>
//                   ))
//                 )}
//               </AlertDialogDescription>
//             </AlertDialogHeader>

//             <AlertDialogFooter>
//               <AlertDialogCancel>OK</AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       )}
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/useUpload";
import defaultProfile from "@/assets/default-profile.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/lib/cropHelper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function DragAndDropAreaProfile({
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
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    uploadedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    removeFile,
    clearAllFiles,
    maxSize,
  } = useFileUpload({
    accept,
    onFilesChange,
  });

  // Handle file rejections
  useEffect(() => {
    if (fileRejections.length > 0) {
      setIsAlertOpen(true);
    }
  }, [fileRejections]);

  // When a new file is uploaded, create a blob URL and open crop dialog
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      const newUrl = URL.createObjectURL(file);
      setImageUrl(newUrl);
      setIsCropDialogOpen(true);

      return () => {
        URL.revokeObjectURL(newUrl);
      };
    }
  }, [uploadedFiles]);

  useEffect(() => {
    if (reset && uploadedFiles.length > 0) {
      clearAllFiles();
    } else {
      setReset?.(false);
    }
  }, [reset, uploadedFiles, clearAllFiles, setReset]);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    if (!imageUrl || !croppedAreaPixels) return;

    const croppedImg = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImage(croppedImg);
    setIsCropDialogOpen(false);
  }, [imageUrl, croppedAreaPixels]);

  const previewUrl = croppedImage || initialImageUrl || defaultProfile.src;

  return (
    <div className="relative">
      <Avatar className="size-26 border-2 border-background">
        <AvatarImage className="object-cover" src={previewUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="absolute right-0 bottom-0">
        {uploadedFiles.length > 0 || croppedImage ? (
          <Button
            type="button"
            className="rounded-full"
            variant="destructive"
            size="icon"
            onClick={() => {
              removeFile(0);
              setCroppedImage(null);
              setImageUrl(null);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            className="rounded-full"
            type="button"
            size="icon"
            variant="secondary"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Edit />
          </Button>
        )}
      </div>

      {/* 🧱 Crop Dialog */}
      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent className="h-[420px] w-full sm:max-w-[400px] flex flex-col p-4">
          <DialogHeader>
            <DialogTitle className="text-sm text-center">
              Crop your profile image
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>

          {imageUrl && (
            <div className="relative flex-1 bg-black rounded-md overflow-hidden">
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsCropDialogOpen(false);
                removeFile(0);
                setCroppedImage(null);
                setImageUrl(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCropSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {fileRejections.length > 0 && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>File Upload Error</AlertDialogTitle>
              <AlertDialogDescription>
                {fileRejections.map(({ file, errors }) =>
                  errors.map((e) => (
                    <span key={`${file.name}-${e.code}`}>
                      {file.name}:{" "}
                      {e.code === "file-too-large"
                        ? `File too large. Max allowed size is ${formatBytes(
                            maxSize
                          )}.`
                        : e.message}
                    </span>
                  ))
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>OK</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
