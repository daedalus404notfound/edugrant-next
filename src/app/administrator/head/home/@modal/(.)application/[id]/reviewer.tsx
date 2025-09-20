import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Loader } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import GlassFolder from "@/components/ui/folder";
import { Textarea } from "@/components/ui/textarea";

interface UserDocument {
  document: string;
  fileFormat: string;
  fileUrl: string;
  requirementType: string;
  resourceType: string;
  supabasePath: string;
}

export default function Reviewer({
  fileFormat,
  resourceType,
  fileUrl,
  document,
}: UserDocument) {
  const [rotation, setRotation] = useState(0);
  console.log(fileFormat);
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setIsLoading] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <GlassFolder />
      </DialogTrigger>
      <DialogContent className="h-screen w-[90%]">
        <DialogHeader className="sr-only">
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogDescription>Full screen document preview</DialogDescription>
        </DialogHeader>

        {fileFormat === "JPG" || fileFormat === "PNG" ? (
          <div className="relative h-full w-full bg-black">
            <TransformWrapper
              initialScale={1}
              wheel={{ step: 0.1 }}
              doubleClick={{ disabled: false }}
              minScale={0.1}
              maxScale={5}
              centerOnInit={true}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* Control Panel */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2 bg-card p-2 rounded-lg">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => zoomIn()}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => zoomOut()}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => {
                        setRotation((prev) => prev + 90);
                      }}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => {
                        resetTransform();
                        setRotation(0);
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  <TransformComponent
                    wrapperClass="!w-full !h-full "
                    contentClass="flex items-center justify-center"
                  >
                    <img
                      src={fileUrl}
                      alt={document}
                      className="max-h-full max-w-full object-contain"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        maxHeight: "100vh",
                        maxWidth: "100vw",
                      }}
                      draggable={false}
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
                <Loader className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              key={fileUrl}
              className="h-full w-full"
              src={
                fileFormat === "JPG" ||
                fileFormat === "PNG" ||
                fileFormat === "PDF"
                  ? fileUrl
                  : `https://docs.google.com/viewer?url=${encodeURIComponent(
                      fileUrl
                    )}&embedded=true`
              }
              title={`Document preview: ${document}`}
              onLoad={() => setIsLoading(false)}
            />
            {/* <Button
              className="absolute top-4 right-4 z-10"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              ✕
            </Button> */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
