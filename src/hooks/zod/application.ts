import z from "zod";
import { StudentSchema } from "../user/zodUserProfile";
import { displayScholarshipSchema } from "../admin/displayScholarshipData";
import { StaffSchema } from "./staff";
const SubmittedDocumentSchema = z.object({
  document: z.string(),
  fileFormat: z.string(),
  fileUrl: z.string(),
  requirementType: z.string(),
  resourceType: z.string(),
  supabasePath: z.string(),
  rejectMessage: z.object({
    status: z.string(),
    comment: z.string(),
  }),
});
const supabasePathSchema = z.object({
  cover: z.string(),
  form: z.string(),
  logo: z.string(),
});
const DecisionMessageSchema = z.record(
  z.string(),
  z.object({
    status: z.string(),
    comment: z.string(),
  })
);

const ApplicationSchema = z.object({
  Scholarship: displayScholarshipSchema, // field name = Scholarship
  Student: StudentSchema, // field name = Student
  Application_Decision: z.object({
    ISPSU_Staff: StaffSchema,
    dateCreated: z.date(),
    decisionId: z.number(),
    status: z.string(),
    message: DecisionMessageSchema.optional(),
  }),
  Interview_Decision: z.object({
    ISPSU_Staff: StaffSchema,
    dateCreated: z.date(),
    interviewId: z.number(),
    staffId: z.number(),
    status: z.string(),
    message: DecisionMessageSchema.optional(),
  }),

  applicationId: z.number(),
  dateCreated: z.string(),
  interviewId: z.string(),
  ownerId: z.number(),
  scholarshipId: z.number(),
  status: z.string(),
  submittedDocuments: z.record(z.string(), z.array(SubmittedDocumentSchema)),
  supabasePath: z.record(z.string(), supabasePathSchema),
});

const UpdatedApplicationSchema = z.object({
  applicationId: z.number(),
  scholarshipId: z.number(),
  ownerId: z.number(),
  status: z.string(),
  dateCreated: z.string().datetime(),
  supabasePath: z.array(z.string()),
  submittedDocuments: z.record(z.string(), z.array(SubmittedDocumentSchema)),
});

export type UpdatedApplicationFormData = z.infer<
  typeof UpdatedApplicationSchema
>;
export type ApplicationFormData = z.infer<typeof ApplicationSchema>;
export type SubmittedDocumentFormData = z.infer<typeof SubmittedDocumentSchema>;
