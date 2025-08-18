import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const adminProfileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  contactNumber: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  profileImage: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),
});

export type createAdminFormData = z.infer<typeof adminProfileSchema>;

export function useAdminZod() {
  const form = useForm<createAdminFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: "",
      role: "ADMIN",
      middleName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      password: "************",
    },
  });
  const formData = form.watch();
  return { form, schema: adminProfileSchema, formData };
}
