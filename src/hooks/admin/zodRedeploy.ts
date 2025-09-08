import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ScholarshipTypes } from "../types";

export const documentsSchema = z.object({
  label: z.string().min(1, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

export const updateScholarshipSchema = z.object({
  scholarshipType: z.enum(["government", "private"], {
    message: "Please select scholarship type",
  }),
  scholarshipId: z.string().min(1, "Required"),
  scholarshipTitle: z.string().min(1, "Required"),
  providerName: z.string().min(1, "Required"),
  scholarshipDescription: z.string().min(1, "Required"),
  scholarshipGwa: z.string(),
  applicationDeadline: z.date({
    message: "Required",
  }),
  forInterview: z.boolean(),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string(),
  detailsImage: z.any().optional(),
  sponsorImage: z.any().optional(),
  scholarshipForm: z.any().optional(),

  scholarshipDocuments: z.object({
    documents: z
      .array(documentsSchema)
      .min(1, "At least one document is required"),
    renewDocuments: z
      .array(documentsSchema)
      .min(1, "At least one document is required"),
  }),
});
export type redeployScholarshipFormData = z.infer<
  typeof updateScholarshipSchema
>;

export function useRedeployScholarshipZod(data?: ScholarshipTypes) {
  const form = useForm<redeployScholarshipFormData>({
    resolver: zodResolver(updateScholarshipSchema),
    defaultValues: {
      scholarshipType:
        data?.scholarshipType === "private" ? "private" : "government",
      scholarshipId: data?.scholarshipId.toString() || "",
      scholarshipTitle: data?.scholarshipTitle || "",
      providerName: data?.scholarshipProvider || "",
      scholarshipGwa: data?.gwa?.toString() || "",
      scholarshipDescription: data?.scholarshipDescription || "",
      applicationDeadline: data?.scholarshipDeadline
        ? new Date(data.scholarshipDeadline)
        : undefined,
      forInterview: data?.interview,
      scholarshipAmount: data?.scholarshipAmount?.toString() || "",
      scholarshipLimit: data?.scholarshipLimit?.toString() || "",
      scholarshipDocuments: {
        documents: data?.scholarshipDocuments?.documents
          ? data.scholarshipDocuments.documents.map((doc) => ({
              label: doc.label || "",
              formats: doc.formats?.map(String) || [],
              requirementType:
                doc.requirementType === "optional" ||
                doc.requirementType === "required"
                  ? doc.requirementType
                  : "required",
            }))
          : [{ label: "", formats: [], requirementType: "required" }],
        renewDocuments: data?.scholarshipDocuments?.renewDocuments
          ? data.scholarshipDocuments.documents.map((doc) => ({
              label: doc.label || "",
              formats: doc.formats?.map(String) || [],
              requirementType:
                doc.requirementType === "optional" ||
                doc.requirementType === "required"
                  ? doc.requirementType
                  : "required",
            }))
          : [{ label: "", formats: [], requirementType: "required" }],
      },
    },
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "scholarshipDocuments.documents",
  });

  return { form, formData, fields, append, remove };
}
