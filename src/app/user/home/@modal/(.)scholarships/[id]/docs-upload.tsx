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
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScholarshipTypes } from "@/hooks/user/getScholarshipData";
import { useUserStore } from "@/store/useUserStore";
import { DragAndDropArea } from "@/components/ui/upload";
import { Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import StyledToast from "@/components/ui/toast-styled";

interface ScholarshipDocument {
  label: string;
  formats: string[];
}
// Create Zod schema dynamically based on scholarship documents
const createFormSchema = (documents: ScholarshipDocument[]) => {
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
    console.log("Submitting:", data);
    StyledToast({
      status: "checking",
      title: "Uploading in progress...",
      description:
        "Your documents are being uploaded. Please don’t close the window.",
    });

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

      console.log("sending to backend:");
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
        console.log("Upload success:", res.data);

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
    <div className="relative h-full w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 pb-20 lg:grid-cols-2  grid grid-cols-1 gap-5">
            {data.scholarshipDocuments.map((doc, index) => (
              <FormField
                key={index}
                control={form.control}
                name={doc.label as keyof FormData}
                render={() => (
                  <FormItem>
                    <div>
                      <div className="border-green-950/80 p-3 border rounded-lg bg-background">
                        <FormLabel className="font-bold text-green-800">
                          {doc.label}
                        </FormLabel>
                        <div className="flex justify-between mt-1">
                          <h1 className="text-sm text-gray-200">
                            Required formats
                          </h1>
                          <div className="space-x-1.5">
                            {doc.formats.map((format, formatIndex) => (
                              <Badge
                                key={formatIndex}
                                className="bg-green-900 text-gray-200"
                              >
                                {mimeToLabelMap[format] || format}
                              </Badge>
                            ))}
                          </div>
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
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="space-y-3 p-4 bottom-0 fixed w-full bg-black border-t-1">
            <div className="flex gap-3 items-center">
              <Progress
                className="bg-green-900"
                value={
                  (completedCount / data.scholarshipDocuments.length) * 100
                }
              />
              <div className="text-sm text-muted-foreground">
                {completedCount}/{data.scholarshipDocuments.length}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  completedCount < data.scholarshipDocuments.length || disable
                }
              >
                {loading ? <LoaderCircle className="animate-spin" /> : <Send />}
                {loading ? "Submitting..." : "Submit"}
              </Button>
              <Button
                type="button"
                className="flex-1"
                variant="outline"
                onClick={() => setIsApply(false)}
              >
                <X />
                Back
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
