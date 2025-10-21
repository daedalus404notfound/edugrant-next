import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const adminProfileSchema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  confirmPassword: z.string().min(1, "Required"),
});

export type createAdminFormData = z.infer<typeof adminProfileSchema>;

export function useAdminZod() {
  const form = useForm<createAdminFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const formData = form.watch();
  return { form, schema: adminProfileSchema, formData };
}
