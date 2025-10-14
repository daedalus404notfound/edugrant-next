import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AnnouncementFormDataPost,
  AnnouncementSchemaPost,
} from "./zod/announcement";

export function useCreateAnnouncementZod() {
  const form = useForm<AnnouncementFormDataPost>({
    resolver: zodResolver(AnnouncementSchemaPost),
    defaultValues: {
      title: "",
      description: "",
      tags: { data: [] },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const formWatch = form.watch();

  return { form, formWatch };
}
