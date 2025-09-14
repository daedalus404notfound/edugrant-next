import z from "zod";

export const StudentSchema = z.object({
  PWD: z.boolean(),
  studentId: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  course: z.string(),
  dateCreated: z.string(),
  dateOfBirth: z.string(),
  fName: z.string(),
  gender: z.string(),
  indigenous: z.boolean(),
  institute: z.string(),
  lName: z.string(),
  mName: z.string(),
  section: z.string(),
  year: z.string(),
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
  accountId: z.string(),
  dateCreated: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  role: z.string(),
  schoolId: z.string(),
});

export type UserFormData = z.infer<typeof UserSchema>;

export const UserDefault: UserFormData = {
  Student: {
    PWD: false,
    studentId: "",
    address: "",
    contactNumber: "",
    course: "",
    dateCreated: "",
    dateOfBirth: "",
    fName: "",
    mName: "",
    lName: "",
    gender: "",
    indigenous: false,
    institute: "",
    section: "",
    year: "",
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
    Account: {
      schoolId: "",
      email: "",
      role: "",
    },
  },
  accountId: "",
  dateCreated: "",
  email: "",
  hashedPassword: "",
  role: "Student",
  schoolId: "",
};
