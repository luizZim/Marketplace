import { useProductInfinityQuery } from "../../shared/queries/product/use-product-infinite.query";
import { useFilterStore } from "../../shared/store/use-filter-store";

export const useHomeViewModel = () => {

  const { appliedFilterState } = useFilterStore()

  const {
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    products,
    isRefetching
  } = useProductInfinityQuery({ filters: appliedFilterState })

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }

  const handleRefresh = async () => {
    await refetch();
  }

  const handleEndReached = () => {
    handleLoadMore();
  }

  return {
    handleLoadMore,
    handleRefresh,
    products,
    handleEndReached,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isRefetching
  };
}