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
import morty from "@/assets/image.png";
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
import { Separator } from "@/components/ui/separator";
import { useApprovedHandler } from "@/hooks/admin/postApproveHandler";
import { useRejectHandler } from "@/hooks/admin/postDeclineHandler";

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
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
  const { handleApprove, loadingApprove } = useApprovedHandler({
    id,
    setOpenApprove,
  });
  const { handleDecline, loadingReject } = useRejectHandler({
    id,
    setOpenReject,
  });

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
          <div className="p-4 pt-0 h-full">
            <div className="space-y-6  bg-background p-4 h-full rounded-md">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="size-25 border-2 border-card rounded-full object-cover"
                  src={morty.src}
                  alt=""
                />
                <p className="text-2xl font-semibold mt-3">
                  {[
                    data?.student.firstName,
                    data?.student.middleName,
                    data?.student.lastName,
                  ].join(" ")}
                </p>

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
          <Progress value={0} />

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
                  <AlertDialogCancel disabled={loadingApprove}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-gray-100"
                    onClick={handleApprove}
                    disabled={loadingApprove}
                  >
                    {loadingApprove && (
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
