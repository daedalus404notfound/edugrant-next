import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { scholarshipSchema, scholarshipFormData } from "../zod/scholarship";

export function useCreateScholarshipZod() {
  const form = useForm<scholarshipFormData>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      type: undefined,
      title: "",
      providerName: "",
      requiredGWA: "",
      description: "",
      interview: false,
      deadline: undefined,
      amount: "",
      limit: "",
      cover: undefined,
      logo: undefined,
      form: undefined,
      documents: {
        documents: [{ label: "", formats: [], requirementType: undefined }],
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents.documents",
  });

  return { form, formData, fields, append, remove };
}
