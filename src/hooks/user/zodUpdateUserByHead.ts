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
  PWD: z.string(),
  studentId: z.number(),
  address: z.string(),
  contactNumber: z
    .string()
    .regex(/^\+63\d{10}$/, "Must be a valid phone number"),
  course: z.string(),
  dateCreated: z.string(),
  dateOfBirth: z.string(),
  indigenous: z.string().optional(),
  pwd: z.string().optional(),
  fName: z.string(),
  gender: z.string(),

  institute: z.string(),
  lName: z.string(),
  mName: z.string(),
  section: z.string(),
  year: z.string(),
  familyBackground: z.object({
    fatherFullName: z.string().optional(),
    fatherAddress: z.string().optional(),
    fatherContactNumber: z
      .string()
      .regex(/^\+63\d{10}$/, "Must be a valid phone number"),
    fatherOccupation: z.string().optional(),
    fatherHighestEducation: z.string().optional(),
    fatherStatus: z.string().optional(),
    fatherTotalParentsTaxableIncome: z.string().optional(),

    motherFullName: z.string().optional(),
    motherAddress: z.string().optional(),
    motherContactNumber: z
      .string()
      .regex(/^\+63\d{10}$/, "Must be a valid phone number"),
    motherOccupation: z.string().optional(),
    motherHighestEducation: z.string().optional(),
    motherStatus: z.string().optional(),
    motherTotalParentsTaxableIncome: z.string().optional(),

    guardianFullName: z.string().optional(),
    guardianAddress: z.string().optional(),
    guardianContactNumber: z
      .string()
      .regex(/^\+63\d{10}$/, "Must be a valid phone number"),
    guardianOccupation: z.string().optional(),
    guardianHighestEducation: z.string().optional(),

    siblings: z
      .array(
        z.object({
          fullName: z.string(),
          age: z.string(),
          occupation: z.string(),
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

export type StudentUserFormData = z.infer<typeof StudentSchema>;
export function zodUpdateUserByHead(data?: StudentUserFormData | null) {
  const defaultValues: StudentUserFormData = {
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
    familyBackground: {
      fatherFullName: data?.familyBackground?.fatherFullName || "",
      fatherAddress: data?.familyBackground?.fatherAddress || "",
      fatherContactNumber: data?.familyBackground?.fatherContactNumber || "",
      fatherOccupation: data?.familyBackground?.fatherOccupation || "",
      fatherHighestEducation:
        data?.familyBackground?.fatherHighestEducation || "",
      fatherStatus: data?.familyBackground?.fatherStatus || "",
      fatherTotalParentsTaxableIncome:
        data?.familyBackground?.fatherTotalParentsTaxableIncome || "",
      motherFullName: data?.familyBackground?.motherFullName || "",
      motherAddress: data?.familyBackground?.motherAddress || "",
      motherContactNumber: data?.familyBackground?.motherContactNumber || "",
      motherOccupation: data?.familyBackground?.motherOccupation || "",
      motherHighestEducation:
        data?.familyBackground?.motherHighestEducation || "",
      motherStatus: data?.familyBackground?.motherStatus || "",
      motherTotalParentsTaxableIncome:
        data?.familyBackground?.motherTotalParentsTaxableIncome || "",
      guardianFullName: data?.familyBackground?.guardianFullName || "",
      guardianAddress: data?.familyBackground?.guardianAddress || "",
      guardianContactNumber:
        data?.familyBackground?.guardianContactNumber || "",
      guardianOccupation: data?.familyBackground?.guardianOccupation || "",
      guardianHighestEducation:
        data?.familyBackground?.guardianHighestEducation || "",
      siblings: data?.familyBackground?.siblings || [],
    },
    Account: {
      schoolId: data?.Account?.schoolId || "",
      email: data?.Account?.email || "",
      role: data?.Account?.role || "Student",
    },
  };

  const form = useForm<StudentUserFormData>({
    resolver: zodResolver(StudentSchema),
    defaultValues, // pass here
  });

  const siblings = useFieldArray({
    control: form.control,
    name: "familyBackground.siblings",
  });

  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, form]);

  return {
    form,

    siblings,
  };
}
