import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnnouncementFormData, AnnouncementSchema } from "./zod/announcement";

export function useCreateAnnouncementZod() {
  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      announcementId: undefined,
      title: "",
      description: "",
      tags: { data: [] },
    },
  });
  const formWatch = form.watch();

  return { form, formWatch };
}
