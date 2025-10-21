import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import deepEqual from "fast-deep-equal";

import z from "zod";
import { format } from "date-fns";

export const displayDocumentsSchema = z.object({
  label: z.string().min(1, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
  requirementType: z.enum(["required", "optional"], {
    message: "Required",
  }),
});

const ApplicationSchema = z.object({
  applicationId: z.number().optional(),
  dateCreated: z.string().optional(),
  decisionId: z.string().nullable().optional(),
  interviewId: z.string().nullable().optional(),
  ownerId: z.number().optional(),
  scholarshipId: z.number(),
  status: z.string().optional(),
  submitteDocuments: z
    .record(z.string(), z.array(displayDocumentsSchema).optional())
    .optional(),
  supabasePath: z.array(z.string()).optional(),
});

export const StudentSchema = z.object({
  Application: z.array(ApplicationSchema),
  profileImg: z.object({
    publicUrl: z.any().optional(),
    path: z.string().optional(),
  }),
  PWD: z.string(),
  studentId: z.number(),
  address: z.string(),
  contactNumber: z
    .string()
    .regex(/^\+63\d{10}$/, "Must be a valid phone number"),
  course: z.string(),
  dateCreated: z.string(),
  dateOfBirth: z
    .string()
    .min(1, "Required")
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Invalid format, use YYYY-MM-DD"
    ),
  indigenous: z.string().optional(),
  pwd: z.string().optional(),
  fName: z.string(),
  gender: z.string(),

  institute: z.string(),
  lName: z.string(),
  mName: z.string(),
  section: z.string(),
  year: z.string(),

  Account: z.object({
    schoolId: z.string(),
    email: z.string(),
    role: z.string(),
  }),
});

export type StudentUserFormData = z.infer<typeof StudentSchema>;
export function zodUpdateUserByHead(data?: StudentUserFormData | null) {
  const defaultValues: StudentUserFormData = {
    Account: {
      schoolId: data?.Account?.schoolId || "",
      email: data?.Account?.email || "",
      role: data?.Account?.role || "Student",
    },
    Application: [
      {
        applicationId: 0,
        dateCreated: "",
        decisionId: null,
        interviewId: null,
        ownerId: 0,
        scholarshipId: 0,
        status: "",
        submitteDocuments: {},
        supabasePath: [],
      },
    ],
    profileImg: {
      path: data?.profileImg?.path,
      publicUrl: data?.profileImg?.publicUrl,
    },
    PWD: data?.PWD || "",
    studentId: data?.studentId || 0,
    address: data?.address || "",
    contactNumber: data?.contactNumber || "",
    course: data?.course || "",
    dateCreated: data?.dateCreated || "",
    dateOfBirth: data?.dateCreated
      ? format(data?.dateOfBirth, "yyyy-MM-dd")
      : "",
    fName: data?.fName || "",
    mName: data?.mName || "",
    lName: data?.lName || "",
    gender: data?.gender || "",
    indigenous: data?.indigenous || "",
    institute: data?.institute || "",
    section: data?.section || "",
    year: data?.year || "",
  };

  const form = useForm<StudentUserFormData>({
    resolver: zodResolver(StudentSchema),
    mode: "onChange",
    defaultValues, // pass here
  });

  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, form]);
  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanged = !deepEqual(defaultValues, values); // ✅ compare against saved defaultValues
      setIsChanged(hasChanged);
    });
    return () => subscription.unsubscribe();
  }, [form, defaultValues]);
  return {
    form,
    isChanged,
  };
}
