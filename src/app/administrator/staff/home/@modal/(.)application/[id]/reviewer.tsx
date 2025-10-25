// import React, { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { ZoomIn, ZoomOut, RotateCw, RefreshCw } from "lucide-react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import GlassFolder from "@/components/ui/folder";
// import { Textarea } from "@/components/ui/textarea";

// interface UserDocument {
//   document: string;
//   fileFormat: string;
//   fileUrl: string;
//   requirementType: string;
//   resourceType: string;
//   supabasePath: string;
//   onUpdate: (field: "comment" | "status", value: string) => void;
//   docStatus: string;
//   docComment: string;
// }

// export default function Reviewer({
//   fileFormat,
//   resourceType,
//   fileUrl,
//   document,
//   docStatus,
//   onUpdate,
// }: UserDocument) {
//   const [rotation, setRotation] = useState(0);
//   console.log(fileFormat);
//   const [open, setOpen] = useState(false);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger>
//         <GlassFolder />
//       </DialogTrigger>
//       <DialogContent className="h-screen w-[90%]">
//         <DialogHeader className="sr-only">
//           <DialogTitle>Document Viewer</DialogTitle>
//           <DialogDescription>Full screen document preview</DialogDescription>
//         </DialogHeader>

//         {fileFormat === "JPG" || fileFormat === "PNG" ? (
//           <div className="relative h-full w-full bg-black">
//             <TransformWrapper
//               initialScale={1}
//               wheel={{ step: 0.1 }}
//               doubleClick={{ disabled: false }}
//               minScale={0.1}
//               maxScale={5}
//               centerOnInit={true}
//             >
//               {({ zoomIn, zoomOut, resetTransform }) => (
//                 <>
//                   {/* Control Panel */}
//                   <div className="absolute top-4 left-4 z-10 flex gap-2 bg-card p-2 rounded-lg">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                       onClick={() => zoomIn()}
//                     >
//                       <ZoomIn className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                       onClick={() => zoomOut()}
//                     >
//                       <ZoomOut className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                       onClick={() => {
//                         setRotation((prev) => prev + 90);
//                       }}
//                     >
//                       <RotateCw className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                       onClick={() => {
//                         resetTransform();
//                         setRotation(0);
//                       }}
//                     >
//                       <RefreshCw className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   <div className="absolute top-4 right-4 z-10 flex gap-2 bg-card p-2 rounded-lg">
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           disabled={
//                             // Disable if doc already has any status (approved or rejected)
//                             !!docStatus
//                           }
//                         >
//                           Approve
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle className="text-green-800">
//                             Approve Document?
//                           </AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This action will approve the document.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction asChild>
//                             <Button
//                               variant="ghost"
//                               onClick={() => {
//                                 onUpdate("status", "APPROVED");
//                                 setOpen(false);
//                               }}
//                             >
//                               Approve
//                             </Button>
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           disabled={
//                             // Disable if doc already has any status (approved or rejected)
//                             !!docStatus
//                           }
//                         >
//                           Reject
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle className="text-red-800">
//                             Reject Document?
//                           </AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This action will rejected the document.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <Textarea
//                           placeholder="Add a reason for rejection (optional)"
//                           onChange={(e) => onUpdate("comment", e.target.value)}
//                         />
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction asChild>
//                             <Button
//                               variant="ghost"
//                               onClick={() => {
//                                 onUpdate("status", "REJECTED");
//                                 setOpen(false);
//                               }}
//                             >
//                               Reject
//                             </Button>
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>

//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="text-white hover:bg-white/20"
//                       onClick={() => setOpen(false)}
//                     >
//                       ✕
//                     </Button>
//                   </div>

//                   <TransformComponent
//                     wrapperClass="!w-full !h-full "
//                     contentClass="flex items-center justify-center"
//                   >
//                     <img
//                       src={fileUrl}
//                       alt={document}
//                       className="max-h-full max-w-full object-contain"
//                       style={{
//                         transform: `rotate(${rotation}deg)`,
//                         maxHeight: "100vh",
//                         maxWidth: "100vw",
//                       }}
//                       draggable={false}
//                     />
//                   </TransformComponent>
//                 </>
//               )}
//             </TransformWrapper>
//           </div>
//         ) : (
//           <div className="relative h-full w-full">
//             <iframe
//               ref={iframeRef}
//               key={fileUrl}
//               className="h-full w-full"
//               src={
//                 fileFormat === "JPG" ||
//                 fileFormat === "PNG" ||
//                 fileFormat === "PDF"
//                   ? fileUrl
//                   : `https://docs.google.com/viewer?url=${encodeURIComponent(
//                       fileUrl
//                     )}&embedded=true`
//               }

//               title={`Document preview: ${document}`}
//             />
//             <Button
//               className="absolute top-4 right-4 z-10"
//               variant="ghost"
//               size="sm"
//               onClick={() => setOpen(false)}
//             >
//               ✕
//             </Button>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
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
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  Loader,
  X,
  CheckCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import GlassFolder from "@/components/ui/folder";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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

export default function ApplicationViewer({
  fileFormat,
  fileUrl,
  document,
  docStatus,
  requirementType,
  onUpdate,
}: UserDocument) {
  const [rotation, setRotation] = useState(0);
  console.log(fileFormat);
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative">
        <GlassFolder color="amber" />
        <Badge className="absolute bottom-0 z-60 uppercase" variant="secondary">
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
              <div className="grid grid-cols-3 rounded-md ">
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
                <div className="flex gap-2 justify-center items-center">
                  <p className="uppercase tracking-wide font-medium">
                    {document}
                  </p>
                  <p className="text-xs tracking-wide">{fileFormat}</p>
                </div>
                <span className="flex gap-3 items-center justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="" disabled={!fileUrl || !fileFormat}>
                        Approve <Check />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Approve Document</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to approve this document?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            onUpdate("status", "APPROVED");
                            setOpen(false);
                          }}
                        >
                          Continue <ArrowRight />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className=""
                        variant="destructive"
                        disabled={!fileUrl || !fileFormat}
                      >
                        Reject <X />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reject Document</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to reject this document?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Textarea
                        placeholder="Add reason for rejection"
                        onChange={(e) => onUpdate("comment", e.target.value)}
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            onUpdate("status", "REJECTED");
                            setOpen(false);
                          }}
                        >
                          Continue <ArrowRight />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    className=""
                    variant="secondary"
                    onClick={() => setOpen(false)}
                  >
                    Close <X />
                  </Button>
                </span>
              </div>

              <div className="flex-1 bg-card  rounded-md ">
                <TransformComponent
                  wrapperClass="!w-full !h-full "
                  contentClass="flex items-center justify-center"
                >
                  <div className="lg:h-[calc(100dvh-80px)] h-[calc(100dvh-64px)] lg:w-[calc(100dvw-32px)] w-[calc(100dvw-16px)] ">
                    {fileFormat === "JPG" || fileFormat === "PNG" ? (
                      <div className="w-full h-full">
                        {loading && (
                          <div className="absolute inset-0 flex items-center justify-center  z-20">
                            <Loader className="h-8 w-8 animate-spin " />
                          </div>
                        )}
                        <img
                          src={fileUrl}
                          alt={document}
                          className="h-full w-full object-contain rounded-md"
                          onLoad={() => setIsLoading(false)}
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            maxHeight: "100vh",
                            maxWidth: "100vw",
                          }}
                          draggable={false}
                        />
                      </div>
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
                      <div className=" flex justify-center h-full w-full items-center">
                        FAILED TO SUBMIT
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
