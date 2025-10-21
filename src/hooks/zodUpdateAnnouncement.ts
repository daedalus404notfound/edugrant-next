import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AnnouncementFormDataPost,
  AnnouncementSchemaPost,
} from "./zod/announcement";
import { useEffect } from "react";

export function useUpdateAnnouncementZod(
  data?: AnnouncementFormDataPost | null
) {
  console.log("aaaaid", data?.description);
  const form = useForm<AnnouncementFormDataPost>({
    resolver: zodResolver(AnnouncementSchemaPost),
    defaultValues: {
      title: data?.title || "",
      announcementId: data?.announcementId || 0,
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
        announcementId: data?.announcementId || 0,
        tags: data.tags || { data: [] },
      });
    } else {
      // Optional: clear form when data is null
      form.reset({
        title: "",
        description: "",
        announcementId: undefined,
        tags: { data: [] },
      });
    }
  }, [data, form]);
  return { form, formWatch };
}
