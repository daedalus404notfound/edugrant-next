import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ScholarshipTypes } from "../types";

const documentsSchema = z.object({
  label: z.string().min(3, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
});

const createScholarshipSchema = z.object({
  scholarshipId: z.string().min(1, "Required"),
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  scholarshipGwa: z.string().optional(),
  applicationDeadline: z.date({
    message: "Required",
  }),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string().optional(),
  detailsImage: z.any().optional(),
  sponsorImage: z.any().optional(),
  documents: z
    .array(documentsSchema)
    .min(1, "At least one document is required"),
});

export type creatScholarshipFormData = z.infer<typeof createScholarshipSchema>;

export function useUpdateScholarshipZod(data?: ScholarshipTypes) {
  const form = useForm<creatScholarshipFormData>({
    resolver: zodResolver(createScholarshipSchema),
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
      documents: data?.scholarshipDocuments?.length
        ? data.scholarshipDocuments.map((doc) => ({
            label: doc.label || "",
            formats: doc.formats?.map(String) || [], // Convert each item to string
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

// .refine(
//       (file) =>
//         typeof File !== "undefined" && file instanceof File && file.size > 0,
//       { message: "Image is required" }
//     )
