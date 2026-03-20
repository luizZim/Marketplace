import { use } from "react";
import { useGetProductsCategoriesQuery } from "../../../../shared/queries/product/use-get-product-categories";
import { useFilterStore } from "../../../../shared/store/use-filter-store";
import { useBottomSheet } from "@gorhom/bottom-sheet";


export const useFilterViewModel = () => {

  const {
    data: productsCategory,
    isLoading,
    isError,
    refetch
  } = useGetProductsCategoriesQuery()

  const { updateFilter, filterState, applyFilters, appliedFilterState, resetFilter } = useFilterStore()
  const { close } = useBottomSheet()

  const handleValueMaxChange = (value: number) => {
    updateFilter({ key: "valueMax", value })
  }

  const handleValueMinChange = (value: number) => {
    updateFilter({ key: "valueMin", value })
  }

  const handleCategoryToggle = (categoryId: number) => {
    const categoryAlreadyInArray = filterState.selectedCategories.includes(categoryId)
    if (categoryAlreadyInArray) {
      updateFilter({ key: "selectedCategories", value: filterState.selectedCategories.filter((id) => id !== categoryId) })
    } else {
      updateFilter({ key: "selectedCategories", value: [...filterState.selectedCategories, categoryId] })
    }
  }

  const handleApplyFilters = () => {
    applyFilters()
    close()
  }

  const handleResetFilter = () => {
    close()
    resetFilter()
  }

  return {
    productsCategory,
    isLoading,
    handleCategoryToggle,
    handleValueMaxChange,
    handleValueMinChange,
    selectedCategories: filterState.selectedCategories,
    handleApplyFilters,
    handleResetFilter,
    close
  };
}