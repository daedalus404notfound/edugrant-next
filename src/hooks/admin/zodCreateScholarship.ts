import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const documentsSchema = z.object({
  label: z.string().min(1, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

const createScholarshipSchema = z.object({
  scholarshipType: z.enum(["government", "private"], {
    message: "Please select scholarship type",
  }),
  scholarshipTitle: z.string().min(1, "Required"),
  providerName: z.string().min(1, "Required"),
  scholarshipDescription: z.string().min(1, "Required"),
  scholarshipGwa: z.string(),
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
  scholarshipForm: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Form is required" }
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
      scholarshipType: "government",
      scholarshipTitle: "",
      providerName: "",
      scholarshipGwa: "",
      scholarshipDescription: "",
      applicationDeadline: undefined,
      scholarshipAmount: "",
      scholarshipLimit: "",
      documents: [{ label: "", formats: [], requirementType: "required" }],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  return { form, formData, fields, append, remove };
}
