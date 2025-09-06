import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import deepEqual from "fast-deep-equal";

export const profileSchema = z.object({
  // Personal
  userId: z.number().optional(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  contactNumber: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),

  // Account
  studentId: z.string(),

  course: z.string(),
  year: z.string(),
  section: z.string(),

  // Family
  familyBackground: z.object({
    fatherFullName: z.string().optional(),
    fatherAddress: z.string().optional(),
    fatherContactNumber: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherHighestEducation: z.string().optional(),
    fatherStatus: z.string().optional(),
    fatherTotalParentsTaxableIncome: z.string().optional(),

    motherFullName: z.string().optional(),
    motherAddress: z.string().optional(),
    motherContactNumber: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherHighestEducation: z.string().optional(),
    motherStatus: z.string().optional(),
    motherTotalParentsTaxableIncome: z.string().optional(),

    guardianFullName: z.string().optional(),
    guardianAddress: z.string().optional(),
    guardianContactNumber: z.string().optional(),
    guardianOccupation: z.string().optional(),
    guardianHighestEducation: z.string().optional(),
    guardianStatus: z.string().optional(),

    siblings: z
      .array(
        z.object({
          fullName: z.string(),
          age: z.number(),
          occupation: z.string(),
        })
      )
      .optional(),
  }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

const getDefaultValues = (): ProfileFormData => ({
  firstName: "",
  middleName: "",
  lastName: "",
  contactNumber: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  studentId: "",

  course: "",
  year: "",
  section: "",
  familyBackground: {
    fatherFullName: "",
    fatherAddress: "",
    fatherContactNumber: "",
    fatherOccupation: "",
    fatherHighestEducation: "",
    fatherStatus: "",
    fatherTotalParentsTaxableIncome: "",
    motherFullName: "",
    motherAddress: "",
    motherContactNumber: "",
    motherOccupation: "",
    motherHighestEducation: "",
    motherStatus: "",
    motherTotalParentsTaxableIncome: "",
    guardianFullName: "",
    guardianAddress: "",
    guardianContactNumber: "",
    guardianOccupation: "",
    guardianHighestEducation: "",
    guardianStatus: "",
    siblings: [],
  },
});

export function useProfileForm(initialData?: ProfileFormData) {
  const [originalData, setOriginalData] = useState<ProfileFormData | null>(
    null
  );

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: getDefaultValues(),
  });

  const { watch, reset } = form;

  const siblings = useFieldArray({
    control: form.control,
    name: "familyBackground.siblings",
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      const dataWithDefaults = {
        ...initialData,
        familyBackground: {
          ...getDefaultValues().familyBackground,
          ...initialData.familyBackground,
          siblings: initialData.familyBackground?.siblings || [],
        },
      };
      reset(dataWithDefaults);
      setOriginalData(dataWithDefaults);
    }
  }, [initialData, reset]);

  const watchedData = watch();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (originalData) {
      const currentData = { ...watchedData };
      if (!currentData.familyBackground.siblings) {
        currentData.familyBackground.siblings = [];
      }
      setHasChanges(!deepEqual(originalData, currentData));
    } else {
      setHasChanges(false);
    }
  }, [watchedData, originalData]);

  return {
    form,
    formData: watchedData,
    hasChanges,
    siblings,

    resetChanges: () => {
      if (originalData) {
        reset(originalData);
        setHasChanges(false);
      }
    },
  };
}
