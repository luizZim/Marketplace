import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useProductViewModel } from "../../../viewModels/Product/useProduct.viewModel";
import { ProductView } from "../../../viewModels/Product/product.view";

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const viewModel = useProductViewModel(Number(id))


  return (
    <ProductView {...viewModel} />
  );
}