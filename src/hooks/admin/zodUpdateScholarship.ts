import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

export const documentsSchema = z.object({
  label: z.string().min(1, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

export const scholarshipSchema = z.object({
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
  renew: z.boolean().optional(),
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

  documents: z.object({
    documents: z.array(documentsSchema).optional(),
    renewDocuments: z.array(documentsSchema).optional(),
  }),
  supabasePath: z
    .object({
      cover: z.string(),
      form: z.string(),
      logo: z.string(),
    })
    .optional(),
});
export type scholarshipFormData = z.infer<typeof scholarshipSchema>;
export type documentFormData = z.infer<typeof documentsSchema>;

export function useUpdateScholarshipZod(data?: scholarshipFormData) {
  const form = useForm<scholarshipFormData>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      ISPSUId: data?.ISPSUId || 0,
      SPId: data?.SPId ||0,
      Scholarship_Provider: {
        SPId: data?.Scholarship_Provider?.SPId ||0,
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
      renew: data?.renew ?? false,
      cover: data?.cover,
      dateCreated: data?.dateCreated ? new Date(data.dateCreated) : new Date(),
      deadline: data?.deadline ? new Date(data.deadline) : new Date(),
      description: data?.description || "",
      form: data?.form,
      interview: data?.interview ?? false,
      limit: data?.limit || "",
      logo: data?.logo,
      requiredGWA: data?.requiredGWA || "",
      scholarshipId: data?.scholarshipId || 0,
      type: data?.type === "private" ? "private" : "government",
      title: data?.title || "",
      documents: {
        documents: data?.documents?.documents
          ? data.documents.documents.map((doc) => ({
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
    name: "documents.documents",
  });

  const {
    fields: renewDocumentFields,
    append: appendRenewDocument,
    remove: removeRenewDocument,
  } = useFieldArray({
    control: form.control,
    name: "documents.renewDocuments",
  });

  return {
    form,
    formData,
    documentFields,
    appendDocument,
    removeDocument,
    renewDocumentFields,
    appendRenewDocument,
    removeRenewDocument,
  };
}
