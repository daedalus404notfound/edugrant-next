import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const profileSchema = z.object({
  accountId: z.number(),
  email: z.string(),
  hashedPassword: z.string(),
  role: z.string(),
  dateCreated: z.string(),
  ISPSU_Head: z.object({
    headId: z.string(),
    dateCreated: z.string(),
    fName: z.string(),
    lName: z.string(),
    mName: z.string(),
  }),
  ISPSU_Staff: z.object({
    headId: z.string(),
    dateCreated: z.string(),
    fName: z.string(),
    lName: z.string(),
    mName: z.string(),
  }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm(initialData?: ProfileFormData) {
  const defaultValues: ProfileFormData = {
    accountId: 0,
    email: "",
    hashedPassword: "",
    role: "",
    dateCreated: "",
    ISPSU_Head: {
      headId: "",
      dateCreated: "",
      fName: "",
      lName: "",
      mName: "",
    },
    ISPSU_Staff: {
      headId: "",
      dateCreated: "",
      fName: "",
      lName: "",
      mName: "",
    },
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData ?? defaultValues,
  });

  const watchedData = form.watch();

  return {
    form,
    formData: watchedData,
  };
}
