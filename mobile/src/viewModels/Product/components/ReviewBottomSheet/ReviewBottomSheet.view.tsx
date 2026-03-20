import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel"
import { FC } from "react"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../../../../styles/colors"
import { AppInput } from "../../../../shared/components/AppInput"
import { AppButton } from "../../../../shared/components/AppButton"
import { Stars } from "./components/Stars"


export const ReviewBottomSheetView: FC<ReturnType<typeof useReviewBottomSheetViewModel>> = ({
  handleContentChange,
  handleRatingChange,
  ratingForm,
  handleFormSubmit,
  isLoading,
  closeBottomSheet
}) => {
  return (
    <View className="bg-background rounded-t-2xl">
      <View className="flex-row items-center justify-between p-6">
        <Text className="text-lg font-bold text-gray-900">{ratingForm.isEditing ? "Editar avaliação" : "Avaliar produto"}</Text>

        <TouchableOpacity className="w-8 h-8 items-center justify-between rounded-[10px] border border-gray-400">
          <Ionicons onPress={() => closeBottomSheet()} name="close" size={24} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>

      {
        isLoading ? (
          <View className="p-6 items-center justify-center min-h-[300px]">
            <ActivityIndicator color={colors["purple-base"]} size={"large"} />
            <Text className="text-gray-600 mt-4 text-center">Verificando avaliação existente...</Text>
          </View>
        ) : (
          <View className="p-6 ">
            <Text className="font-semibold text-base text-gray-300">Nota</Text>

            <View className="flex-row items-center mb-6 gap-2">
              <Stars handleRatingChange={handleRatingChange} rating={ratingForm.rating} />
            </View>


            <AppInput
              onChangeText={handleContentChange}
              label="COMENTÁRIO"
              placeholder={ratingForm.isEditing ? "Edite sua avaliação" : "Descreva sua avaliação"}
              value={ratingForm.content}
              multiline
              numberOfLines={8}
              textAlign="left"
              containerClassName="mb-8"
              className="h-[150px]"
            />

            <View className="flex-row gap-3 mb-8">
              <View className="flex-1">
                <AppButton variant="outlined">Cancelar</AppButton>
              </View>
              <View className="flex-1">
                <AppButton
                  className="flex-1"
                  onPress={handleFormSubmit}
                >
                  {ratingForm.isEditing ? "Atualizar" : "Enviar"}
                </AppButton>
              </View>
            </View>
          </View>
        )
      }

    </View>
  )
}