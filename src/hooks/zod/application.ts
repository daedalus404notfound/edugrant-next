import z from "zod";
import { StudentSchema } from "./user";
import {
  scholarshipFormData,
  scholarshipSchema,
} from "../admin/zodUpdateScholarship";

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
  Scholarship: scholarshipSchema, // field name = Scholarship
  Student: StudentSchema, // field name = Student
  Application_Decision: z.object({
    dateCreated: z.date(),
    decisionId: z.number(),
    staffId: z.number(),
    status: z.string(),
    message: DecisionMessageSchema.optional(),
  }),
  applicationId: z.number(),

  interviewId: z.string(),
  ownerId: z.number(),
  scholarshipId: z.number(),
  status: z.string(),
  submittedDocuments: z.object({
    documents: z.record(z.string(), SubmittedDocumentSchema),
    renewDocuments: z.record(z.string(), SubmittedDocumentSchema),
  }),
  supabasePath: z.record(z.string(), supabasePathSchema),
});
export type ApplicationFormData = z.infer<typeof ApplicationSchema>;
