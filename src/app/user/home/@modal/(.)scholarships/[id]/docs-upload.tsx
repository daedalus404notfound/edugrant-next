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
import { ArrowLeftFromLine, ArrowUpFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScholarshipTypes, scholarshipDocumentTypes } from "@/hooks/types";
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
import { Separator } from "@/components/ui/separator";
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

// Create Zod schema dynamically based on scholarship documents
const createFormSchema = (documents: scholarshipDocumentTypes[]) => {
  const schemaShape: Record<string, z.ZodType> = {};
  documents.forEach((doc) => {
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
  const formSchema = createFormSchema(data.scholarshipDocuments);
  type FormData = z.infer<typeof formSchema>;

  // Initialize default values
  const defaultValues: Record<string, File[]> = {};
  data.scholarshipDocuments.forEach((doc) => {
    defaultValues[doc.label] = [];
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as FormData,
  });

  const handleFilesChange = (label: string, files: File[]) => {
    form.setValue(label as keyof FormData, files as File[]);
    form.trigger(label as keyof FormData);

    // Count how many document fields are filled
    const filled = data.scholarshipDocuments.filter((doc) => {
      const fieldFiles = form.getValues(doc.label as keyof FormData) as File[];
      return fieldFiles && fieldFiles.length > 0;
    }).length;

    setCompletedCount(filled);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setDisable(true);
      const formData = new FormData();
      formData.append("userId", String(userId));
      formData.append("scholarshipId", String(scholarId));
      Object.entries(data).forEach(([label, files]) => {
        (files as File[]).forEach((file: File) => {
          formData.append(label, file);
        });
      });
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
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
    <div className="relative h-full w-full bg-background rounded-t-xl overflow-auto no-scrollbar">
      <div className="p-8 space-y-8">
        <div>
          {" "}
          <h1 className="text-lg font-semibold mb-2">How it works</h1>
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
        <div>
          <h1 className="text-lg font-semibold mb-2">Instructions</h1>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>
              Ensure all documents are{" "}
              <span className="font-medium">clear, readable, and valid</span>.
            </li>
            <li>
              Only upload documents in the{" "}
              <span className="font-medium">accepted formats</span> shown (PDF,
              DOCX, JPG, PNG).
            </li>
            <li>
              Each file must not exceed <span className="font-medium">2MB</span>{" "}
              in size.
            </li>
            <li>
              Upload the required document under its correct category (e.g.,
              COR, COG, Certificate).
            </li>
            <li>
              Incomplete uploads will prevent submission. All required fields
              must be filled.
            </li>
            <li>
              Double-check your uploads before submitting — once submitted,
              changes cannot be made.
            </li>
            <li>
              Click <span className="font-medium">Submit</span> when all
              documents are uploaded. You will receive a confirmation.
            </li>
            <li>
              If you encounter issues, contact the scholarship office before the
              deadline.
            </li>
          </ul>
        </div>
      </div>{" "}
      <Separator />
      <Form {...form}>
        <div className="p-4 space-y-8">
          {/* <h1></h1> */}
          <div>
            <p className="text-sm text-muted-foreground px-4">
              Please upload the required documents to complete your application
              for {data.scholarshipTitle}.
            </p>
            {data.scholarshipDocuments.map((doc, index) => (
              <FormField
                key={index}
                control={form.control}
                name={doc.label as keyof FormData}
                render={() => (
                  <FormItem>
                    <div className=" px-4 py-12  space-y-3 border-b-1">
                      <FormLabel className=" flex justify-between items-center">
                        <h1 className="font-medium text-lg text-green-800">
                          {" "}
                          {index + 1}. {doc.label}
                        </h1>
                        <div className="flex gap-2 items-center">
                          <h1 className="text-muted-foreground">
                            Accepted formats:
                          </h1>
                          {doc.formats.map((format, formatIndex) => (
                            <Badge key={formatIndex} variant="outline">
                              .{mimeToLabelMap[format] || format}
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
                      {/* <div>
                        <h1 className="text-sm font-medium">Document Source</h1>
                        <p className="text-sm text-muted-foreground">
                          This section provides guidance on where you can obtain
                          this document. Please ensure that the file you upload
                          is valid and up to date.
                        </p>
                      </div> */}
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="p-4 sticky bottom-0 bg-card border-t space-y-4">
          <div className="flex gap-3 items-center">
            <div className="text-sm text-muted-foreground">Upload Progress</div>
            <Progress
              className="flex-1"
              value={(completedCount / data.scholarshipDocuments.length) * 100}
            />
            <div className="text-sm text-muted-foreground">
              {completedCount}/{data.scholarshipDocuments.length}
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
              confirmText="Submit"
              confirmTextLoading="Submitting..."
              onConfirm={form.handleSubmit(onSubmit)}
              cancelText="Back"
              trigger={
                <Button
                  className="flex-1 bg-blue-950 border border-blue-950 hover:bg-blue-800 text-gray-200 hover:border-blue-800"
                  disabled={
                    completedCount < data.scholarshipDocuments.length || disable
                  }
                >
                  <ArrowUpFromLine />
                  Submit
                </Button>
              }
            />

            <Button
              type="button"
              className="flex-1"
              variant="outline"
              onClick={() => setIsApply(false)}
            >
              <ArrowLeftFromLine />
              Back
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
