import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { documentsSchema } from "./zodUpdateScholarship";
import z from "zod";

export const renewDocumentSchema = z.object({
  renewDeadline: z.date(),
  renewDocuments: z.array(documentsSchema),
});

export type renewDocumentsFormData = z.infer<typeof renewDocumentSchema>;
export function useRedeployScholarshipZod() {
  const form = useForm<renewDocumentsFormData>({
    resolver: zodResolver(renewDocumentSchema),
    defaultValues: {
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
