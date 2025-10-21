import z from "zod";

export const documentsSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Required")
    .regex(/^[A-Za-z0-9\s-_]+$/, "Label must not contain special characters"),

  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

export const scholarshipSchema = z.object({
  type: z.enum(["government", "private"], {
    message: "Please select scholarship type",
  }),
  title: z.string().min(1, "Required"),
  providerName: z.string().min(1, "Required"),
  Scholarship_Provider: z
    .object({
      SPId: z.string().optional(),
      dateCreated: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
  description: z.string().min(1, "Required"),
  requiredGWA: z
    .string()
    .regex(
      /^(?:[1-5](?:\.\d{1,2})?)?$/,
      "Enter a valid GWA (e.g. 1, 2.50, 3.00)"
    ),

  deadline: z.date({
    message: "Required",
  }),
  amount: z
    .string()
    .regex(/^\d*$/, "Amount must contain numbers only")
    .optional(),

  interview: z.boolean(),
  limit: z.string().regex(/^\d*$/, "Numbers only"),
  cover: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),
  logo: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),
  form: z.any().optional(),
  documents: z.object({
    documents: z
      .array(documentsSchema)
      .min(1, "At least one document is required"),
  }),
});

export type scholarshipFormData = z.infer<typeof scholarshipSchema>;
export type scholarshipDocumentFormData = z.infer<typeof documentsSchema>;
