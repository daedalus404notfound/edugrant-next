import z from "zod";
import { StudentSchema } from "../user/zodUserProfile";
import { displayScholarshipSchema } from "../admin/displayScholarshipData";
import { StaffSchema } from "./staff";

const documentSchema = z.object({
  document: z.string(),
  fileFormat: z.string(),
  fileUrl: z.string().optional(), // Made optional since it's not in your data
  requirementType: z.string(),
  resourceType: z.string(),
  supabasePath: z.string(),
  rejectMessage: z
    .object({
      status: z.string(),
      comment: z.string(),
    })
    .optional(), // Made optional since it's not always present
});

const DecisionMessageSchema = z.record(
  z.string(),
  z.object({
    status: z.string(),
    comment: z.string(),
  })
);

const ApplicationDecisionSchema = z.object({
  ISPSU_Staff: StaffSchema,
  dateCreated: z.string(), // Changed from z.date() to z.string()
  decisionId: z.number(),
  applicationId: z.number().optional(), // Added field from actual data
  staffId: z.number().optional(), // Added field from actual data
  scholarshipPhase: z.number().optional(), // Added field from actual data
  status: z.string(),
  message: DecisionMessageSchema.optional(),
});

// Fixed: Changed structure to match actual data
const SubmittedDocumentPhaseSchema = z.object({
  documents: z.array(documentSchema),
  Application_Decision: ApplicationDecisionSchema,
  Interview_Decision: ApplicationDecisionSchema,
});

const ApplicationSchema = z.object({
  Scholarship: displayScholarshipSchema,
  Student: StudentSchema,
  Application_Decision: z.array(ApplicationDecisionSchema),
  Interview_Decision: z.array(ApplicationDecisionSchema),
  applicationId: z.number(),
  dateCreated: z.string(), // Changed from date to string
  interviewId: z.string().optional(), // Made optional
  ownerId: z.number(),
  scholarshipId: z.number(),
  status: z.string(),
  // Fixed: Changed from array of SubmittedDocumentSchema to object with documents array
  submittedDocuments: z.record(z.string(), SubmittedDocumentPhaseSchema),
  // Fixed: Changed from nested object to array of strings
  supabasePath: z.array(z.string()),
});

export type GetApplicationFormData = z.infer<typeof ApplicationSchema>;
export type SubmittedDocumentFormData = z.infer<
  typeof SubmittedDocumentPhaseSchema
>;
export type ApplicationDecisionData = z.infer<typeof ApplicationDecisionSchema>;
