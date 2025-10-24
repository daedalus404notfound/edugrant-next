import z from "zod";

export const displayDocumentsSchema = z.object({
  label: z.string().min(1, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

export const displayScholarshipSchema = z.object({
  Application: z
    .array(
      z.object({
        ownerId: z.number().optional(),
        status: z.string().optional(),
        applicationId: z.number().optional(),
      })
    )
    .optional(),
  ISPSUId: z.number(),
  SPId: z.number(),
  Scholarship_Provider: z.object({
    SPId: z.number(),
    dateCreated: z.date(),
    name: z.string(),
  }),
  amount: z.string().optional(),
  approved: z.number().optional(),
  declined: z.number().optional(),
  pending: z.number().optional(),
  archived: z.boolean().optional(),
  phase: z.number(),
  cover: z.any().optional(),
  dateCreated: z.date().optional(),
  dateEnded: z.date().optional(),
  deadline: z.date({
    message: "Required",
  }),
  description: z.string().min(1, "Required"),
  form: z.any().optional(),
  interview: z.boolean(),
  limit: z.string().optional(),
  logo: z.any().optional(),
  requiredGWA: z.string().optional(),
  scholarshipId: z.number().min(1, "Required"),
  type: z.enum(["government", "private"], {
    message: "Please select scholarship type",
  }),
  title: z.string().min(1, "Required"),
  documents: z.record(z.string(), z.array(displayDocumentsSchema).optional()),
  supabasePath: z
    .object({
      cover: z.string(),
      form: z.string(),
      logo: z.string(),
    })
    .optional(),
});
export type displayScholarshipFormData = z.infer<
  typeof displayScholarshipSchema
>;
export type displayDocumentFormData = z.infer<typeof displayDocumentsSchema>;
