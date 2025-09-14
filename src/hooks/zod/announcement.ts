import z from "zod";

export const AnnouncementSchema = z.object({
  announcementId: z.number().optional(),
  adminId: z.number().optional(),
  title: z.string().min(3, "Required"),
  description: z.string().min(3, "Required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  startDate: z.date().optional(),
});

export type AnnouncementFormData = z.infer<typeof AnnouncementSchema>;
