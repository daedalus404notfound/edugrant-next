import { MetaTypes } from "@/hooks/zodMeta";
import { create } from "zustand";

export const defaultAnnouncementMeta: MetaTypes = {
  page: 1,
  pageSize: 10,
  totalRows: 0,
  totalPage: 0,
  sortBy: "",
  order: "",
  filters: "",
  search: "",
};

export interface AnnouncementStore {
  page: number;
  pageSize: number;
  sortBy: string;
  order: string;
  search: string;
  meta: MetaTypes;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: string) => void;
  setOrder: (order: string) => void;
  setMeta: (meta: MetaTypes) => void;
  resetPage: () => void;
}

export const useAnnouncementUserStore = create<AnnouncementStore>((set) => ({
  page: 1,
  pageSize: 6,
  sortBy: "dateCreated",
  order: "desc",
  search: "",
  meta: defaultAnnouncementMeta,

  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setSortBy: (sortBy) => set({ sortBy }),
  setOrder: (order) => set({ order }),
  setMeta: (meta) => set({ meta }),
  resetPage: () => set({ page: 1 }),
}));
