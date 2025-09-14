import z from "zod";
const StaffSchema = z.object({
  dateCreated: z.date(),
  fName: z.string(),
  mName: z.string().optional(),
  lName: z.string(),
  staffId: z.string(),
});

export type StaffFormData = z.infer<typeof StaffSchema>;
