import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { colors } from "../../../../styles/colors";
import { usePixPaymentBottomSheetViewModel } from "./usePixPaymentBottomSheet.viewModel";

interface PixPaymentBottomSheetViewProps
  extends ReturnType<typeof usePixPaymentBottomSheetViewModel> {
  brCodeBase64: string;
  brCode: string;
}

export const PixPaymentBottomSheetView: FC<PixPaymentBottomSheetViewProps> = ({
  formattedTime,
  formattedAmount,
  copyToClipboard,
  simulatePayment,
  isExpired,
  brCodeBase64,
  brCode,
}) => {
  return (
    <View className="px-6 pb-6 items-center">
      <Text className="text-lg font-bold text-gray-500 mb-2">Pagamento PIX</Text>

      <View className="flex-row items-center mb-4">
        <Text className="text-sm text-gray-300 mr-1">Valor:</Text>
        <AppPriceText
          value={formattedAmount}
          classNameCurrency="text-lg text-purple-base font-bold"
          classNameValue="text-lg text-purple-base font-bold"
        />
      </View>

      <View className="bg-white rounded-xl p-4 items-center mb-4 border border-shape">
        <Image
          source={{ uri: brCodeBase64 }}
          style={{ width: 220, height: 220 }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-row items-center mb-4">
        <Ionicons
          name="time-outline"
          size={18}
          color={isExpired ? colors.danger : colors.warning}
        />
        <Text
          className={`ml-2 text-sm font-semibold ${isExpired ? "text-danger" : "text-warning"
            }`}
        >
          {isExpired ? "PIX expirado" : `Expira em ${formattedTime}`}
        </Text>
      </View>

      <View className="w-full bg-background rounded-lg p-3 mb-4">
        <Text className="text-[10px] font-semibold text-gray-300 mb-2">COPIA E COLA</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-gray-400 flex-1 mr-2" numberOfLines={1}>
            {brCode}
          </Text>
          <TouchableOpacity
            onPress={copyToClipboard}
            className="flex-row items-center bg-purple-base rounded-md px-3 py-2"
          >
            <Ionicons name="copy-outline" size={16} color={colors.white} />
            <Text className="text-white text-xs font-semibold ml-1">Copiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AppButton onPress={simulatePayment} className="w-full" isDisabled={isExpired}>
        Finalizar pagamento
      </AppButton>
    </View>
  );
};
