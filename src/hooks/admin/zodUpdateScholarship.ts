import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { ScholarshipTypes } from "../types";

const documentsSchema = z.object({
  label: z.string().min(3, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
});

const createScholarshipSchema = z.object({
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  scholarshipGwa: z.string(),
  applicationDeadline: z.date({
    message: "Required",
  }),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string(),
  detailsImage: z.any(),
  sponsorImage: z.any(),
  documents: z
    .array(documentsSchema)
    .min(1, "At least one document is required"),
});

export type creatScholarshipFormData = z.infer<typeof createScholarshipSchema>;

export function useUpdateScholarshipZod(data?: ScholarshipTypes) {
  const form = useForm<creatScholarshipFormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: data?.scholarshipTitle || "",
      providerName: data?.scholarshipProvider || "",
      scholarshipGwa: data?.gwa || "",
      scholarshipDescription: data?.scholarshipDescription || "",
      applicationDeadline: data?.scholarshipDealine
        ? new Date(data.scholarshipDealine)
        : undefined,
      scholarshipAmount: data?.scholarshipAmount.toString() || "",
      scholarshipLimit: data?.scholarshipLimit.toString() || "",
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
