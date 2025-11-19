import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import deepEqual from "fast-deep-equal";
import { useMemo } from "react";
import z from "zod";
import { format } from "date-fns";

export const displayDocumentsSchema = z.object({
  label: z.string().min(1, "Required"),
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
  profileImg: z
    .object({
      publicUrl: z.any().optional(),
      path: z.string().optional(),
    })
    .optional(),
  PWD: z.string(),
  studentId: z.number(),
  address: z.string(),
  contactNumber: z
    .string()
    .regex(/^\+639\d{9}$/, "Must be a valid phone number"),
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
  fName: z.string().min(1, "Required"),

  gender: z.string(),

  institute: z.string(),
  lName: z.string().min(1, "Required"),
  mName: z.string().optional(),
  section: z.string(),
  year: z.string(),
  familyBackground: z.object({
    fatherFullName: z.string().optional(),
    fatherAddress: z.string().optional(),
    fatherContactNumber: z
      .string()

      .optional(),
    fatherOccupation: z.string().optional(),
    fatherHighestEducation: z.string().optional(),
    fatherStatus: z.string().optional(),
    fatherTotalParentsTaxableIncome: z.string().optional(),

    motherFullName: z
      .string()

      .optional(),
    motherAddress: z.string().optional(),
    motherContactNumber: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherHighestEducation: z.string().optional(),
    motherStatus: z.string().optional(),
    motherTotalParentsTaxableIncome: z.string().optional(),

    guardianFullName: z
      .string()

      .optional(),
    guardianAddress: z.string().optional(),
    guardianContactNumber: z.string(),
    guardianOccupation: z.string().optional(),
    guardianHighestEducation: z.string().optional(),
    guardianTotalParentsTaxableIncome: z.string().optional(),
    siblings: z
      .array(
        z.object({
          fullName: z.string().min(1, "Required"),
          age: z.string().min(1, "Required").regex(/^\d+$/, "Only numbers"),
          occupation: z.string().min(1, "Required"),
        })
      )
      .optional(),
  }),
  Account: z.object({
    schoolId: z.string(),
    email: z.string(),
    role: z.string(),
  }),
});

export const UserSchema = z.object({
  Student: StudentSchema,
  accountId: z.number(),
  dateCreated: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  role: z.string(),
  schoolId: z.string(),
});

export type UserFormData = z.infer<typeof UserSchema>;
export type StudentUserFormData = z.infer<typeof StudentSchema>;
export function useProfileForm(data?: UserFormData | null) {
  const defaultValues = useMemo<UserFormData>(
    () => ({
      Student: {
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
          path: data?.Student.profileImg?.path,
          publicUrl: data?.Student.profileImg?.publicUrl,
        },
        PWD: data?.Student?.PWD || "",
        studentId: data?.Student?.studentId || 0,
        address: data?.Student?.address || "",
        contactNumber: data?.Student?.contactNumber || "",
        course: data?.Student?.course || "",
        dateCreated: data?.Student?.dateCreated || "",
        dateOfBirth: data?.Student
          ? format(data?.Student?.dateOfBirth, "yyyy-MM-dd")
          : "",
        fName: data?.Student?.fName || "",
        mName: data?.Student?.mName || "",
        lName: data?.Student?.lName || "",
        gender: data?.Student?.gender || "",
        indigenous: data?.Student?.indigenous || "",
        institute: data?.Student?.institute || "",
        section: data?.Student?.section || "",
        year: data?.Student?.year || "",
        familyBackground: {
          fatherFullName: data?.Student?.familyBackground?.fatherFullName || "",
          fatherAddress: data?.Student?.familyBackground?.fatherAddress || "",
          fatherContactNumber:
            data?.Student?.familyBackground?.fatherContactNumber || "",
          fatherOccupation:
            data?.Student?.familyBackground?.fatherOccupation || "",
          fatherHighestEducation:
            data?.Student?.familyBackground?.fatherHighestEducation || "",
          fatherStatus: data?.Student?.familyBackground?.fatherStatus || "",
          fatherTotalParentsTaxableIncome:
            data?.Student?.familyBackground?.fatherTotalParentsTaxableIncome ||
            "",
          motherFullName: data?.Student?.familyBackground?.motherFullName || "",
          motherAddress: data?.Student?.familyBackground?.motherAddress || "",
          motherContactNumber:
            data?.Student?.familyBackground?.motherContactNumber || "",
          motherOccupation:
            data?.Student?.familyBackground?.motherOccupation || "",
          motherHighestEducation:
            data?.Student?.familyBackground?.motherHighestEducation || "",
          motherStatus: data?.Student?.familyBackground?.motherStatus || "",
          motherTotalParentsTaxableIncome:
            data?.Student?.familyBackground?.motherTotalParentsTaxableIncome ||
            "",
          guardianFullName:
            data?.Student?.familyBackground?.guardianFullName || "",
          guardianAddress:
            data?.Student?.familyBackground?.guardianAddress || "",
          guardianContactNumber:
            data?.Student?.familyBackground?.guardianContactNumber || "",
          guardianOccupation:
            data?.Student?.familyBackground?.guardianOccupation || "",
          guardianHighestEducation:
            data?.Student?.familyBackground?.guardianHighestEducation || "",
          guardianTotalParentsTaxableIncome:
            data?.Student?.familyBackground
              ?.guardianTotalParentsTaxableIncome || "",

          siblings: data?.Student?.familyBackground?.siblings || [],
        },
        Account: {
          schoolId: data?.Student?.Account?.schoolId || "",
          email: data?.Student?.Account?.email || "",
          role: data?.Student?.Account?.role || "Student",
        },
      },
      accountId: data?.accountId || 0,
      dateCreated: data?.dateCreated || "",
      email: data?.email || "",
      hashedPassword: data?.hashedPassword || "",
      role: data?.role || "Student",
      schoolId: data?.schoolId || "",
    }),
    [data]
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues, // pass here
  });

  const siblings = useFieldArray({
    control: form.control,
    name: "Student.familyBackground.siblings",
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
    siblings,
  };
}
