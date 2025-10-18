import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

export const displayDocumentsSchema = z.object({
  label: z.string().min(1, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

export const scholarshipSchema = z.object({
  Application: z
    .array(
      z.object({
        ownerId: z.number().optional(),
        status: z.string().optional(),
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
export type scholarshipFormData = z.infer<typeof scholarshipSchema>;
export type documentFormData = z.infer<typeof displayDocumentsSchema>;

export function useUpdateScholarshipZod(data?: scholarshipFormData) {
  const documentPhases = Object.keys(data?.documents ?? {}).filter((key) =>
    key.startsWith("phase")
  );
  const documentPhasesLength = documentPhases.length;
  const lastPhaseKey = documentPhases[documentPhasesLength - 1];

  const form = useForm<scholarshipFormData>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      Application: data?.Application,
      ISPSUId: data?.ISPSUId || 0,
      SPId: data?.SPId || 0,
      Scholarship_Provider: {
        SPId: data?.Scholarship_Provider?.SPId || 0,
        dateCreated: data?.Scholarship_Provider?.dateCreated
          ? new Date(data.Scholarship_Provider.dateCreated)
          : new Date(),
        name: data?.Scholarship_Provider?.name || "",
      },
      amount: data?.amount || "",
      approved: data?.approved || 0,
      declined: data?.declined || 0,
      pending: data?.pending || 0,
      archived: data?.archived ?? false,
      phase: data?.phase,
      cover: data?.cover,
      dateCreated: data?.dateCreated ? new Date(data.dateCreated) : new Date(),
      deadline: data?.deadline ? new Date(data.deadline) : new Date(),
      description: data?.description || "",
      form: data?.form,
      interview: data?.interview ?? false,
      limit: data?.limit?.toString() || "",
      logo: data?.logo,
      requiredGWA: data?.requiredGWA?.toString() || "",
      scholarshipId: data?.scholarshipId || 0,
      type: data?.type === "private" ? "private" : "government",
      title: data?.title || "",
      documents: {
        [lastPhaseKey]: data?.documents?.[lastPhaseKey] ?? [],
      },
      supabasePath: {
        cover: data?.supabasePath?.cover || "",
        form: data?.supabasePath?.form || "",
        logo: data?.supabasePath?.logo || "",
      },
    },
  });

  const formData = form.watch();
  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control: form.control,
    name: `documents.${lastPhaseKey}`,
  });

  return {
    form,
    formData,
    documentFields,
    appendDocument,
    removeDocument,
  };
}
