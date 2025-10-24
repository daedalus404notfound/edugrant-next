// // store/applicationUIStore.ts
// import { MetaTypes } from "@/hooks/zodMeta";
// import { create } from "zustand";

// interface ScholarshipCounts {
//   countActive: number;
//   countExpired: number;
//   countRenew: number;
//   countArchived: number;
// }
// export interface MetaWithCountsScholarship extends MetaTypes {
//   count: ScholarshipCounts;
// }
// export const defaultMeta: MetaWithCountsScholarship = {
//   page: 1,
//   pageSize: 10,
//   totalRows: 0,
//   totalPage: 0,
//   sortBy: "",
//   order: "",
//   filters: "",
//   search: "",
//   count: {
//     countActive: 0,
//     countExpired: 0,
//     countRenew: 0,
//     countArchived: 0,
//   },
// };

// export interface ApplicationStore {
//   status: string;
//   status1: string;
//   page: number;
//   pageSize: number;
//   sortBy: string;
//   order: string;
//   search: string;
//   meta: MetaWithCountsScholarship;
//   filters: string;
//   setStatus: (status: string) => void;
//   setStatus1: (status: string) => void;
//   setPage: (page: number) => void;
//   setSearch: (search: string) => void;
//   setOrder: (order: string) => void; // <-- added setter
//   setMeta: (meta: MetaWithCountsScholarship) => void;
// }

// export const useHeadScholarshipStore = create<ApplicationStore>((set) => ({
//   status: "ACTIVE",
//   status1: "",
//   page: 1,
//   pageSize: 10,
//   sortBy: "dateCreated",
//   order: "asc",
//   search: "",
//   filters: "",
//   meta: defaultMeta,
//   setStatus: (status) => set({ status }),
//   setStatus1: (status1) => set({ status1 }),
//   setPage: (page) => set({ page }),
//   setSearch: (search) => set({ search }),
//   setOrder: (order) => set({ order }), // <-- implemented setter
//   setMeta: (meta) => set({ meta }),
// }));
// store/applicationUIStore.ts
// import { create } from "zustand";
// import {
//   PaginationState,
//   SortingState,
//   ColumnFiltersState,
// } from "@tanstack/react-table";
// import { MetaTypes } from "@/hooks/zodMeta";

// interface ScholarshipCounts {
//   countActive: number;
//   countExpired: number;
//   countRenew: number;
//   countArchived: number;
// }

// export interface MetaWithCountsScholarship extends MetaTypes {
//   count: ScholarshipCounts;
// }

// export const defaultMeta: MetaWithCountsScholarship = {
//   page: 1,
//   pageSize: 10,
//   totalRows: 0,
//   totalPage: 0,
//   sortBy: "",
//   order: "",
//   filters: "",
//   search: "",
//   count: {
//     countActive: 0,
//     countExpired: 0,
//     countRenew: 0,
//     countArchived: 0,
//   },
// };

// export interface ApplicationStore {
//   // existing fields
//   status: string;
//   status1: string;
//   meta: MetaWithCountsScholarship;

//   // tanstack states
//   pagination: PaginationState;
//   sorting: SortingState;
//   columnFilters: ColumnFiltersState;

//   // setters
//   setStatus: (status: string) => void;
//   setStatus1: (status1: string) => void;
//   setMeta: (meta: MetaWithCountsScholarship) => void;

//   // tanstack setters
//   setPagination: (pagination: PaginationState) => void;
//   setSorting: (sorting: SortingState) => void;
//   setColumnFilters: (filters: ColumnFiltersState) => void;
// }

// export const useHeadScholarshipStore = create<ApplicationStore>((set) => ({
//   status: "ACTIVE",
//   status1: "",
//   meta: defaultMeta,

//   // TanStack default states
//   pagination: { pageIndex: 0, pageSize: 10 },
//   sorting: [],
//   columnFilters: [],

//   // existing setters
//   setStatus: (status) => set({ status }),
//   setStatus1: (status1) => set({ status1 }),
//   setMeta: (meta) => set({ meta }),

//   // TanStack setters
//   setPagination: (pagination) => set({ pagination }),
//   setSorting: (sorting) => set({ sorting }),
//   setColumnFilters: (filters) => set({ columnFilters: filters }),
// }));
import { create } from "zustand";
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
  Updater,
} from "@tanstack/react-table";
import { MetaTypes } from "@/hooks/zodMeta";

interface ScholarshipCounts {
  countActive: number;
  countExpired: number;
  countRenew: number;
  countEnded: number;
}

export interface MetaWithCountsScholarship extends MetaTypes {
  count: ScholarshipCounts;
}

export const defaultMeta: MetaWithCountsScholarship = {
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

export interface ApplicationStore {
  status: string;
  status1: string;
  search: string;
  meta: MetaWithCountsScholarship;
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;

  // setters compatible with TanStack Table
  setPagination: (updater: Updater<PaginationState>) => void;
  setSorting: (updater: Updater<SortingState>) => void;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;

  // other setters
  setStatus: (status: string) => void;
  setStatus1: (status1: string) => void;
  setSearch: (search: string) => void;
  setMeta: (meta: MetaWithCountsScholarship) => void;
}

export const useHeadScholarshipStore = create<ApplicationStore>((set) => ({
  status: "ACTIVE",
  status1: "",
  meta: defaultMeta,
  search: "",
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  columnFilters: [],

  // compatible setters
  setPagination: (updater) =>
    set((state) => ({
      pagination:
        typeof updater === "function" ? updater(state.pagination) : updater,
    })),

  setSorting: (updater) =>
    set((state) => ({
      sorting: typeof updater === "function" ? updater(state.sorting) : updater,
    })),

  setColumnFilters: (updater) =>
    set((state) => ({
      columnFilters:
        typeof updater === "function" ? updater(state.columnFilters) : updater,
    })),

  // simple setters
  setStatus: (status) => set({ status }),
  setStatus1: (status1) => set({ status1 }),
  setMeta: (meta) => set({ meta }),
  setSearch: (search) => set({ search }),
}));
