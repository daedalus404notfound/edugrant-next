import { Button } from "@/components/ui/button";
import StyledToast from "@/components/ui/toast-styled";
import { ApplicationTypes, scholarshipDocumentTypes } from "@/hooks/types";
import { useUserStore } from "@/store/useUserStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { DragAndDropArea } from "@/components/ui/upload";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { PenLine, Upload } from "lucide-react";
import TitleReusable from "@/components/ui/title";
import { Separator } from "@/components/ui/separator";

type EditApplicationTypes = {
  data: ApplicationTypes;
  setEdit: (edit: boolean) => void;
};

const createFormSchema = (
  requiredDocuments: Record<string, scholarshipDocumentTypes>
) => {
  const schemaShape: Record<string, z.ZodType> = {};
  Object.entries(requiredDocuments).forEach(([key, doc]) => {
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
      );
    schemaShape[doc.label] = baseValidation.default([]);
  });

  return z.object(schemaShape);
};

export default function EditApplication({
  data,
  setEdit,
}: EditApplicationTypes) {
  // Create form schema based on scholarship documents
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const userId = user?.userId;
  const scholarId = data.scholarshipId;
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const rejectedDocs = Object.keys(data.userDocuments);
  console.log("32323", rejectedDocs);
  const requiredDocuments = data.scholarship.scholarshipDocuments;
  const allDocuments = Object.values(requiredDocuments);

  const formSchema = createFormSchema(requiredDocuments);
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
  };
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

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
    <div className="flex-1 flex flex-col bg-background rounded-t-lg overflow-auto p-4 gap-8">
      <TitleReusable
        title="Update submitted documents"
        description="You can make changes to your documents until the deadline."
        Icon={PenLine}
      />

      <div className="flex-1">
        <Form {...form}>
          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5">
            {Object.values(requiredDocuments).map((doc, index) => (
              <FormField
                key={`required-${index}`}
                control={form.control}
                name={doc.label as keyof FormData}
                render={() => (
                  <FormItem>
                    <div className="space-y-4  rounded-md  p-4 bg-card">
                      <div className="space-y-1">
                        <FormLabel className="flex items-center justify-between">
                          <div className="flex gap-2 items-center">
                            <span className="text-base font-medium">
                              {doc.label}
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
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {doc.formats.map((format, formatIndex) => (
                              <p key={formatIndex} className="text-xs ">
                                {mimeToLabelMap[format] || format}
                              </p>
                            ))}
                          </div>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <DragAndDropArea
                          label={doc.label}
                          accept={doc.formats}
                          initialImageUrl={
                            data.userDocuments?.[doc.label]?.fileUrl
                          }
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
      <div className="pt-4 border-t bg-background/40 flex gap-3 ">
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
            <Button className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          }
        />
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => setEdit(false)}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
