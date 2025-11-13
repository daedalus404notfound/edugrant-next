import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GlassFolder from "@/components/ui/folder";

import { Textarea } from "@/components/ui/textarea";
import { DragAndDropArea } from "@/components/ui/upload";
import {
  CircleCheckIcon,
  Clock,
  Loader,
  PenLine,
  TriangleAlert,
  TriangleAlertIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import ApplicationViewer from "./viewer";
const mimeToLabelMap: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "image/jpeg": "JPG",
  "image/png": "PNG",
};
export default function DocumentDetails({
  title,
  format,
  requirementType,
  status,
  supabasePath,
  comment,
  formats,
  applicationId,
  scholashipId,
  disabled,
}: {
  title: string;
  format: string;
  requirementType: string;
  status: string;
  supabasePath: string;
  comment?: string;
  formats: string[];
  applicationId?: number;
  scholashipId?: number;
  disabled: boolean;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const DocumentSchema = z.object({
    file: z
      .array(z.instanceof(File))
      .nonempty({ message: `${title} is Required` }) // ✅ replaces “Invalid input” with clean UX message
      .refine((files) => files.every((file) => formats.includes(file.type)), {
        message: `Invalid file format for ${title}`,
      }),
  });
  const form = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      file: [],
    },
  });

  // ✅ TanStack Query mutation
  const updateApplicationMutation = useMutation({
    mutationFn: async (values: z.infer<typeof DocumentSchema>) => {
      const formData = new FormData();

      // 👇 dynamically use document title as the key
      formData.append(title, values.file[0]);
      formData.append("scholarshipId", String(scholashipId));
      formData.append("applicationId", String(applicationId));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/updateApplication`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      const newData = data.updatedApplication;
      const editedId = newData.applicationId;
      queryClient.setQueryData(["application", applicationId], (old) => {
        console.log("🧩 Old cached data:", old);
        console.log("🆕 New updated data:", newData);
        if (!old) return { application: newData };
        return { ...old, application: newData };
      });
      queryClient.invalidateQueries({ queryKey: ["application"] });
      setIsEdit(false);
      StyledToast({
        status: "success",
        title: "Update success",
        description: "Your document has been updated succesfully.",
      });
    },
    onError: (error) => {
      console.error("❌ Upload failed:", error);
    },
  });

  function onSubmit(values: z.infer<typeof DocumentSchema>) {
    updateApplicationMutation.mutate(values);
  }

  return (
    <Dialog>
      <DialogTrigger className="flex-1" asChild>
        <button className="flex flex-col items-start gap-3">
          <div className="relative">
            <GlassFolder />
            <Badge
              variant="secondary"
              className="absolute z-10 bottom-0 right-0 uppercase"
            >
              {!supabasePath ? "N/A" : status || "PENDING"}
            </Badge>
          </div>
          <p className=" text-left text-sm">{title}</p>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl lg:p-6 p-4 w-[98%] bg-background">
        {!isEdit && (
          <div>
            {status === "REJECTED" ? (
              <div className="rounded-md px-4 py-3 bg-red-500/10">
                <p className="text-sm line-clamp-1 ">
                  <TriangleAlert
                    className="me-3 -mt-0.5 inline-flex text-red-500"
                    size={16}
                  />
                  Document has been rejected
                </p>
              </div>
            ) : status === "APPROVED" ? (
              <div className="rounded-md px-4 py-3 bg-green-500/10">
                <p className="text-sm line-clamp-1 ">
                  <CircleCheckIcon
                    className="me-3 -mt-0.5 inline-flex text-emerald-500"
                    size={16}
                  />
                  Document has been approved
                </p>
              </div>
            ) : !supabasePath ? (
              <div className="rounded-md px-4 py-3 bg-red-500/10">
                <p className="text-sm line-clamp-1 ">
                  <TriangleAlertIcon
                    className="me-3 -mt-0.5 inline-flex text-red-500"
                    size={16}
                  />
                  Failed to submit
                </p>
              </div>
            ) : status === "PENDING" && supabasePath ? (
              <div className="rounded-md px-4 py-3 bg-amber-500/10">
                <p className="text-sm line-clamp-1 ">
                  <Clock
                    className="me-3 -mt-0.5 inline-flex text-amber-500"
                    size={16}
                  />
                  Your document is awaiting verification.
                </p>
              </div>
            ) : null}
          </div>
        )}
        <DialogHeader className="items-start gap-3">
          <DialogTitle> {title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {isEdit ? (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between"></FormLabel>

                      <FormControl>
                        <DragAndDropArea
                          label={title}
                          accept={formats}
                          onFilesChange={(files) => field.onChange(files)}
                        />
                      </FormControl>

                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex lg:flex-row lg:items-end lg:justify-between gap-3">
                    <ApplicationViewer
                      fileFormat={mimeToLabelMap[format]}
                      document={title}
                      supabasePath={supabasePath}
                      requirementType={requirementType}
                      status={status}
                      applicationId={applicationId}
                    />
                    <div className="flex flex-col lg:flex-row lg:gap-8 gap-2 justify-end">
                      <span className="lg:pl-4 lg:border-l text-sm">
                        <span className="text-muted-foreground lg:text-sm text-xs">
                          File Type
                        </span>
                        <p className="uppercase"> {format || "N/A"}</p>
                      </span>
                      <span className="lg:pl-4 lg:border-l text-sm">
                        <span className="text-muted-foreground lg:text-sm text-xs">
                          Requirement Type
                        </span>
                        <p className="uppercase"> {requirementType || "N/A"}</p>
                      </span>
                    </div>
                  </div>
                  <Textarea
                    value={comment}
                    disabled
                    className="text-sm"
                    placeholder="Comment will show here if available."
                  />
                </div>
              )}
              <DialogFooter className="grid grid-cols-2 lg:flex">
                {isEdit ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEdit(false)}
                      disabled={updateApplicationMutation.isPending}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateApplicationMutation.isPending}
                    >
                      {updateApplicationMutation.isPending ? (
                        <>
                          Saving... <Loader className="animate-spin" />
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Close <X />
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // <- stops accidental submit propagation
                        setIsEdit(true);
                      }}
                      disabled={disabled}
                    >
                      Edit <PenLine />
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
