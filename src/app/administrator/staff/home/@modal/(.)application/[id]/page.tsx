"use client";
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
import { useEffect, useState } from "react";
import useApplicationById from "@/hooks/admin/getApplicantData";
import { Button } from "@/components/ui/button";
import { UserRoundCheck, UserRoundX } from "lucide-react";

import { useRecjectHandler } from "@/hooks/admin/postDeclineHandler";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStore } from "@/store/adminUserStore";
import { useInterviewdHandler } from "@/hooks/admin/postReviewedHandler";
import { useApprovedHandler } from "@/hooks/admin/postApproveHandler";
import { DeleteDialog } from "@/components/ui/delete-dialog";

import ModalHeader from "@/components/ui/modal-header";

import ReviewBody from "../../../../../../../components/ui/application/review-application-body";

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const { admin } = useAdminStore();
  const [open, setOpen] = useState(true);
  const id = Number(params.id);
  const { data, loading } = useApplicationById(id);
  const [reviewData, setReviewData] = useState<
    Record<string, { comment: string; status: string }>
  >({});
  const updateReviewData = (
    docKey: string,
    field: "comment" | "status",
    value: string
  ) => {
    setReviewData((prev) => ({
      ...prev,
      [docKey]: {
        ...prev[docKey],
        [field]: value,
      },
    }));
  };

  const reviewDetails = data?.Interview_Decision || data?.Application_Decision;
  // OBJECT PARA PWEDE IMAP
  const submittedDocuments = Object.keys(data?.submittedDocuments || {});
  // KUKUNIN ILAN LAHAT NG PHASE
  const phaseLength = submittedDocuments.length;
  // KUKUNIN LAST PHASE KEY
  const getLastPhase = phaseLength > 0 ? submittedDocuments.at(-1) : undefined;

  //KUKUNIN DATA NUNG LATEST PHASE
  const lastPhaseDocuments = getLastPhase
    ? data?.submittedDocuments?.[getLastPhase]?.documents || []
    : [];
  // KUKUNIN KUNG MGA REQUIRED
  const requiredLastPhaseDocuments = lastPhaseDocuments.filter(
    (doc) => doc.requirementType === "required"
  );
  // KUKUNIN KUNG ILAN MGA REQUIRED
  const requiredLength = requiredLastPhaseDocuments.length;
  console.log("requiredLastPhaseDocuments", requiredLastPhaseDocuments);

  // KUKUNIN APPLICATION DECISION SA NAPILING PHASE
  const phaseDecision = getLastPhase
    ? data?.submittedDocuments?.[getLastPhase]?.Application_Decision
    : null;

  const allPhaseDecision = submittedDocuments.map(
    (phaseKey) => data?.submittedDocuments?.[phaseKey]?.Application_Decision
  );

  const reviewedDocs = lastPhaseDocuments.filter((doc) => {
    const hasExistingStatus = doc.rejectMessage?.status;
    const hasNewReviewStatus = reviewData[doc.document]?.status;
    const isRequired = doc.requirementType?.trim() === "required";
    return isRequired && (hasExistingStatus || hasNewReviewStatus);
  }).length;

  const isThereRejected = lastPhaseDocuments.some((doc) => {
    const isRequired = doc.requirementType?.trim() === "required";
    const existingStatus = doc.rejectMessage?.status === "REJECTED";
    const newReviewStatus = reviewData[doc.document]?.status === "REJECTED";

    return isRequired && (existingStatus || newReviewStatus);
  });

  const reviewCheckpoint = requiredLength !== reviewedDocs;

  console.log("phaseDecision", phaseDecision);
  console.log("reviewData", reviewData);
  console.log("allPhaseDecision", allPhaseDecision);

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  const {
    handleInterview,
    loadingInterview,
    setOpenInterview,
    openInterview,
    isSuccessInterview,
  } = useInterviewdHandler({
    id,
    adminId: admin?.accountId,
    documentUpdate: reviewData,
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
  });

  const {
    handleApprove,
    loadingApprove,
    setOpenApprove,
    openApprove,
    isSuccessApprove,
  } = useApprovedHandler({
    id,
    adminId: admin?.accountId,
    documentUpdate: reviewData,
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
  });

  const {
    handleReject,
    loadingReject,
    openReject,
    setOpenReject,
    isSuccessReject,
  } = useRecjectHandler({
    id,
    adminId: admin?.accountId,
    documentUpdate: reviewData,
    scholarshipId: data?.scholarshipId ? data?.scholarshipId : 0,
  });

  // Close drawer when interview is successful
  useEffect(() => {
    if (isSuccessInterview) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessInterview]);

  // Close drawer when approval is successful
  useEffect(() => {
    if (isSuccessApprove) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessApprove]);

  // Close drawer when reject is successful
  useEffect(() => {
    if (isSuccessReject) {
      HandleCloseDrawer(false);
    }
  }, [isSuccessReject]);

  const navigationTabs = [
    { id: "documents", label: "Documents", indicator: null },
    { id: "student", label: "Student Info", indicator: null },
    { id: "family", label: "Family Background", indicator: null },
  ];

  //BUTTON LOGIC
  const approveButton = data?.status === "PENDING";
  const forInterviewButton =
    data?.status === "PENDING" && data.Scholarship.interview === true;
  const deleteButton =
    data?.status !== "APPROVED" &&
    data?.status !== "DECLINED" &&
    data?.status !== "BLOCKED";
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent
        className={`lg:w-[68%] bg-card w-[98%] max-w-[1100px] mx-auto outline-0 border-0 lg:p-1 `}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ModalHeader
          text="Application Details"
          HandleCloseDrawer={HandleCloseDrawer}
        />
        <ReviewBody
          reviewData={reviewData}
          updateReviewData={updateReviewData}
          data={data}
          loading={loading}
        />

        <DrawerFooter className="bg-card px-0 p-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {/* Approve Button */}

              {forInterviewButton ? (
                <DeleteDialog
                  open={openInterview}
                  onOpenChange={setOpenInterview}
                  onConfirm={handleInterview}
                  loading={loadingInterview}
                  title="Approve Application for Interview"
                  red={false} // make it visually destructive since this is a rejection
                  description="This will approve the application and notify the student. This action cannot be undone."
                  confirmText="Approve for Interview"
                  confirmTextLoading="Approving..."
                  cancelText="Cancel"
                  trigger={
                    <Button
                      disabled={reviewCheckpoint || isThereRejected}
                      onClick={() => setOpenApprove(true)}
                    >
                      <UserRoundCheck /> Approve for Interview
                    </Button>
                  }
                />
              ) : (
                <DeleteDialog
                  open={openApprove}
                  onOpenChange={setOpenApprove}
                  onConfirm={handleApprove}
                  loading={loadingApprove}
                  title="Approve Application"
                  red={false} // make it visually destructive since this is a rejection
                  description="This will approve the application and notify the student. This action cannot be undone."
                  confirmText="Approve"
                  confirmTextLoading="Approving..."
                  cancelText="Cancel"
                  trigger={
                    <Button
                      disabled={reviewCheckpoint || isThereRejected}
                      onClick={() => setOpenApprove(true)}
                    >
                      <UserRoundCheck /> Approve Application
                    </Button>
                  }
                />
              )}

              {/* Decline Button */}

              {deleteButton && (
                <DeleteDialog
                  open={openReject}
                  onOpenChange={setOpenReject}
                  onConfirm={handleReject}
                  loading={loadingReject}
                  title="Reject Application"
                  red={true}
                  description="This will reject the application and notify the student. This action cannot be undone."
                  confirmText="Reject"
                  confirmTextLoading="Rejecting..."
                  cancelText="Cancel"
                  trigger={
                    <Button
                      disabled={
                        data?.status === "APPROVED" ||
                        data?.status === "DECLINED" ||
                        reviewCheckpoint
                      }
                      onClick={() => setOpenReject(true)}
                      variant="destructive"
                    >
                      <UserRoundX /> Reject Application
                    </Button>
                  }
                />
              )}
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
