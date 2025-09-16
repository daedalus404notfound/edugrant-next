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
import { scholarshipSchema } from "./zodUpdateScholarship";
import { scholarshipFormData } from "./zodUpdateScholarship";
export function useRedeployScholarshipZod(data?: scholarshipFormData) {
  const form = useForm<scholarshipFormData>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
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
        renewDocuments: data?.documents.renewDocuments
          ? data.documents.renewDocuments.map((doc) => ({
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
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents.renewDocuments",
  });

  return { form, formData, fields, append, remove };
}
