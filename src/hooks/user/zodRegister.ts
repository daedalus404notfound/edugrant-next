import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Required"),
  contactNumber: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  indigenous: z.string().optional(),
  pwd: z.string().optional(),
  dateOfBirth: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
});
const accountDetailsSchema = z.object({
  studentId: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  password: z.string().min(8, "At least 8 characters"),
  course: z.string().min(1, "Required"),
  yearLevel: z.string().min(1, "Required"),
  institute: z.string().min(1, "Required"),
  section: z.string().min(1, "Required"),
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
    defaultValues: {
      studentId: "",
      email: "",
      password: "",
      course: "",
      yearLevel: "",
      institute: "",
      section: "",
    },
  });
  const otpForm = useForm<otpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const personalData = personalForm.watch();
  const accountData = accountForm.watch();

  return { personalForm, accountForm, otpForm, personalData, accountData };
}
