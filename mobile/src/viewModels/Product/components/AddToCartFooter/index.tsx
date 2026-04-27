import { View } from "react-native"
import { ProductInterface } from "../../../../shared/interfaces/product"
import { FC } from "react"
import { AppPriceText } from "../../../../shared/components/AppPriceText"
import { AppButton } from "../../../../shared/components/AppButton"
import { handleUrlParams } from "expo-router/build/fork/getStateFromPath-forks"

interface AddToCartFooterParams {
  product: ProductInterface
  handleAddToCart: () => void
}

export const AddToCartFooter: FC<AddToCartFooterParams> = ({ product, handleAddToCart }) => {
  return (
    <View
      className="fixed justify-between items-center bg-white bottom-0 right-0 left-0 p-7 h-[126px] flex-row"
    >
      <AppPriceText value={Number(product.value)} />
      <AppButton
        onPress={handleAddToCart}
        className="w-[120px] h-[40px]"
        leftIcon="cart"
      >
        Adicionar
      </AppButton>
    </View>
  )
}