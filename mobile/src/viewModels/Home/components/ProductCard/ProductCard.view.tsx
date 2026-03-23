import { Text, TouchableOpacity, View, Image } from "react-native";
import { FC } from "react";
import { useProductCardViewModel } from "./useProductCard.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { router } from "expo-router";
import { buildImageUrl } from "../../../../shared/helpers/buildImageUrl";


export const ProductCardView: FC<ReturnType<typeof useProductCardViewModel>> = ({ product, displayName, formatRating }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)} className="w-[48%] my-1 rounded-xl shadow-sm overflow-hidden h-[157px] p-[4px] bg-white mb-2">
      <View>
        <Image
          source={{ uri: buildImageUrl(product.photo) }}
          className="w-full h-[96px] rounded-[6px]"
          resizeMode="cover"
        />
        <View className="absolute top-0 right-0 flex-row items-center px-2 py-1 rounded-b-lg rounded-r-none bg-white">
          <Ionicons name="star" size={12} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1">
            {formatRating}
          </Text>
        </View>
      </View>

      <View className="p-3 ">
        <Text className="text-xs font-semibold mb-1" numberOfLines={2}>
          {displayName}
        </Text>
        <View className="flex-row items-center justify-between">
          <AppPriceText
            value={Number(product.value)}
            classNameCurrency="text-small"
            classNameValue="text-lg font-bold flex-1"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}