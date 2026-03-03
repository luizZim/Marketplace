import { useProductInfiniteQuery } from "../../shared/queries/auth/product/use-product-infinite.query";

export const useHomeViewModel = () => {

  const {
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    products,
    isRefetching
  } = useProductInfiniteQuery()

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

  console.log(JSON.stringify(products, null, 2))
  return {
    handleLoadMore,
    handleRefresh,
    products,
    handleEndReached
  };
}