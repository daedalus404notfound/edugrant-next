import z from "zod";
import { StudentSchema } from "./user";
import { scholarshipSchema, scholarshipFormData } from "./scholarship";

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
const ApplicationSchema = z.object({
  Scholarship: scholarshipSchema, // field name = Scholarship
  Student: StudentSchema, // field name = Student
  applicationId: z.string(),
  dateCreated: z.date(),
  decisionId: z.string(),
  interviewId: z.string(),
  ownerId: z.string(),
  scholarshipId: z.string(),
  status: z.string(),
  submittedDocuments: z.object({
    documents: z.record(z.string(), SubmittedDocumentSchema),
    renewDocuments: z.record(z.string(), SubmittedDocumentSchema),
  }),
  supabasePath: z.record(z.string(), supabasePathSchema),
});
export type ApplicationFormData = z.infer<typeof ApplicationSchema>;
