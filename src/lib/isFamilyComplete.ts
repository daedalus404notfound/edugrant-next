// // // utils/validation.ts
// // import { UserFormData } from "@/hooks/zod/user";

// // export function isFamilyBackgroundComplete(
// //   student?: UserFormData["Student"]
// // ): boolean {
// //   const fb = student?.familyBackground;

// //   if (!fb) return false;

// //   const requiredFields = [
// //     fb.fatherFullName,
// //     fb.fatherAddress,
// //     fb.fatherContactNumber,
// //     fb.fatherOccupation,
// //     fb.fatherHighestEducation,
// //     fb.fatherStatus,
// //     fb.fatherTotalParentsTaxableIncome,

// //     fb.motherFullName,
// //     fb.motherAddress,
// //     fb.motherContactNumber,
// //     fb.motherOccupation,
// //     fb.motherHighestEducation,
// //     fb.motherStatus,
// //     fb.motherTotalParentsTaxableIncome,

// //     fb.guardianFullName,
// //     fb.guardianAddress,
// //     fb.guardianContactNumber,
// //     fb.guardianOccupation,
// //     fb.guardianHighestEducation,
// //     fb.guardianStatus,
// //   ];

// //   return requiredFields.every((field) => field && field.trim() !== "");
// // }
// import { UserFormData } from "@/hooks/zod/user";

// // New: progress + percentage
// export function getFamilyBackgroundProgress(
//   student?: UserFormData["Student"]
// ): { percentage: number; completed: boolean } {
//   const fb = student?.familyBackground;

//   if (!fb) {
//     return { percentage: 0, completed: false };
//   }

//   const requiredFields = [
//     fb.fatherFullName,
//     fb.fatherAddress,
//     fb.fatherContactNumber,
//     fb.fatherOccupation,
//     fb.fatherHighestEducation,
//     fb.fatherStatus,
//     fb.fatherTotalParentsTaxableIncome,

//     fb.motherFullName,
//     fb.motherAddress,
//     fb.motherContactNumber,
//     fb.motherOccupation,
//     fb.motherHighestEducation,
//     fb.motherStatus,
//     fb.motherTotalParentsTaxableIncome,

//     fb.guardianFullName,
//     fb.guardianAddress,
//     fb.guardianContactNumber,
//     fb.guardianOccupation,
//     fb.guardianHighestEducation,
//     fb.guardianStatus,
//   ];

//   const total = requiredFields.length;
//   const filled = requiredFields.filter(
//     (field) => field && field.toString().trim() !== ""
//   ).length;

//   const percentage = Math.round((filled / total) * 100);

//   return { percentage, completed: percentage === 100 };
// }

// // Old: keep boolean-only version
// export function isFamilyBackgroundComplete(
//   student?: UserFormData["Student"]
// ): boolean {
//   return getFamilyBackgroundProgress(student).completed;
// }
import { UserFormData } from "@/hooks/user/zodUserProfile";

// ✅ Return both percentage and completion status
export function getFamilyBackgroundProgress(
  student?: UserFormData["Student"]
): { percentage: number; completed: boolean } {
  const fb = student?.familyBackground;

  if (!fb) {
    return { percentage: 0, completed: false };
  }

  const requiredFields = [
    fb.fatherFullName,
    fb.fatherAddress,
    fb.fatherContactNumber,
    fb.fatherOccupation,
    fb.fatherHighestEducation,
    fb.fatherStatus,
    fb.fatherTotalParentsTaxableIncome,

    fb.motherFullName,
    fb.motherAddress,
    fb.motherContactNumber,
    fb.motherOccupation,
    fb.motherHighestEducation,
    fb.motherStatus,
    fb.motherTotalParentsTaxableIncome,

    fb.guardianFullName,
    fb.guardianAddress,
    fb.guardianContactNumber,
    fb.guardianOccupation,
    fb.guardianHighestEducation,
  ];

  const total = requiredFields.length;

  // Count only valid fields (non-empty and not just spaces)
  const filled = requiredFields.filter(
    (field) => field && field.toString().trim() !== ""
  ).length;

  const percentage = Math.round((filled / total) * 100);

  return { percentage, completed: percentage === 100 };
}
