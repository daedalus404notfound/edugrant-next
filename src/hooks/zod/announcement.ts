import z from "zod";

export const AnnouncementSchemaGet = z.object({
  announcementId: z.number(),
  adminId: z.number().optional(),
  title: z.string().min(3, "Title Required"),
  description: z.string().min(3, "Description Required"),
  tags: z.object({
    data: z.array(z.string()).min(1, "At least one tag is required"),
  }),
  dateCreated: z.date().optional(),
});

export type AnnouncementFormDataGet = z.infer<typeof AnnouncementSchemaGet>;

export const AnnouncementSchemaPost = z.object({
  announcementId: z.number().optional(),
  title: z.string().min(3, "Title Required"),
  description: z.string().min(3, "Description Required"),
  tags: z.object({
    data: z.array(z.string()).min(1, "At least one tag is required"),
  }),
  dateCreated: z.date().optional(),
});

export type AnnouncementFormDataPost = z.infer<typeof AnnouncementSchemaPost>;
