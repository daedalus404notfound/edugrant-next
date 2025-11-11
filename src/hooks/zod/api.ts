import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import z from "zod";
import { displayScholarshipFormData } from "../admin/displayScholarshipData";

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
const ApplicationCountsSchema = z.object({
  APPROVED: z.number(),
  BLOCKED: z.number(),
  DECLINED: z.number(),
  PENDING: z.number(),
  INTERVIEW: z.number(),
});
const ScholarshipCountsSchema = z.object({
  countActive: z.number(),
  countRenew: z.number(),
  countExpired: z.number(),
  countEnded: z.number(),
});
const ApiErrorResponseSchema = z.object({
  message: z.string(),
  error: z.string(),
  statusCode: z.number(),
});

export type TanstackTablePropsSchema = {
  status?: string;
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  search?: string;
};
const MetaWithApplicationCountsSchema = MetaSchema.extend({
  counts: ApplicationCountsSchema,
});
const MetaWithScholarshipCountsSchema = MetaSchema.extend({
  counts: ScholarshipCountsSchema,
});
const MetaWithScholarshipCountsSchemaHead = MetaSchema.extend({
  count: ScholarshipCountsSchema,
});
export type MetaTypesFormData = z.infer<typeof MetaSchema>;
export type MetaApplicationCountsFormData = z.infer<
  typeof MetaWithApplicationCountsSchema
>;
export type MetaScholarshipFormData = z.infer<
  typeof MetaWithScholarshipCountsSchema
>;
export type MetaScholarshipFormDataHead = z.infer<
  typeof MetaWithScholarshipCountsSchemaHead
>;
export type ApiErrorResponseFormData = z.infer<typeof ApiErrorResponseSchema>;

export const defaultMeta: MetaTypesFormData = {
  page: 0,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};

export const defaultMetaApplicationCounts: MetaApplicationCountsFormData = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
  counts: {
    APPROVED: 0,
    BLOCKED: 0,
    DECLINED: 0,
    PENDING: 0,
    INTERVIEW: 0,
  },
};
export const defaultMetaScholarshipCounts: MetaScholarshipFormData = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
  counts: {
    countActive: 0,
    countExpired: 0,
    countRenew: 0,
    countEnded: 0,
  },
};
export const defaultMetaScholarshipCountsHead: MetaScholarshipFormDataHead = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
  count: {
    countActive: 0,
    countExpired: 0,
    countRenew: 0,
    countEnded: 0,
  },
};

export interface GetScholarshipTypes {
  data: displayScholarshipFormData[];
  meta: MetaScholarshipFormData;
}
export interface GetScholarshipTypesHead {
  data: displayScholarshipFormData[];
  meta: MetaScholarshipFormDataHead;
}
