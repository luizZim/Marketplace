import { create } from "zustand";

export interface FilterState {
  valueMin: number | null;
  valueMax: number | null;
  selectedCategories: number[],
  searchText: string;
}

interface FilterStore {
  appliedFilterState: FilterState;
  filterState: FilterState;
  updateFilter: (props: { key: keyof FilterState, value: string | number | number[] }) => void

  resetFilter: () => void
  applyFilters: () => void
}

const defaultFilterValues = {
  valueMin: null,
  valueMax: null,
  searchText: "",
  selectedCategories: []
}

export const useFilterStore = create<FilterStore>((set) => ({
  appliedFilterState: defaultFilterValues,
  filterState: defaultFilterValues,

  updateFilter: ({ key, value }) => {
    set((state) => ({
      filterState: { ...state.filterState, [key]: value }
    }))
  },

  resetFilter: () => set({
    appliedFilterState: defaultFilterValues,
    filterState: defaultFilterValues
  }),

  applyFilters: () => set((state) => ({
    appliedFilterState: state.filterState
  }))
}))