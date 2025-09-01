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

type EditApplicationTypes = {
  data: ApplicationTypes;
  setEdit: (edit: boolean) => void;
};

const createFormSchema = (
  rejectedDocuments: Record<string, scholarshipDocumentTypes>
) => {
  const schemaShape: Record<string, z.ZodType> = {};

  Object.entries(rejectedDocuments).forEach(([, doc]) => {
    const validation = z
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
      .default([]);

    schemaShape[doc.label] = validation;
  });

  return z.object(schemaShape);
};

export default function EditApplication({
  data,
  setEdit,
}: EditApplicationTypes) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const userId = user?.userId;
  const scholarId = data.scholarshipId;
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Get rejected documents
  const rejectedDocuments = Object.entries(
    data.scholarship.scholarshipDocuments
  )
    .filter(([, doc]) => {
      const userDoc = data.userDocuments[doc.label];
      return userDoc?.rejectMessage?.status === "REJECTED";
    })
    .reduce((acc, [key, doc]) => {
      acc[key] = doc;
      return acc;
    }, {} as Record<string, scholarshipDocumentTypes>);

  // No rejected documents - show empty state
  if (Object.keys(rejectedDocuments).length === 0) {
    return (
      <div className="flex-1 flex flex-col bg-background rounded-t-lg overflow-auto p-4 gap-8">
        <TitleReusable
          title="Update submitted documents"
          description="No documents need to be updated at this time."
          Icon={PenLine}
        />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">
            All your documents have been approved or are pending review.
          </p>
        </div>
        <div className="pt-4 border-t bg-background/40">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setEdit(false)}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  // Initialize form
  const formSchema = createFormSchema(rejectedDocuments);
  type FormData = z.infer<typeof formSchema>;

  const defaultValues = Object.values(rejectedDocuments).reduce((acc, doc) => {
    acc[doc.label] = [];
    return acc;
  }, {} as Record<string, File[]>);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as FormData,
  });

  const handleFilesChange = (label: string, files: File[]) => {
    form.setValue(label as keyof FormData, files as File[]);
    form.trigger(label as keyof FormData);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("userId", String(userId));
      data.append("scholarshipId", String(scholarId));

      // Append files to FormData
      Object.entries(formData).forEach(([label, files]) => {
        if (files && Array.isArray(files) && files.length > 0) {
          files.forEach((file: File) => {
            data.append(label, file);
          });
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/applyScholarship`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Upload successful!",
          description:
            "Your rejected documents have been resubmitted successfully.",
        });

        setLoading(false);
        setTimeout(() => router.back(), 300);
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
        title="Update rejected documents"
        description={`You need to resubmit ${
          Object.keys(rejectedDocuments).length
        } rejected document(s).`}
        Icon={PenLine}
      />

      <Form {...form}>
        <div className="flex-1 grid lg:grid-cols-2 grid-cols-1 gap-5">
          {Object.values(rejectedDocuments).map((doc, index) => {
            const userDoc = data.userDocuments[doc.label];
            const rejectMessage = userDoc?.rejectMessage?.comment;

            return (
              <FormField
                key={doc.label}
                control={form.control}
                name={doc.label as keyof FormData}
                render={() => (
                  <FormItem>
                    <div className="space-y-4 rounded-md p-4 bg-card ">
                      <div className="space-y-1">
                        <FormLabel className="flex items-center justify-between">
                          <div className="flex gap-2 items-center">
                            <span className="text-base font-medium">
                              {doc.label}
                            </span>
                            <Badge className="text-xs bg-red-800/20 text-red-700">
                              REJECTED
                            </Badge>
                            <Badge
                              className={`text-xs capitalize ${
                                doc.requirementType === "required"
                                  ? "bg-red-800/20 text-red-700"
                                  : "bg-blue-800/20 text-blue-700"
                              }`}
                            >
                              {doc.requirementType}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {doc.formats.map((format) => (
                              <span key={format}>
                                {mimeToLabelMap[format] || format}
                              </span>
                            ))}
                          </div>
                        </FormLabel>
                        {rejectMessage && (
                          <div className="text-sm text-red-600  p-2 rounded">
                            <strong>Rejection reason:</strong> {rejectMessage}
                          </div>
                        )}
                      </div>
                      <FormControl>
                        <DragAndDropArea
                          label={doc.label}
                          accept={doc.formats}
                          initialImageUrl={userDoc?.fileUrl}
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
            );
          })}
        </div>
      </Form>

      <div className="pt-4 border-t bg-background/40 flex gap-3">
        <DeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
          loading={loading}
          red={false}
          title="Resubmit Rejected Documents?"
          description="Please review your updated documents before resubmitting. Make sure you've addressed the rejection reasons."
          confirmText="Resubmit Documents"
          confirmTextLoading="Resubmitting..."
          onConfirm={form.handleSubmit(onSubmit)}
          cancelText="Cancel"
          trigger={
            <Button className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Resubmit Documents
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
