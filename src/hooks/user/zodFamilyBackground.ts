import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import deepEqual from "fast-deep-equal";
import z from "zod";

export const familyBackgroundSchema = z.object({
  fatherFullName: z.string().min(1, "Required"),
  fatherAddress: z.string().min(1, "Required"),
  fatherContactNumber: z.string().min(1, "Required"),
  fatherOccupation: z.string().min(1, "Required"),
  fatherHighestEducation: z.string().min(1, "Required"),
  fatherStatus: z.string().min(1, "Required"),
  fatherTotalParentsTaxableIncome: z.string().min(1, "Required"),

  motherFullName: z.string().min(1, "Required"),
  motherAddress: z.string().min(1, "Required"),
  motherContactNumber: z.string().min(1, "Required"),
  motherOccupation: z.string().min(1, "Required"),
  motherHighestEducation: z.string().min(1, "Required"),
  motherStatus: z.string().min(1, "Required"),
  motherTotalParentsTaxableIncome: z.string().min(1, "Required"),

  guardianFullName: z.string().min(1, "Required"),
  guardianAddress: z.string().min(1, "Required"),
  guardianContactNumber: z.string().min(1, "Required"),
  guardianOccupation: z.string().min(1, "Required"),
  guardianHighestEducation: z.string().min(1, "Required"),

  siblings: z
    .array(
      z.object({
        fullName: z.string().min(1, "Required"),
        age: z.string().min(1, "Required").regex(/^\d+$/, "Only numbers"),
        occupation: z.string().min(1, "Required"),
      })
    )
    .optional(),
});

export type FamilyBackgroundFormData = z.infer<typeof familyBackgroundSchema>;

export function useFamilyBackgroundForm(
  data?: Partial<FamilyBackgroundFormData> | null
) {
  const defaultValues = useMemo<FamilyBackgroundFormData>(
    () => ({
      fatherFullName: data?.fatherFullName ?? "",
      fatherAddress: data?.fatherAddress ?? "",
      fatherContactNumber: data?.fatherContactNumber ?? "",
      fatherOccupation: data?.fatherOccupation ?? "",
      fatherHighestEducation: data?.fatherHighestEducation ?? "",
      fatherStatus: data?.fatherStatus ?? "",
      fatherTotalParentsTaxableIncome:
        data?.fatherTotalParentsTaxableIncome ?? "",

      motherFullName: data?.motherFullName ?? "",
      motherAddress: data?.motherAddress ?? "",
      motherContactNumber: data?.motherContactNumber ?? "",
      motherOccupation: data?.motherOccupation ?? "",
      motherHighestEducation: data?.motherHighestEducation ?? "",
      motherStatus: data?.motherStatus ?? "",
      motherTotalParentsTaxableIncome:
        data?.motherTotalParentsTaxableIncome ?? "",

      guardianFullName: data?.guardianFullName ?? "",
      guardianAddress: data?.guardianAddress ?? "",
      guardianContactNumber: data?.guardianContactNumber ?? "",
      guardianOccupation: data?.guardianOccupation ?? "",
      guardianHighestEducation: data?.guardianHighestEducation ?? "",

      siblings: data?.siblings || [],
    }),
    [data]
  );

  const fbForm = useForm<FamilyBackgroundFormData>({
    resolver: zodResolver(familyBackgroundSchema),
    defaultValues,
  });

  const siblings = useFieldArray({
    control: fbForm.control,
    name: "siblings",
  });

  const [fbIsChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (data) {
      fbForm.reset(defaultValues);
    }
  }, [data, fbForm, defaultValues]);

  useEffect(() => {
    const subscription = fbForm.watch((values) => {
      const hasChanged = !deepEqual(defaultValues, values);
      setIsChanged(hasChanged);
    });
    return () => subscription.unsubscribe();
  }, [fbForm, defaultValues]);

  return {
    fbForm,
    siblings,
    fbIsChanged,
  };
}
