// import z from "zod";

// const SubmittedDocumentSchema = z.object({
//   document: z.string(),
//   fileFormat: z.string(),
//   fileUrl: z.string(),
//   requirementType: z.string(),
//   resourceType: z.string(),
//   supabasePath: z.string(),
//   rejectMessage: z.object({
//     status: z.string(),
//     comment: z.string(),
//   }),
// });
// const ApplicationSchema = z.object({
//   applicationId: z.number().optional(),
//   dateCreated: z.string().optional(),
//   decisionId: z.string().nullable().optional(),
//   interviewId: z.string().nullable().optional(),
//   ownerId: z.number().optional(),
//   scholarshipId: z.number(),
//   status: z.string().optional(),
//   submittedDocuments: z
//     .object({
//       documents: z.record(z.string(), SubmittedDocumentSchema),
//       renewDocuments: z.record(z.string(), SubmittedDocumentSchema),
//     })
//     .optional(),
//   supabasePath: z.array(z.string()).optional(),
// });

// export const StudentSchema = z.object({
//   Application: z.array(ApplicationSchema),
//   PWD: z.boolean(),
//   studentId: z.number(),
//   address: z.string(),
//   contactNumber: z.string(),
//   course: z.string(),
//   dateCreated: z.string(),
//   dateOfBirth: z.string(),
//   fName: z.string(),
//   gender: z.string(),
//   indigenous: z.boolean(),
//   institute: z.string(),
//   lName: z.string(),
//   mName: z.string(),
//   section: z.string(),
//   year: z.string(),
//   familyBackground: z.object({
//     fatherFullName: z.string().optional(),
//     fatherAddress: z.string().optional(),
//     fatherContactNumber: z.string().optional(),
//     fatherOccupation: z.string().optional(),
//     fatherHighestEducation: z.string().optional(),
//     fatherStatus: z.string().optional(),
//     fatherTotalParentsTaxableIncome: z.string().optional(),

//     motherFullName: z.string().optional(),
//     motherAddress: z.string().optional(),
//     motherContactNumber: z.string().optional(),
//     motherOccupation: z.string().optional(),
//     motherHighestEducation: z.string().optional(),
//     motherStatus: z.string().optional(),
//     motherTotalParentsTaxableIncome: z.string().optional(),

//     guardianFullName: z.string().optional(),
//     guardianAddress: z.string().optional(),
//     guardianContactNumber: z.string().optional(),
//     guardianOccupation: z.string().optional(),
//     guardianHighestEducation: z.string().optional(),
//     guardianStatus: z.string().optional(),

//     siblings: z
//       .array(
//         z.object({
//           fullName: z.string(),
//           age: z.string(),
//           occupation: z.string(),
//         })
//       )
//       .optional(),
//   }),
//   Account: z.object({
//     schoolId: z.string(),
//     email: z.string(),
//     role: z.string(),
//   }),
// });

// export const UserSchema = z.object({
//   Student: StudentSchema,
//   accountId: z.number(),
//   dateCreated: z.string(),
//   email: z.string(),
//   hashedPassword: z.string(),
//   role: z.string(),
//   schoolId: z.string(),
// });

// export type UserFormData = z.infer<typeof UserSchema>;

// export const UserDefault: UserFormData = {
//   Student: {
//     Application: [],
//     PWD: false,
//     studentId: 0,
//     address: "",
//     contactNumber: "",
//     course: "",
//     dateCreated: "",
//     dateOfBirth: "",
//     fName: "",
//     mName: "",
//     lName: "",
//     gender: "",
//     indigenous: false,
//     institute: "",
//     section: "",
//     year: "",
//     familyBackground: {
//       fatherFullName: "",
//       fatherAddress: "",
//       fatherContactNumber: "",
//       fatherOccupation: "",
//       fatherHighestEducation: "",
//       fatherStatus: "",
//       fatherTotalParentsTaxableIncome: "",

//       motherFullName: "",
//       motherAddress: "",
//       motherContactNumber: "",
//       motherOccupation: "",
//       motherHighestEducation: "",
//       motherStatus: "",
//       motherTotalParentsTaxableIncome: "",

//       guardianFullName: "",
//       guardianAddress: "",
//       guardianContactNumber: "",
//       guardianOccupation: "",
//       guardianHighestEducation: "",
//       guardianStatus: "",

//       siblings: [],
//     },
//     Account: {
//       schoolId: "",
//       email: "",
//       role: "",
//     },
//   },
//   accountId: 0,
//   dateCreated: "",
//   email: "",
//   hashedPassword: "",
//   role: "Student",
//   schoolId: "",
// };
