// store/applicationUIStore.ts
import { MetaTypes } from "@/hooks/zodMeta";
import { create } from "zustand";

export const defaultMeta: MetaTypes = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};

export interface HistoryStore {
  page: number;
  pageSize: number;
  sortBy: string;
  order: string;
  search: string;
  meta: MetaTypes;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setOrder: (order: string) => void; // <-- added setter
  setMeta: (meta: MetaTypes) => void;
  resetPage: () => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  page: 1,
  pageSize: 6,
  sortBy: "dateCreated",
  order: "desc",
  search: "",
  meta: defaultMeta,
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setOrder: (order) => set({ order }),
  setMeta: (meta) => set({ meta }),
  resetPage: () => set({ page: 1 }),
}));
