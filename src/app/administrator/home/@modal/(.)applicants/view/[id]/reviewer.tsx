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
import { ZoomIn, ZoomOut, RotateCw, RefreshCw } from "lucide-react";
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
  onUpdate: (field: "comment" | "status", value: string) => void;
  docStatus: string;
  docComment: string;
}

export default function Reviewer({
  fileFormat,
  resourceType,
  fileUrl,
  document,
  docStatus,
  onUpdate,
}: UserDocument) {
  const [rotation, setRotation] = useState(0);
  console.log(fileFormat);
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

        {fileFormat === "image/jpeg" || fileFormat === "png" ? (
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

                  <div className="absolute top-4 right-4 z-10 flex gap-2 bg-card p-2 rounded-lg">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          disabled={
                            // Disable if doc already has any status (approved or rejected)
                            !!docStatus
                          }
                        >
                          Approve
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-green-800">
                            Approve Document?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will approve the document.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                onUpdate("status", "APPROVED");
                                setOpen(false);
                              }}
                            >
                              Approve
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          disabled={
                            // Disable if doc already has any status (approved or rejected)
                            !!docStatus
                          }
                        >
                          Reject
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-800">
                            Reject Document?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will rejected the document.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Textarea
                          placeholder="Add a reason for rejection (optional)"
                          onChange={(e) => onUpdate("comment", e.target.value)}
                        />
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                onUpdate("status", "REJECTED");
                                setOpen(false);
                              }}
                            >
                              Reject
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setOpen(false)}
                    >
                      ✕
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
            <iframe
              ref={iframeRef}
              key={fileUrl}
              className="h-full w-full"
              src={
                resourceType === "image"
                  ? fileUrl
                  : `https://docs.google.com/viewer?url=${encodeURIComponent(
                      fileUrl
                    )}&embedded=true`
              }
              sandbox="allow-same-origin allow-scripts"
              title={`Document preview: ${document}`}
            />
            <Button
              className="absolute top-4 right-4 z-10"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              ✕
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
