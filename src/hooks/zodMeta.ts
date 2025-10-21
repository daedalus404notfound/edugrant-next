import z from "zod";

const MetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalRows: z.number(),
  totalPage: z.number(),
  sortBy: z.string(),
  order: z.string(),
  filters: z.string(),
  search: z.string(),
});

export type MetaTypes = z.infer<typeof MetaSchema>;
