import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
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
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import GlassFolder from "@/components/ui/folder";
import { Textarea } from "@/components/ui/textarea";

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(newPageNumber, numPages || 1));
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => setScale(1.0);

  const ActionButtons = () => (
    <div className="absolute top-4 right-4 z-10 flex gap-2 bg-card p-2 rounded-lg">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" disabled={!!docStatus}>
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
          <Button variant="ghost" disabled={!!docStatus}>
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
  );

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
                  {/* Control Panel for Images */}
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

                  <ActionButtons />

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
        ) : fileFormat?.toUpperCase() === "PDF" ? (
          <div className="relative h-full w-full bg-gray-100 flex flex-col">
            {/* PDF Control Panel */}
            <div className="absolute top-4 left-4 z-10 flex gap-2 bg-card p-2 rounded-lg shadow-lg">
              <Button
                size="sm"
                variant="ghost"
                onClick={zoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={zoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setRotation((prev) => prev + 90);
                }}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  resetZoom();
                  setRotation(0);
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* PDF Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-card p-2 rounded-lg shadow-lg">
              <Button
                size="sm"
                variant="ghost"
                onClick={previousPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm px-2">
                {pageNumber} / {numPages || "?"}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={nextPage}
                disabled={pageNumber >= (numPages || 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <ActionButtons />

            {/* PDF Document */}
            <div className="flex-1 overflow-auto flex justify-center items-start p-4">
              <div
                style={{
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  transformOrigin: "center center",
                }}
              >
                <Document
                  file={fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) =>
                    console.error("Error loading PDF:", error)
                  }
                  loading={
                    <div className="flex items-center justify-center h-64">
                      <span>Loading PDF...</span>
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center h-64 text-red-500">
                      <span>Error loading PDF</span>
                    </div>
                  }
                  noData={
                    <div className="flex items-center justify-center h-64">
                      <span>No PDF data</span>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            </div>
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
