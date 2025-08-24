import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const createAnnouncementSchema = z.object({
  announcementTitle: z.string().min(3, "Required"),
  announcementDescription: z.string().min(3, "Required"),
  announcementExpiration: z.date({
    message: "Required",
  }),
  announcementTags: z.array(z.string()).min(1, "At least one tag is required"),
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

      announcementTags: [],
      announcementExpiration: undefined,
    },
  });

  const formData = form.watch();

  return { form, formData };
}
