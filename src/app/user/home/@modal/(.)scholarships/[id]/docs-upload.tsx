"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload, DownloadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  documentFormData,
  scholarshipFormData,
} from "@/hooks/admin/zodUpdateScholarship";
import { useUserStore } from "@/store/useUserStore";
import { DragAndDropArea } from "@/components/ui/upload";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import StyledToast from "@/components/ui/toast-styled";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Separator } from "@/components/ui/separator";
import TitleReusable from "@/components/ui/title";
import { ApiErrorResponse } from "@/hooks/admin/postReviewedHandler";
import { downloadFile } from "@/lib/downloadUtils";
import { displayScholarshipFormData } from "@/hooks/admin/displayScholarshipData";
import useDownloadForm from "@/hooks/admin/postDownloadForm";
import { ScrollArea } from "@/components/ui/scroll-area";
const sanitizeLabel = (label: string): string => {
  return label.replace(/['\s]/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
};
export const createFormSchema = (requiredDocuments: documentFormData[]) => {
  const schemaShape: Record<string, z.ZodType> = {};
  Object.entries(requiredDocuments).forEach(([key, doc]) => {
    const sanitizedKey = sanitizeLabel(doc.label);
    const baseValidation = z
      .array(z.instanceof(File))
      .refine(
        (files) =>
          files.length === 0 ||
          files.every((file) => doc.formats.includes(file.type)),
        `Invalid file format for ${doc.label}`
      )
      .refine(
        (files) =>
          files.length === 0 ||
          files.every((file) => file.size <= 5 * 1024 * 1024),
        `File size must be less than 5MB for ${doc.label}`
      );
    if (doc.requirementType === "required") {
      schemaShape[sanitizedKey] = baseValidation.min(
        1,
        `${doc.label} is required`
      );
    } else {
      schemaShape[sanitizedKey] = baseValidation.default([]);
    }
  });

  return z.object(schemaShape);
};

export default function UploadDocs({
  data,
  setApplying,
  HandleCloseDrawer,
}: {
  data: displayScholarshipFormData;
  setApplying: (applying: boolean) => void;
  HandleCloseDrawer: (close: boolean) => void;
}) {
  const { addApplication } = useUserStore.getState();
  const user = useUserStore((state) => state.user);
  const userId = user?.accountId;
  const scholarId = data.scholarshipId;
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const documentPhases = Object.keys(data?.documents ?? {}).filter((key) =>
    key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.documents?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;

  const allDocuments = Object.values(lastPhase);

  const requiredDocumentsCount = lastPhase.filter(
    (doc) => doc.requirementType === "required"
  ).length;

  const formSchema = createFormSchema(lastPhase);
  type FormData = z.infer<typeof formSchema>;

  // Initialize default values
  const defaultValues: Record<string, File[]> = {};
  lastPhase.forEach((doc) => {
    defaultValues[sanitizeLabel(doc.label)] = [];
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as FormData,
  });

  const handleFilesChange = (label: string, files: File[]) => {
    const sanitizedKey = sanitizeLabel(label);
    form.setValue(sanitizedKey as keyof FormData, files as File[]);
    form.trigger(sanitizedKey as keyof FormData);

    const filledRequired = lastPhase.filter((doc) => {
      if (doc.requirementType !== "required") return false;
      const sanitizedDocKey = sanitizeLabel(doc.label);
      const fieldFiles = form.getValues(
        sanitizedDocKey as keyof FormData
      ) as File[];
      return fieldFiles && fieldFiles.length > 0;
    }).length;

    setCompletedCount(filledRequired);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setDisable(true);
      const formData = new FormData();
      formData.append("accountId", String(userId));
      formData.append("scholarshipId", String(scholarId));

      Object.entries(data).forEach(([sanitizedKey, files]) => {
        // Find the original label
        const doc = lastPhase.find(
          (d) => sanitizeLabel(d.label) === sanitizedKey
        );
        const originalLabel = doc?.label || sanitizedKey;

        if (files && Array.isArray(files) && files.length > 0) {
          files.forEach((file: File) => {
            formData.append(originalLabel, file);
          });
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/applyScholarship`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        addApplication(scholarId, "PENDING");
        StyledToast({
          status: "success",
          title: "Upload successful!",
          description: " Your documents have been submitted successfully.",
        });
        setApplying(false);
        setLoading(false);
        HandleCloseDrawer(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setLoading(false);
        setDisable(false);
      }
    }
  };
  const onSubmitRenewal = async (data: FormData) => {
    try {
      setLoading(true);
      setDisable(true);
      const formData = new FormData();
      formData.append("accountId", String(userId));
      formData.append("scholarshipId", String(scholarId));

      Object.entries(data).forEach(([sanitizedKey, files]) => {
        const doc = lastPhase.find(
          (d) => sanitizeLabel(d.label) === sanitizedKey
        );
        const originalLabel = doc?.label || sanitizedKey;

        if (files && Array.isArray(files) && files.length > 0) {
          files.forEach((file: File) => {
            formData.append(originalLabel, file);
          });
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/renewScholarship`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        addApplication(scholarId, "PENDING");
        StyledToast({
          status: "success",
          title: "Upload successful!",
          description: " Your documents have been submitted successfully.",
        });
        setApplying(false);
        setLoading(false);
        HandleCloseDrawer(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        StyledToast({
          status: "error",
          title: error?.response?.data.message ?? "An error occurred.",
          description: "Cannot process your request.",
        });
        setLoading(false);
        setDisable(false);
      }
    }
  };
  const { onSubmit: onDownload, isLoading } = useDownloadForm(1);
  return (
    <ScrollArea className="h-[88vh] bg-background flex flex-col rounded-t-lg">
      <div className="flex-1 lg:p-4 p-2 space-y-10">
        <div className="space-y-8">
          <div>
            <div className=" pb-4">
              <TitleReusable
                title={`Upload Documents for Phase ${documentPhasesLength}`}
                description={` Complete your application for ${data.title}`}
              />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="">
            <h2 className="text-lg font-semibold mb-4">Before you start</h2>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <p>• Ensure all documents are clear, readable, and valid</p>
              <p>
                • Only upload files in accepted formats (PDF, DOCX, JPG, PNG)
              </p>
              <p>• Each file must not exceed 5MB in size</p>

              <p>
                • Optional documents aren't required but may strengthen your
                application.
              </p>
            </div>
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          {/* {data.form && ( */}
          <div className="bg-card lg:px-4   px-2 py-3 md:py-2 rounded-md ">
            <div className="flex  items-center justify-center gap-x-4 gap-y-2">
              <p className="text-sm font-semibold flex-1">{data.title} Form</p>

              <Button
                size="sm"
                className=""
                onClick={() =>
                  onDownload(
                    data.supabasePath?.form ? data.supabasePath?.form : ""
                  )
                }
              >
                <DownloadIcon
                  size={16}
                  className="-ms-0.5"
                  aria-hidden="true"
                />
                Download
              </Button>
            </div>
          </div>
          {/* )} */}
          <Form {...form}>
            <div className=" grid lg:grid-cols-2 grid-cols-1 gap-8">
              {Object.values(lastPhase).map((doc, index) => (
                <FormField
                  key={`required-${index}`}
                  control={form.control}
                  name={sanitizeLabel(doc.label) as keyof FormData}
                  render={() => (
                    <FormItem>
                      <div className="space-y-4 rounded-md ">
                        <div className="space-y-1">
                          <FormLabel className="flex items-center justify-between">
                            <span className="text-base font-medium">
                              {doc.label}{" "}
                              {doc.requirementType === "required" && (
                                <span className="text-red-700">*</span>
                              )}
                            </span>
                            <Badge
                              className={`text-xs capitalize ${
                                doc.requirementType === "required"
                                  ? "bg-red-800/20 text-red-700"
                                  : doc.requirementType === "optional"
                                  ? "bg-blue-800/20 text-blue-700"
                                  : " "
                              }`}
                            >
                              {doc.requirementType}
                            </Badge>
                          </FormLabel>
                          {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {doc.formats.map((format, formatIndex) => (
                              <p key={formatIndex} className="text-xs">
                                {mimeToLabelMap[format] || format}
                              </p>
                            ))}
                          </div> */}
                        </div>
                        <FormControl>
                          <DragAndDropArea
                            label={doc.label}
                            accept={doc.formats}
                            onFilesChange={(files) =>
                              handleFilesChange(doc.label, files)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </Form>
        </div>
      </div>
      <div className="sticky bottom-0 ">
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  lg:p-4 p-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Progress</span>
                <span className="font-medium">
                  {completedCount} out of {requiredDocumentsCount}{" "}
                </span>
              </div>
              <Progress
                value={(completedCount / requiredDocumentsCount) * 100}
                className="h-2"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {data.phase > 1 ? (
              <DeleteDialog
                open={openAlert}
                onOpenChange={setOpenAlert}
                loading={loading}
                red={false}
                title="Submit Renewal Application?"
                description="Please review your uploaded documents before submitting."
                confirmText="Submit Renewal Application"
                confirmTextLoading="Submitting..."
                onConfirm={form.handleSubmit(onSubmitRenewal)}
                cancelText="Cancel"
                trigger={
                  <Button
                    onClick={() => setOpenAlert(true)}
                    disabled={
                      completedCount < requiredDocumentsCount || disable
                    }
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Renewal Application
                  </Button>
                }
              />
            ) : (
              <DeleteDialog
                open={openAlert}
                onOpenChange={setOpenAlert}
                loading={loading}
                red={false}
                title="Submit Application?"
                description="Please review your uploaded documents before submitting."
                confirmText="Submit Application"
                confirmTextLoading="Submitting..."
                onConfirm={form.handleSubmit(onSubmit)}
                cancelText="Cancel"
                trigger={
                  <Button
                    onClick={() => setOpenAlert(true)}
                    disabled={
                      completedCount < requiredDocumentsCount || disable
                    }
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                }
              />
            )}

            <Button
              type="button"
              variant="secondary"
              onClick={() => setApplying(false)}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Details
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
