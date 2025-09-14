import { z } from "zod";

// Application-specific filters
export const OptionsApplicationSchema = z.object({
  course: z.array(z.string()),
  section: z.array(z.string()),
  title: z.array(z.string()),
  year: z.array(z.string()),
});

// Scholarship-specific filters
export const OptionsScholarshipSchema = z.object({
  scholarshipAmount: z.array(z.string()),
  scholarshipProvider: z.array(z.string()),
  scholarshipTitle: z.array(z.string()),
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
