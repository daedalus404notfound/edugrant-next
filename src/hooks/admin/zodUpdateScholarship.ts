import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ScholarshipTypes } from "../types";
import { createScholarshipSchema } from "./zodCreateScholarship";
export const updateScholarshipSchema = createScholarshipSchema.extend({
  scholarshipId: z.string().min(1, "Required"),
});

export type UpdateScholarshipFormData = z.infer<typeof updateScholarshipSchema>;

export function useUpdateScholarshipZod(data?: ScholarshipTypes) {
  const form = useForm<UpdateScholarshipFormData>({
    resolver: zodResolver(updateScholarshipSchema),
    defaultValues: {
      scholarshipId: data?.scholarshipId.toString() || "",
      scholarshipTitle: data?.scholarshipTitle || "",
      providerName: data?.scholarshipProvider || "",
      scholarshipGwa: data?.gwa?.toString() || "",
      scholarshipDescription: data?.scholarshipDescription || "",
      applicationDeadline: data?.scholarshipDeadline
        ? new Date(data.scholarshipDeadline)
        : undefined,
      scholarshipAmount: data?.scholarshipAmount?.toString() || "",
      scholarshipLimit: data?.scholarshipLimit?.toString() || "",
      documents: data?.scholarshipDocuments
        ? Object.values(data.scholarshipDocuments).map((doc) => ({
            label: doc.label || "",
            formats: doc.formats?.map(String) || [],
          }))
        : [{ label: "", formats: [] }],
    },
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  return { form, formData, fields, append, remove };
}
