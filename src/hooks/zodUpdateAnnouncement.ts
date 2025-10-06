import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnnouncementFormData, AnnouncementSchema } from "./zod/announcement";
import { useEffect } from "react";

export function useUpdateAnnouncementZod(data?: AnnouncementFormData | null) {
  console.log("title", data?.title);
  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      tags: data?.tags || {},
    },
  });

  const formWatch = form.watch();
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || "",
        description: data.description || "",
        tags: data.tags || { data: [] },
      });
    } else {
      // Optional: clear form when data is null
      form.reset({
        title: "",
        description: "",
        tags: { data: [] },
      });
    }
  }, [data, form]);
  return { form, formWatch };
}
