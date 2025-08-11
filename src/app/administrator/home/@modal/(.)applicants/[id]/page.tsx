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
import {  motion } from "motion/react";
import {
  Activity,
  ArrowLeft,
  Calendar,
  CheckCheck,
  CircleCheckIcon,
  File,
  GraduationCap,
  IdCard,
  LoaderCircleIcon,
  Mail,
  Phone,
  X,
} from "lucide-react";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useApprovedHandler } from "@/hooks/admin/postApproveHandler";
import { useRejectHandler } from "@/hooks/admin/postDeclineHandler";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStore } from "@/store/adminUserStore";
import { BGPattern } from "@/components/ui/grid";

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);
  const [openApprove, setOpenApprove] = useState(false);
  const [message, setMessage] = useState("");
  const [openReject, setOpenReject] = useState(false);
  const id = params.id as string;
  const { data, loading } = useApplicationById(id);
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
    adminId: admin?.adminId.toString(),
  });
  const { handleDecline, loadingReject } = useRejectHandler({
    id,
    message,
    setOpenReject,
    adminId: admin?.adminId.toString(),
  });
  console.log(admin?.adminId);

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1200px] w-full mx-auto h-[95vh] outline-0 border-0">
        <DrawerHeader className={data?.status === "PENDING" ? "sr-only" : ""}>
          <div className="sr-only">
            <DrawerTitle className=""></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </div>

          {loading ? (
            <div>
              <Skeleton className="h-12 w-full" />
            </div>
          ) : data?.status === "APPROVE" ? (
            <div className="rounded-md  px-4 py-3 bg-green-950 text-gray-200 flex justify-between items-center">
              <p className="text-sm">
                <CircleCheckIcon
                  className="me-3 -mt-0.5 inline-flex opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Approved on{" "}
                <strong>
                  {data.applicationResponseDate &&
                    format(data.applicationResponseDate, "PPP")}
                </strong>
              </p>
              <p className="text-sm">
                Reviewed by <strong>Admin Jerome</strong>
              </p>
            </div>
          ) : data?.status === "DECLINE" ? (
            <div className="rounded-md   px-4 py-3 bg-red-950 text-gray-200 flex justify-between items-center">
              <p className="text-sm">
                <CircleCheckIcon
                  className="me-3 -mt-0.5 inline-flex opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Declined on <strong>August 18th, 2025</strong>
              </p>
              <p className="text-sm">
                Reviewed by <strong>Admin Jerome</strong>
              </p>
            </div>
          ) : (
            ""
          )}
        </DrawerHeader>

        {/* <BGPattern
          variant="dots"
          mask="fade-edges"
          size={32}
          fill="rgba(255,255,255,0.3)"
        /> */}

        {loading ? (
          <div className="px-4 grid grid-cols-3 h-full">
            <div className=" rounded-md overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 overflow-auto no-scrollbar h-full">
            <div className="p-4 pt-0 h-full border-r-1">
              <div className=" space-y-6 p-4 h-full rounded-md">
                <div className=" flex flex-col justify-center items-center ">
                  <div className="size-20 border-2 border-card rounded-full flex justify-center items-center text-4xl font-semibold bg-red-900 uppercase">
                    {data?.student.firstName.slice(0, 1)}
                  </div>
                  <p className="text-xl font-semibold mt-3">
                    {[
                      data?.student.firstName,
                      data?.student.middleName,
                      data?.student.lastName,
                    ].join(" ")}
                  </p>

                  <span className="flex gap-2 items-center mt-2 uppercase">
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
                    <p className=" text-gray-200">
                      {data?.student.studentEmail}
                    </p>
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
                    <p className="text-xs text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className=" text-gray-200">
                      {data?.student.dateOfBirth
                        ? format(data.student.dateOfBirth, "PPP")
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative col-span-2 pt-4 pr-4 space-y-3 ">
              <BGPattern variant="grid" mask="fade-edges" />
              <div className="flex justify-between items-center">
                <motion.span
                  className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
          text-lg font-semibold flex items-center gap-1.5
          "
                  initial={{ backgroundPosition: "200% 0" }}
                  animate={{ backgroundPosition: "-200% 0" }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 7,
                    ease: "linear",
                  }}
                >
                  <File strokeWidth={3} size={18}/>
                  Submitted Documents
                </motion.span>

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
                  Object.entries(data.userDocuments).map(([key, doc]) => (
                    <Reviewer
                      key={key}
                      fileFormat={doc.fileFormat}
                      resourceType={doc.resourceType}
                      fileUrl={doc.fileUrl}
                      document={doc.document}
                      cloudinaryId={doc.cloudinaryId}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        <DrawerFooter className="space-y-2 border-t-2">
          <Progress value={0} />

          {loading ? (
            <div className="flex gap-3">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          ) : (
            <div className="flex gap-3">
              <AlertDialog open={openApprove} onOpenChange={setOpenApprove}>
                <AlertDialogTrigger asChild>
                  <Button
                    className="flex-1 bg-green-800 hover:bg-green-900 text-gray-200"
                    disabled={
                      data?.status === "APPROVE" || data?.status === "DECLINE"
                    }
                  >
                    <CheckCheck />
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
                  <Button
                    className="flex-1 bg-red-800 hover:bg-red-900 text-gray-200"
                    disabled={
                      data?.status === "APPROVE" || data?.status === "DECLINE"
                    }
                  >
                    <X />
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-800">
                      Reject Application?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The applicant will be
                      notified and the application will be marked as rejected.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Textarea
                    placeholder="Add a reason for rejection (optional)"
                    onChange={(e) => setMessage(e.target.value)}
                  />
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
              <Button
                className="flex-1"
                onClick={() => HandleCloseDrawer(false)}
              >
                <ArrowLeft /> Back
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
