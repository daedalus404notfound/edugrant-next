import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Required"),
  contactNumber: z
    .string()
    .regex(/^\+63\d{10}$/, "Must be a valid phone number"),

  gender: z.string().min(1, "Required"),
  indigenous: z.string().optional(),
  pwd: z.string().optional(),
  dateOfBirth: z
    .string()
    .min(1, "Required")
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Invalid format, use YYYY-MM-DD"
    ),

  address: z.string().min(1, "Required"),
});
const accountDetailsSchema = z
  .object({
    studentId: z.string().min(4, "Required"),
    email: z.string().min(1, "Required").email("Invalid email address"),

    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),

    course: z.string().min(1, "Required"),
    yearLevel: z.string().min(1, "Required"),
    institute: z.string().min(1, "Required"),
    section: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const otpSchema = z.object({
  otp: z.string().min(6, "Required").max(6, "Required"),
});

export type personalFormData = z.infer<typeof personalDetailsSchema>;
export type accountFormData = z.infer<typeof accountDetailsSchema>;
export type otpFormData = z.infer<typeof otpSchema>;

export function useRegisterUser() {
  const personalForm = useForm<personalFormData>({
    resolver: zodResolver(personalDetailsSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      pwd: "",
      indigenous: "",
    },
  });
  const accountForm = useForm<accountFormData>({
    resolver: zodResolver(accountDetailsSchema),
    mode: "onChange",
    defaultValues: {
      studentId: "",
      email: "",
      password: "",
      course: "",
      yearLevel: "",
      institute: "",
      section: "",
      confirmPassword: "",
    },
  });
  const otpForm = useForm<otpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });
  const personalData = personalForm.watch();
  const accountData = accountForm.watch();

  return { personalForm, accountForm, otpForm, personalData, accountData };
}
