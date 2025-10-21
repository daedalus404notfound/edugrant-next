import { z } from "zod";

// Application-specific filters
export const OptionsApplicationSchema = z.object({
  course: z.array(z.string()),
  section: z.array(z.string()),
  year: z.array(z.string()),
  institute: z.array(z.string()),
});

// Scholarship-specific filters
export const OptionsScholarshipSchema = z.object({
  provider: z.array(z.string()),
  phase: z.array(z.string()),
  scholarship: z.array(z.string()),
});

// Final combined schema
export const FilterOptionsSchema = z.object({
  getFilterData: OptionsApplicationSchema,
  getScholarshipsFilters: OptionsScholarshipSchema,
});

// Type inference (same as your original TS type)
export type OptionsApplication = z.infer<typeof OptionsApplicationSchema>;
export type OptionsScholarship = z.infer<typeof OptionsScholarshipSchema>;
export type FilterOptions = z.infer<typeof FilterOptionsSchema>;
