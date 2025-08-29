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
import { ArrowLeft, Upload, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { ScholarshipTypes, scholarshipDocumentTypes } from "@/hooks/types";
import { useUserStore } from "@/store/useUserStore";
import { DragAndDropArea } from "@/components/ui/upload";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import StyledToast from "@/components/ui/toast-styled";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

const steps = [
  {
    step: 1,
    title: "Step One",
    description: "Choose Scholarship",
  },
  {
    step: 2,
    title: "Step Two",
    description: "Upload Documents",
  },
  {
    step: 3,
    title: "Step Three",
    description: "Wait for Approval",
  },
];

const createFormSchema = (
  requiredDocuments: Record<string, scholarshipDocumentTypes>,
  optionalDocuments: Record<string, scholarshipDocumentTypes>
) => {
  const schemaShape: Record<string, z.ZodType> = {};

  // Handle required documents
  Object.entries(requiredDocuments).forEach(([key, doc]) => {
    schemaShape[doc.label] = z
      .array(z.instanceof(File))
      .min(1, `${doc.label} is required`)
      .refine(
        (files) => files.every((file) => doc.formats.includes(file.type)),
        `Invalid file format for ${doc.label}`
      )
      .refine(
        (files) => files.every((file) => file.size <= 2 * 1024 * 1024),
        `File size must be less than 2MB for ${doc.label}`
      );
  });

  // Handle optional documents
  Object.entries(optionalDocuments).forEach(([key, doc]) => {
    schemaShape[doc.label] = z
      .array(z.instanceof(File))
      .optional()
      .refine(
        (files) =>
          !files || files.every((file) => doc.formats.includes(file.type)),
        `Invalid file format for ${doc.label}`
      )
      .refine(
        (files) =>
          !files || files.every((file) => file.size <= 2 * 1024 * 1024),
        `File size must be less than 2MB for ${doc.label}`
      );
  });

  return z.object(schemaShape);
};

export default function UploadDocs({
  data,
  setIsApply,
}: {
  data: ScholarshipTypes;
  setIsApply: (value: boolean) => void;
}) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const userId = user?.userId;
  const scholarId = data.scholarshipId;
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Create form schema based on scholarship documents
  const requiredDocuments = data.scholarshipDocuments || {};
  const optionalDocuments = data.scholarshipDocumentsOptional || {};
  const allDocuments = [
    ...Object.values(requiredDocuments),
    ...Object.values(optionalDocuments),
  ];
  const requiredDocumentsCount = Object.keys(requiredDocuments).length;
  const formSchema = createFormSchema(requiredDocuments, optionalDocuments);
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

    // Count how many required document fields are filled
    const filledRequired = Object.values(requiredDocuments).filter((doc) => {
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
      formData.append("userId", String(userId));
      formData.append("scholarshipId", String(scholarId));

      Object.entries(data).forEach(([label, files]) => {
        // Check if files exists and has length > 0
        if (files && Array.isArray(files) && files.length > 0) {
          files.forEach((file: File) => {
            formData.append(label, file);
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
        StyledToast({
          status: "success",
          title: "Upload successful!",
          description: " Your documents have been submitted successfully.",
        });
        setIsApply(true);
        setLoading(false);
        setTimeout(() => {
          router.back();
        }, 300);
      }
    } catch (error) {
      StyledToast({
        status: "error",
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
      });
      console.error("Upload error:", error);
      setLoading(false);
      setDisable(false);
    }
  };

  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-8">
          <div className="flex items-center gap-3 mb-8">
            <div>
              <h1 className="text-xl font-semibold text-balance">
                Upload Documents
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Complete your application for {data.scholarshipTitle}
              </p>
            </div>
          </div>

          <Stepper defaultValue={2} className="items-start gap-4">
            {steps.map(({ step, title, description }) => (
              <StepperItem key={step} step={step} className="flex-1">
                <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                  <StepperIndicator asChild className="bg-border h-1 w-full">
                    <span className="sr-only">{step}</span>
                  </StepperIndicator>
                  <div className="space-y-0.5">
                    <StepperTitle>{title}</StepperTitle>
                  </div>
                  <StepperDescription>{description}</StepperDescription>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </div>

      <div className=" px-6 flex-1">
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Before you start</h2>
          <div className="grid gap-3 text-sm text-muted-foreground">
            <p>• Ensure all documents are clear, readable, and valid</p>
            <p>• Only upload files in accepted formats (PDF, DOCX, JPG, PNG)</p>
            <p>• Each file must not exceed 2MB in size</p>
            <p>
              • Review carefully before submitting — changes aren't permitted
              after submission
            </p>
          </div>
        </div>

        <Form {...form}>
          <div className="space-y-12 grid grid-cols-2 gap-3">
            {Object.keys(requiredDocuments).length > 0 && (
              <div className="space-y-3">
                {/* <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold border-l-2 border-red-700  pl-3">
                    Required Documents
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {Object.keys(requiredDocuments).length} required
                  </Badge>
                </div> */}

                <div className="space-y-8 bg-card p-4 rounded-lg">
                  {Object.values(requiredDocuments).map((doc, index) => (
                    <FormField
                      key={`required-${index}`}
                      control={form.control}
                      name={doc.label as keyof FormData}
                      render={() => (
                        <FormItem>
                          <div className="space-y-4">
                            <FormLabel className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-base font-medium">
                                  {doc.label}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  Required
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {doc.formats.map((format, formatIndex) => (
                                  <Badge
                                    key={formatIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {mimeToLabelMap[format] || format}
                                  </Badge>
                                ))}
                              </div>
                            </FormLabel>

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
              </div>
            )}
            <div className="space-y-3">
              {/* <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold border-l-2 border-blue-700  pl-3">
                    Optional Documents
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {Object.keys(optionalDocuments).length} optional
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground pl-3.5 mt-1">
                  These documents aren't required but may strengthen your
                  application.
                </p>
              </div> */}
              <div className="space-y-8 bg-card p-4 rounded-lg">
                {Object.keys(optionalDocuments).length > 0 && (
                  <div>
                    <div className="space-y-8">
                      {Object.values(optionalDocuments).map((doc, index) => (
                        <FormField
                          key={`optional-${index}`}
                          control={form.control}
                          name={doc.label as keyof FormData}
                          render={() => (
                            <FormItem>
                              <div className="space-y-4">
                                <FormLabel className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className="text-base font-medium">
                                      {doc.label}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Optional
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {doc.formats.map((format, formatIndex) => (
                                      <Badge
                                        key={formatIndex}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {mimeToLabelMap[format] || format}
                                      </Badge>
                                    ))}
                                  </div>
                                </FormLabel>

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
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {completedCount} of {requiredDocumentsCount} required
              </span>
            </div>
            <Progress
              value={(completedCount / requiredDocumentsCount) * 100}
              className="h-2"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <DeleteDialog
            open={openAlert}
            onOpenChange={setOpenAlert}
            loading={loading}
            red={false}
            title="Submit Application?"
            description="Please review your uploaded documents before submitting. Once submitted, you will not be able to make changes."
            confirmText="Submit Application"
            confirmTextLoading="Submitting..."
            onConfirm={form.handleSubmit(onSubmit)}
            cancelText="Cancel"
            trigger={
              <Button
                disabled={completedCount < requiredDocumentsCount || disable}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            }
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsApply(false)}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
