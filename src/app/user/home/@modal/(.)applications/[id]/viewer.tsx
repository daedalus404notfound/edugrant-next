import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Loader, X } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import GlassFolder from "@/components/ui/folder";
import { Badge } from "@/components/ui/badge";

interface UserDocument {
  document: string;
  fileFormat: string;
  fileUrl: string;
  requirementType: string;
  resourceType: string;
  supabasePath: string;
  status?: string;
}

export default function ApplicationViewer({
  fileFormat,
  fileUrl,
  document,
  status,
  requirementType,
}: UserDocument) {
  const [rotation, setRotation] = useState(0);
  console.log(fileFormat);
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  console.log("status", status);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative">
        <GlassFolder color="amber" />
        <Badge
          variant="secondary"
          className="absolute -bottom-0.5 right-1 z-50 uppercase tracking-wide"
        >
          {requirementType}
        </Badge>
      </DialogTrigger>
      <DialogContent
        className="!top-0 !left-0  absolute border-0 outline-0 bg-transparent"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogDescription>Full screen document preview</DialogDescription>
        </DialogHeader>

        <TransformWrapper
          initialScale={1}
          wheel={{ step: 0.1 }}
          doubleClick={{ disabled: false }}
          minScale={0.1}
          maxScale={5}
          centerOnInit={true}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <div className=" rounded-md  flex flex-col gap-3 bg-background  lg:p-4 p-2">
              <div className="flex justify-between rounded-md ">
                <div className="  flex gap-2  rounded-lg">
                  <Button
                    variant="secondary"
                    className=" "
                    onClick={() => zoomIn()}
                  >
                    <ZoomIn />
                  </Button>
                  <Button
                    variant="secondary"
                    className=" "
                    onClick={() => zoomOut()}
                  >
                    <ZoomOut />
                  </Button>
                  <Button
                    variant="secondary"
                    className=" "
                    onClick={() => {
                      setRotation((prev) => prev + 90);
                    }}
                  >
                    <RotateCw />
                  </Button>
                  <Button
                    variant="secondary"
                    className=" "
                    onClick={() => {
                      resetTransform();
                      setRotation(0);
                    }}
                  >
                    <RefreshCw />
                  </Button>
                </div>

                <Button
                  className=""
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Close <X />
                </Button>
              </div>

              <div className="flex-1 bg-card  rounded-md ">
                <TransformComponent
                  wrapperClass="!w-full !h-full "
                  contentClass="flex items-center justify-center"
                >
                  <div className="lg:h-[calc(100dvh-80px)] h-[calc(100dvh-64px)] lg:w-[calc(100dvw-32px)] w-[calc(100dvw-16px)] ">
                    {fileFormat === "JPG" || fileFormat === "PNG" ? (
                      <img
                        src={fileUrl}
                        alt={document}
                        className="h-full w-full object-contain rounded-md"
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          maxHeight: "100vh",
                          maxWidth: "100vw",
                        }}
                        draggable={false}
                      />
                    ) : fileFormat === "DOCX" || fileFormat === "PDF" ? (
                      <div className="w-full h-full">
                        {loading && (
                          <div className="absolute inset-0 flex items-center justify-center  z-20">
                            <Loader className="h-8 w-8 animate-spin " />
                          </div>
                        )}
                        <iframe
                          ref={iframeRef}
                          key={fileUrl}
                          className="h-full w-full rounded-lg"
                          src={fileUrl}
                          title={`Document preview: ${document}`}
                          onLoad={() => setIsLoading(false)}
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            maxHeight: "100vh",
                            maxWidth: "100vw",
                          }}
                        />
                      </div>
                    ) : (
                      <div className=" flex justify-center items-center">
                        MISSING DOCUMENT
                      </div>
                    )}
                  </div>
                </TransformComponent>
              </div>
            </div>
          )}
        </TransformWrapper>
      </DialogContent>
    </Dialog>
  );
}
