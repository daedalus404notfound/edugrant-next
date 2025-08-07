"use client";

// import { Ring } from "ldrs/react";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import "ldrs/react/Ring.css";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import useApplicationById from "@/hooks/admin/getApplicantData";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Folder,
  GraduationCap,
  IdCard,
  LoaderCircleIcon,
  Mail,
  Phone,
} from "lucide-react";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import StyledToast from "@/components/ui/toast-styled";
import { Separator } from "@/components/ui/separator";

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [openApprove, setOpenApprove] = useState(false);
  const [LoadingApprove, setLoadingApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const id = params.id as string;
  const { data } = useApplicationById(id);
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const handleApprove = async () => {
    try {
      setOpenApprove(true);
      setLoadingApprove(true);
      StyledToast({
        status: "checking",
        title: "Processing Approval...",
        description: "Please wait while we approve the application.",
      });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/approveApplication`,
        { applicationId: id },
        { withCredentials: true }
      );
      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Application Approved",
          description: "The applicant has been notified and granted access.",
        });
        setLoadingApprove(false);
        setOpenApprove(false);
        router.back();
      }
    } catch (error) {
      StyledToast({
        status: "error",
        title: "Network Error",
        description: "Please check your connection and try again.",
      });
      setLoadingApprove(false);
      setOpenApprove(false);
      console.error(error);
    } finally {
      setLoadingApprove(false);
    }
  };

  const handleDecline = async () => {
    try {
      setOpenReject(true);
      setLoadingReject(true);
      StyledToast({
        status: "checking",
        title: "Processing Rejection...",
        description: "Please wait while we update the application status.",
      });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/declineApplication`,
        { applicationId: id },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setLoadingReject(false);
        setOpenReject(false);
        StyledToast({
          status: "success",
          title: "Application Rejected",
          description: "The applicant has been notified of the rejection.",
        });
        router.back();
      }
    } catch (error) {
      setLoadingReject(false);
      setOpenReject(false);
      StyledToast({
        status: "error",
        title: "Network Error",
        description: "Please check your connection and try again.",
      });
      console.error(error);
    } finally {
      setLoadingReject(false);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1200px] w-full mx-auto h-[95vh] outline-0 border-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle className=""></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        <div className="grid grid-cols-3 overflow-auto no-scrollbar h-full">
          <div className="p-4 h-full">
            <div className="space-y-6  bg-background p-4 h-full rounded-md">
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl font-semibold">
                  {[
                    data?.student.firstName,
                    data?.student.middleName,
                    data?.student.lastName,
                  ].join(" ")}
                </p>
                <p className="text-xs text-muted-foreground mt-2"></p>
                <span className="flex gap-2 items-center mt-2">
                  <Badge className="bg-green-800 text-gray-200">
                    {data?.student.course}
                  </Badge>
                  <Badge className="bg-green-800 text-gray-200">
                    {data?.student.year}
                  </Badge>
                  <Badge className="bg-green-800 text-gray-200">
                    Section {data?.student.section}
                  </Badge>
                </span>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Date Submitted
                  </p>
                  <p className=" text-gray-200">
                    {data?.applicationDate
                      ? format(data?.applicationDate, "PPP")
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Scholarship</p>
                  <p className=" text-gray-200">
                    {data?.scholarship.scholarshipTitle}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <IdCard className="w-5 h-5 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">Student ID</p>
                  <p className=" text-gray-200">{data?.student.studentId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className=" text-gray-200">{data?.student.studentEmail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className=" text-gray-200">
                    {data?.student.contactNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className=" text-gray-200">
                    {data?.student.dateOfBirth
                      ? format(data.student.dateOfBirth, "PPP")
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 pt-4 pr-4 space-y-3 ">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Submitted Documents</h1>
              <span className="flex gap-1 items-center">
                {data?.userDocuments && (
                  <p className="">{Object.keys(data.userDocuments).length}</p>
                )}
                /{" "}
                <p className="">
                  {" "}
                  {data?.scholarship.scholarshipDocuments.length}
                </p>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {data?.userDocuments &&
                Object.entries(data.userDocuments).map(([key, doc], index) => (
                  <div
                    key={key}
                    className="relative aspect-square bg-card rounded-md flex flex-col justify-center items-center p-2 gap-1"
                  >
                    <Folder size={50} />
                    <p className="text-xs text-center px-2 line-clamp-2 italic">
                      {doc.cloudinaryId}
                    </p>
                    <Badge className="mt-1 bg-green-800 text-gray-200 uppercase  absolute top-2 right-2">
                      {doc.fileFormat}
                    </Badge>

                    <div className="w-full flex justify-between items-center absolute bottom-0 p-4">
                      <h1>
                        {index + 1}. {doc.document}
                      </h1>

                      <Reviewer
                        fileFormat={doc.fileFormat}
                        resourceType={doc.resourceType}
                        fileUrl={doc.fileUrl}
                        document={doc.document}
                        cloudinaryId={doc.cloudinaryId}
                      />
                    </div>
                    {/* <div className="flex gap-2 ">
                   
                      <Button className="flex-1" variant="outline">
                        <Download />
                        Download
                      </Button>
                    </div> */}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <DrawerFooter className="space-y-2 border-t-2">
          <Progress value={100} />

          <div className="flex gap-3">
            <AlertDialog open={openApprove} onOpenChange={setOpenApprove}>
              <AlertDialogTrigger asChild>
                <Button className="flex-1 bg-green-800 hover:bg-green-900 text-gray-200">
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-green-800">
                    Approve Application?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will approve the applicant. They will be
                    notified and granted access accordingly. This cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={LoadingApprove}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-gray-100"
                    onClick={handleApprove}
                    disabled={LoadingApprove}
                  >
                    {LoadingApprove && (
                      <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    Confirm Approval
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openReject} onOpenChange={setOpenReject}>
              <AlertDialogTrigger asChild>
                <Button className="flex-1 bg-red-800 hover:bg-red-900 text-gray-200">
                  Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-800">
                    Reject Application?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The applicant will be notified
                    and the application will be marked as rejected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Textarea placeholder="Add a reason for rejection (optional)" />
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={loadingReject}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    className="bg-red-800 hover:bg-red-900 text-gray-100"
                    onClick={handleDecline}
                    disabled={loadingReject}
                  >
                    {loadingReject && (
                      <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    Confirm Rejection
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="flex-1" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

//  <div className="p-4 overflow-auto no-scrollbar space-y-5">
//    <div className="flex-1 space-y-2">
//      <div className="flex gap-2 items-center justify-between">
//        <div className="flex gap-1.5 items-center">
//          <h1 className="">Submitted Documents</h1>
//          <span className="flex gap-1 items-center">
//            {data?.userDocuments && (
//              <p className="">
//                {Object.keys(data.userDocuments).length}
//              </p>
//            )}
//            /{" "}
//            <p className=""> {data?.scholarship.scholarshipDocuments.length}</p>
//          </span>
//        </div>
//        <div>
//          {data?.applicationDate ? format(data?.applicationDate, "PPP") : ""}
//        </div>
//      </div>
//      <div className="space-y-2 ">
//        {data?.userDocuments &&
//          Object.entries(data.userDocuments).map(([key, doc]) => (
//            <div
//              key={key}
//              className=" border-input relative flex w-full items-center gap-3 rounded-md border p-4 shadow-xs outline-none border-l-2 border-l-green-800 bg-card overflow-hidden"
//            >
//              <div className="flex grow items-center gap-3">
//                {doc.fileFormat === "jpg" || doc.fileFormat === "png" ? (
//                  <Image />
//                ) : (
//                  <File />
//                )}

//                <div className="grid gap-2">
//                  <Label>
//                    {doc.document}{" "}
//                    <Badge className="uppercase bg-red-900 text-gray-200">
//                      {doc.fileFormat || "DOCX"}
//                    </Badge>
//                  </Label>
//                  <p className="text-muted-foreground text-xs truncate">
//                    {doc.cloudinaryId}
//                  </p>
//                </div>
//              </div>
//              <Reviewer
//                fileFormat={doc.fileFormat}
//                resourceType={doc.resourceType}
//                fileUrl={doc.fileUrl}
//                document={doc.document}
//                cloudinaryId={doc.cloudinaryId}
//              />
//              <Button variant="ghost">
//                <Download />
//              </Button>
//            </div>
//          ))}
//      </div>
//    </div>
//    <Separator className="mt-3" />

//  </div>;
