// store/applicationUIStore.ts
import { MetaTypes } from "@/hooks/zodMeta";
import { create } from "zustand";

interface ScholarshipCounts {
  APPROVED: number;
  BLOCKED: number;
  DECLINED: number;
  PENDING: number;
  INTERVIEW: number;
}
export interface MetaWithCounts extends MetaTypes {
  counts: ScholarshipCounts;
}
export const defaultMeta: MetaWithCounts = {
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

export interface ApplicationStore {
  status: string;
  status1: string;
  page: number;
  pageSize: number;
  sortBy: string;
  order: string;
  search: string;
  meta: MetaWithCounts;
  setStatus: (status: string) => void;
  setStatus1: (status: string) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setOrder: (order: string) => void; // <-- added setter
  setMeta: (meta: MetaWithCounts) => void;
  setCounts: (counts: Partial<ScholarshipCounts>) => void; // ✅ added
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  status: "PENDING",
  status1: "",
  page: 1,
  pageSize: 6,
  sortBy: "dateCreated",
  order: "desc",
  search: "",
  meta: defaultMeta,
  setStatus: (status) => set({ status }),
  setStatus1: (status1) => set({ status1 }),
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setOrder: (order) => set({ order }), // <-- implemented setter
  setMeta: (meta) => set({ meta }),
  setCounts: (counts) =>
    set((state) => ({
      meta: {
        ...state.meta,
        counts: { ...state.meta.counts, ...counts },
      },
    })),
}));
