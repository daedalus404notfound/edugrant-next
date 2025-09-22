import { Button } from "@/components/ui/button";
import StyledToast from "@/components/ui/toast-styled";
import { ApplicationFormData } from "@/hooks/zod/application";
import { documentFormData } from "@/hooks/admin/zodUpdateScholarship";
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
import { DragAndDropArea } from "@/components/ui/upload";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Upload } from "lucide-react";
import TitleReusable from "@/components/ui/title";

type EditApplicationTypes = {
  data: ApplicationFormData;
  setEdit: (edit: boolean) => void;
};

const createFormSchema = (editDocuments: Record<string, documentFormData>) => {
  const schemaShape: Record<string, z.ZodType> = {};

  Object.entries(editDocuments).forEach(([, doc]) => {
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
  const userId = user?.accountId;
  const scholarId = data.scholarshipId;
  const renew = data.Scholarship.renew;
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const applicationId = data.applicationId;
  // Transform the data structure to match what createFormSchema expects
  const editDocuments: Record<string, documentFormData> = Object.entries(
    data.submittedDocuments.documents
  ).reduce((acc, [key, doc]) => {
    acc[key] = {
      label: doc.document,
      formats: [doc.fileFormat],
      requirementType: doc.requirementType as "optional" | "required",
    };
    return acc;
  }, {} as Record<string, documentFormData>);

  const formSchema = createFormSchema(editDocuments);
  type FormData = z.infer<typeof formSchema>;

  const defaultValues = Object.values(editDocuments).reduce((acc, doc) => {
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
      data.append("accountId", String(userId));
      data.append("scholarshipId", String(scholarId));
      data.append("applicationId", String(applicationId));
      if (renew === true) {
        data.append("renew", "true");
      }
      if (renew === false) {
        data.append("renew", "false");
      }

      Object.entries(formData).forEach(([label, files]) => {
        if (files && Array.isArray(files) && files.length > 0) {
          files.forEach((file: File) => {
            data.append(label, file);
          });
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/updateApplication`,
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

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 bg-background rounded-t-lg lg:p-4 p-2">
        <TitleReusable title="Update documents" description="" />
        <div className="flex-1 grid lg:grid-cols-2 grid-cols-1 gap-5">
          <Form {...form}>
            {Object.entries(data.submittedDocuments.documents).map(
              ([key, originalDoc]) => {
                const transformedDoc = editDocuments[key];

                return (
                  <FormField
                    key={transformedDoc.label}
                    control={form.control}
                    name={transformedDoc.label as keyof FormData}
                    render={() => (
                      <FormItem>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <FormLabel className="flex items-center justify-between">
                              <span className="text-base font-medium">
                                {transformedDoc.label}
                              </span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <DragAndDropArea
                              label={transformedDoc.label}
                              accept={transformedDoc.formats}
                              initialImageUrl={originalDoc.fileUrl}
                              onFilesChange={(files) =>
                                handleFilesChange(transformedDoc.label, files)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                );
              }
            )}
          </Form>
        </div>
      </div>

      <div className="lg:p-4 p-2 sticky bottom-0 border-t bg-background/40 flex gap-3">
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
