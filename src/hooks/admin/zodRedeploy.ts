import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { documentsSchema, scholarshipFormData } from "./zodUpdateScholarship";
import z from "zod";

export const renewDocumentSchema = z.object({
  accountId: z.number().optional(),
  scholarshipId: z.number().optional(),
  renewDeadline: z.date(),
  renewDocuments: z.array(documentsSchema),
});

export type renewDocumentsFormData = z.infer<typeof renewDocumentSchema>;
export function useRedeployScholarshipZod({
  scholarshipId,
  accountId,
}: {
  scholarshipId: number;
  accountId?: number;
}) {
  const form = useForm<renewDocumentsFormData>({
    resolver: zodResolver(renewDocumentSchema),
    defaultValues: {
      accountId: scholarshipId,
      scholarshipId: accountId,
      renewDeadline: undefined,
      renewDocuments: [{ label: "", formats: [], requirementType: "required" }],
    },
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "renewDocuments",
  });

  return { form, formData, fields, append, remove };
}
