import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const documentsSchema = z.object({
  label: z.string().min(3, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
});

const createScholarshipSchema = z.object({
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  applicationDeadline: z.date({
    message: "Required",
  }),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string(),
  detailsImage: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),
  sponsorImage: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),

  documents: z
    .array(documentsSchema)
    .min(1, "At least one document is required"),
});

export type creatScholarshipFormData = z.infer<typeof createScholarshipSchema>;

export function useCreateScholarshipZod() {
  const form = useForm<creatScholarshipFormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: "",
      providerName: "",
      scholarshipDescription: "",
      applicationDeadline: undefined,
      scholarshipAmount: "",
      scholarshipLimit: "",
      documents: [{ label: "", formats: [] }],
    },
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  return { form, formData, fields, append, remove };
}
