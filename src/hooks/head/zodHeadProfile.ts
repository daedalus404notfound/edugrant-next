import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const StaffSchema = z.object({
  staffId: z.number(),
  dateCreated: z.string(),
  fName: z.string(),
  lName: z.string(),
  mName: z.string().nullable(),
});
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
  ISPSU_Staff: StaffSchema,
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type StaffFormData = z.infer<typeof StaffSchema>;

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
      staffId: 0,
      dateCreated: "",
      fName: "",
      lName: "",
      mName: null,
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
