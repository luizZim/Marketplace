import { View, Text, TouchableOpacity } from "react-native"
import { useFilterViewModel } from "./useFilter.viewModel"
import { FC } from "react"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../../styles/colors";
import { AppInput } from "../../../../shared/components/AppInput";
import { AppButton } from "../../../../shared/components/AppButton";
import Checkbox from "expo-checkbox"



export const FilterView: FC<ReturnType<typeof useFilterViewModel>> = ({
  productsCategory,
  isLoading,
  handleCategoryToggle,
  handleValueMaxChange,
  handleValueMinChange,
  selectedCategories,
  handleApplyFilters,
  handleResetFilter,
  close
}) => {
  return (
    <View>
      <View className="flex-row items-center justify-between p-4 px-6">
        <Text className="text-lg font-bold text-gray-900">Filtrar anúncios</Text>
        <TouchableOpacity>
          <Ionicons onPress={() => close()} name="close" size={20} color={colors["purple-base"]} />
        </TouchableOpacity>
      </View>

      <View className="p-4 px-6">
        <Text className="font-semibold text-base text-gray-300">VALOR</Text>

        <View className="flex-row mb-4 w-[100%]">
          <View className="flex-1 ">
            <AppInput onChangeText={(text) => handleValueMinChange(Number(text))} placeholder="De" keyboardType="numeric" containerClassName="w-[90%]" />
          </View>
          <View className="flex-1 ">
            <AppInput onChangeText={(text) => handleValueMaxChange(Number(text))} placeholder="Até" keyboardType="numeric" containerClassName="w-[90%]" />
          </View>
        </View>

        <View>
          <Text className="font-semibold text-base text-gray-300">CATEGORIA</Text>
          {
            isLoading ? (
              <Text>Carregando categorias...</Text>
            ) : (
              <View className="mb-6 gap-3">
                {
                  productsCategory?.map(({ name, id }) => (
                    <TouchableOpacity onPress={() => handleCategoryToggle(id)} className="flex-row items-center py-2" key={`product-category-${id}`}>
                      <Checkbox
                        onValueChange={() => handleCategoryToggle(id)}
                        value={selectedCategories.includes(id)}
                        color={colors["purple-base"]}
                        className="mr-3 rounded-full"
                      />
                      <Text className="text-base text-gray-400">{name}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
            )
          }

          <View className="flex-row gap-3 mt-4 mb-6">
            <View className="flex-1 ">
              <AppButton variant="outlined" onPress={handleResetFilter}>
                Limpar Filtro
              </AppButton>
            </View>
            <View className="flex-1 ">
              <AppButton onPress={handleApplyFilters}>
                Filtrar
              </AppButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}