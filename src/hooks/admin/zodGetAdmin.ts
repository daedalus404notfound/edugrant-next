import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AdminProfileTypes } from "../types";
const adminProfileSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  contactNumber: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type FormData = z.infer<typeof adminProfileSchema>;

export function useProfileZod(data: AdminProfileTypes | null) {
  const form = useForm<FormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: "",
      role: "",
      middleName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      password: "************",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName || "",
        middleName: data.middleName || "",
        lastName: data.lastName || "",
        role: data.role || "",
        email: data.email || "",
        contactNumber: data.phone || "",
        password: "************",
      });
    }
  }, [data, form]);

  return { form, schema: adminProfileSchema };
}
