import z from "zod";
export const StaffSchema = z.object({
  dateCreated: z.date(),
  fName: z.string(),
  mName: z.string().optional(),
  lName: z.string(),
  staffId: z.string(),
  profileImg: z
    .object({
      publicUrl: z.any().optional(),
      path: z.string().optional(),
    })
    .optional(),
});

export type StaffFormData = z.infer<typeof StaffSchema>;
