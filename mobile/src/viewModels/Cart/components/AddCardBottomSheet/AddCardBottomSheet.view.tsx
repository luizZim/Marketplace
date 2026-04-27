import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { AppInputController } from "../../../../shared/components/AppInputController";
import { colors } from "../../../../styles/colors";
import { useAddCardBottomSheetViewModel } from "./useAddCardBottomSheet.viewModel";
import { CreditCard } from "./components/CreditCard";



export const AddCardBottomSheetView: FC<ReturnType<typeof useAddCardBottomSheetViewModel>> = ({
  control,
  handleCreateCreditCard,
  closeBottomSheet,
  expirationDateMask,
  cardNumberMask,
  isFlipped,
  handleFieldBlur,
  handleFieldFocus,
  focusedField,
  cardData
}) => {
  return (
    <ScrollView className="flex-1">
      <View className="p-8">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bold text-2xl text-center text-gray-900">Adicionar cartão</Text>
          <TouchableOpacity onPress={closeBottomSheet} className="w-8 items-center justify-between border border-gray-400 rounded-[10px]">
            <Ionicons name="close" size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        <CreditCard cardData={cardData} focusedField={focusedField} isFlipped={isFlipped} />

        <View className="mt-6 gap-4">
          <AppInputController
            control={control}
            name="titularName"
            leftIcon="person-outline"
            label="NOME DO TITULAR"
            placeholder="Nome completo"
            onFocus={() => handleFieldFocus("name")}
            onBlur={handleFieldBlur}
          />

          <AppInputController
            control={control}
            name="number"
            leftIcon="card-outline"
            label="NÚMERO"
            placeholder="Número do cartão"
            mask={cardNumberMask}
            maxLength={19}
            onFocus={() => handleFieldFocus("number")}
            onBlur={handleFieldBlur}
          />

          <View className="flex-row gap-2">
            <View className="flex-1">
              <AppInputController
                control={control}
                name="expirationDate"
                leftIcon="calendar-outline"
                label="VENCIMENTO"
                placeholder="MM/AA"
                keyboardType="numeric"
                maxLength={5}
                mask={expirationDateMask}
                onFocus={() => handleFieldFocus("expire")}
                onBlur={handleFieldBlur}
              />
            </View>

            <View className="flex-1">
              <AppInputController
                control={control}
                name="CVV"
                leftIcon="lock-closed-outline"
                label="CVV"
                placeholder="000"
                keyboardType="numeric"
                onFocus={() => handleFieldFocus("cvv")}
                onBlur={handleFieldBlur}
                maxLength={3}
              />
            </View>
          </View>
        </View>

        <View className="flex-row gap-4 pb-5 mt-8">
          <View className="flex-1">
            <AppButton onPress={closeBottomSheet} variant="outlined">Cancelar</AppButton>
          </View>

          <View className="flex-1">
            <AppButton onPress={handleCreateCreditCard}>Salvar</AppButton>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}