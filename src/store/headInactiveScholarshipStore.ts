// import { create } from "zustand";
// import {
//   PaginationState,
//   SortingState,
//   ColumnFiltersState,
//   Updater,
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
//   status: string;
//   status1: string;
//   search: string;
//   meta: MetaWithCountsScholarship;
//   pagination: PaginationState;
//   sorting: SortingState;
//   columnFilters: ColumnFiltersState;

//   // setters compatible with TanStack Table
//   setPagination: (updater: Updater<PaginationState>) => void;
//   setSorting: (updater: Updater<SortingState>) => void;
//   setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;

//   // other setters
//   setStatus: (status: string) => void;
//   setStatus1: (status1: string) => void;
//   setSearch: (search: string) => void;
//   setMeta: (meta: MetaWithCountsScholarship) => void;
// }

// export const useHeadInactiveScholarshipStore = create<ApplicationStore>((set) => ({
//   status: "EXPIRED",
//   status1: "",
//   meta: defaultMeta,
//   search: "",
//   pagination: { pageIndex: 0, pageSize: 10 },
//   sorting: [],
//   columnFilters: [],

//   // compatible setters
//   setPagination: (updater) =>
//     set((state) => ({
//       pagination:
//         typeof updater === "function" ? updater(state.pagination) : updater,
//     })),

//   setSorting: (updater) =>
//     set((state) => ({
//       sorting: typeof updater === "function" ? updater(state.sorting) : updater,
//     })),

//   setColumnFilters: (updater) =>
//     set((state) => ({
//       columnFilters:
//         typeof updater === "function" ? updater(state.columnFilters) : updater,
//     })),

//   // simple setters
//   setStatus: (status) => set({ status }),
//   setStatus1: (status1) => set({ status1 }),
//   setMeta: (meta) => set({ meta }),
//   setSearch: (search) => set({ search }),
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
  countArchived: number;
}

export interface MetaWithCountsScholarship extends MetaTypes {
  count: ScholarshipCounts;
}

export const defaultMetaInactive: MetaWithCountsScholarship = {
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
    countArchived: 0,
  },
};

export interface ApplicationInactiveStore {
  statusInactive: string;
  status1Inactive: string;
  searchInactive: string;
  metaInactive: MetaWithCountsScholarship;
  paginationInactive: PaginationState;
  sortingInactive: SortingState;
  columnFiltersInactive: ColumnFiltersState;

  // setters compatible with TanStack Table
  setPaginationInactive: (updater: Updater<PaginationState>) => void;
  setSortingInactive: (updater: Updater<SortingState>) => void;
  setColumnFiltersInactive: (updater: Updater<ColumnFiltersState>) => void;

  // other setters
  setStatusInactive: (statusInactive: string) => void;
  setStatus1Inactive: (status1Inactive: string) => void;
  setSearchInactive: (searchInactive: string) => void;
  setMetaInactive: (metaInactive: MetaWithCountsScholarship) => void;
}

export const useHeadInactiveScholarshipStore = create<ApplicationInactiveStore>(
  (set) => ({
    statusInactive: "EXPIRED",
    status1Inactive: "",
    metaInactive: defaultMetaInactive,
    searchInactive: "",
    paginationInactive: { pageIndex: 0, pageSize: 10 },
    sortingInactive: [],
    columnFiltersInactive: [],

    // compatible setters
    setPaginationInactive: (updater) =>
      set((state) => ({
        paginationInactive:
          typeof updater === "function"
            ? updater(state.paginationInactive)
            : updater,
      })),

    setSortingInactive: (updater) =>
      set((state) => ({
        sortingInactive:
          typeof updater === "function"
            ? updater(state.sortingInactive)
            : updater,
      })),

    setColumnFiltersInactive: (updater) =>
      set((state) => ({
        columnFiltersInactive:
          typeof updater === "function"
            ? updater(state.columnFiltersInactive)
            : updater,
      })),

    // simple setters
    setStatusInactive: (statusInactive) => set({ statusInactive }),
    setStatus1Inactive: (status1Inactive) => set({ status1Inactive }),
    setMetaInactive: (metaInactive) => set({ metaInactive }),
    setSearchInactive: (searchInactive) => set({ searchInactive }),
  })
);
