import { FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { HomeHeader } from "./components/Header"
import { SearchInput } from "./components/SerachInput"
import React, { FC } from "react"
import { ProductCard } from "./components/ProductCard"
import { useHomeViewModel } from "./useHome.viewModel"
import { Footer } from "./components/Footer"
import { colors } from '../../styles/colors';

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
  products,
  handleEndReached,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  handleRefresh,
  isRefetching
}) => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        ListFooterComponent={<Footer isLoading={hasNextPage && Boolean(isLoading || isFetchingNextPage)} />}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={({ id }) => `product-list-item-${id}`}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />
            <SearchInput />
          </>
        )}
        contentContainerClassName="px-[16px] pb-[120px]"
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            colors={[colors["purple-base"]]}
            tintColor={colors["purple-base"]}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}