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
import {
  ApplicationFormData,
  UpdatedApplicationFormData,
} from "@/hooks/zod/application";
import { GetApplicationFormData } from "@/hooks/zod/getApplicationZod";
import { ScrollArea } from "@/components/ui/scroll-area";

export const createFormSchema = (documents: documentFormData[]) => {
  const schemaShape: Record<string, z.ZodType<any>> = {};

  documents.forEach((doc) => {
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
          files.every((file) => file.size <= 2 * 1024 * 1024),
        `File size must be less than 2MB for ${doc.label}`
      )
      .default([]); // Make all fields optional

    schemaShape[doc.label] = baseValidation;
  });

  return z.object(schemaShape);
};

type EditApplicationTypes = {
  data: GetApplicationFormData | null;
  setEdit: (edit: boolean) => void;
  // setUpdateDocument: (update: UpdatedApplicationFormData | null) => void;
};
export default function EditApplication({
  data,
  setEdit,
}: // setUpdateDocument,
EditApplicationTypes) {
  const { addApplication } = useUserStore.getState();
  const user = useUserStore((state) => state.user);
  const userId = user?.accountId;
  const scholarId = data?.scholarshipId || 0;
  const applicationId = data?.applicationId;
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const documentPhases = Object.keys(data?.Scholarship.documents ?? {}).filter(
    (key) => key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];
  const lastPhase = data?.Scholarship.documents?.[lastPhaseKey] ?? [];
  const lastPhaseLength = Object.keys(lastPhase).length;

  const allDocuments = Object.values(lastPhase);

  const requiredDocumentsCount = Object.values(lastPhase).filter(
    (doc) => doc.requirementType === "required"
  ).length;

  const formSchema = createFormSchema(lastPhase);
  type FormData = z.infer<typeof formSchema>;

  // Initialize default values
  const defaultValues: Record<string, File[]> = {};
  allDocuments.forEach((doc) => {
    defaultValues[doc.label] = [];
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as FormData,
  });

  const handleFilesChange = (label: string, files: File[]) => {
    form.setValue(label as keyof FormData, files as File[]);
    form.trigger(label as keyof FormData);

    // Count how many REQUIRED document fields are filled (not optional ones)
    const filledRequired = Object.values(lastPhase).filter((doc) => {
      // Only count required documents
      if (doc.requirementType !== "required") return false;

      const fieldFiles = form.getValues(doc.label as keyof FormData) as File[];
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
      formData.append("applicationId", String(applicationId));

      Object.entries(data).forEach(([label, files]) => {
        // Check if files exists and has length > 0
        if (files && Array.isArray(files) && files.length > 0) {
          files.forEach((file: File) => {
            formData.append(label, file);
          });
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/updateApplication`,
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
        // setUpdateDocument(res.data.updatedApplication);
        setEdit(false);
        setLoading(false);
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

  return (
    <div>
      <ScrollArea className="max-h-[80vh] h-full bg-background rounded-t-lg">
        <div className="flex-1 lg:p-4 p-2 space-y-10">
          {data?.Scholarship.form && (
            <div className="bg-muted px-4 py-3 md:py-2 rounded-md">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <p className="text-sm">{data?.Scholarship.title} Form</p>

                <Button
                  size="sm"
                  variant="outline"
                  className="min-w-24"
                  onClick={() =>
                    downloadFile(
                      data?.Scholarship.form,
                      `${data?.Scholarship.title} Scholarship Form.pdf`
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
          )}

          {/* <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" /> */}
          <div className="space-y-8">
            <TitleReusable
              title="Update Documents"
              description="Update your documents before scholarship expired"
            />

            <Form {...form}>
              <div className=" grid lg:grid-cols-2 grid-cols-1 gap-8">
                {lastPhase.map((doc, index) => (
                  <FormField
                    key={`required-${index}`}
                    control={form.control}
                    name={doc.label}
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
                              // initialImageUrl={
                              //   data?.submittedDocuments?.[lastPhaseKey]?.find(
                              //     (submittedDoc) =>
                              //       submittedDoc.document === doc.label
                              //   )?.fileUrl
                              // }
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
      </ScrollArea>
      <div className=" ">
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  lg:p-4 p-2">
          <div className="flex flex-col lg:flex-row gap-3">
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
                  // disabled={completedCount < requiredDocumentsCount || disable}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              }
            />

            <Button
              type="button"
              variant="secondary"
              onClick={() => setEdit(false)}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
