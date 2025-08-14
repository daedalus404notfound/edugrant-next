import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const createAnnouncementSchema = z.object({
  announcementTitle: z.string().min(3, "Required"),
  announcementDescription: z.string().min(3, "Required"),
  announcementExpiration: z.date({
    message: "Required",
  }),
  announcementAttachment: z.any(),
});

export type createAnnouncementFormData = z.infer<
  typeof createAnnouncementSchema
>;

export function useCreateAnnouncementZod() {
  const form = useForm<createAnnouncementFormData>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      announcementTitle: "",
      announcementDescription: "",

      announcementAttachment: "",
      announcementExpiration: undefined,
    },
  });

  const formData = form.watch();

  return { form, formData };
}
