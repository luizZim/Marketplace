import { Ionicons } from "@expo/vector-icons";
import { FC, ReactNode, useState } from "react";
import { LayoutChangeEvent, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { colors } from "../../../../styles/colors";
import { usePaymentMethodTabsViewModel } from "./usePaymentMethodTabs.viewModel";

interface PaymentMethodTabsViewProps extends ReturnType<typeof usePaymentMethodTabsViewModel> {
  creditCardContent: ReactNode;
  pixContent: ReactNode;
}

export const PaymentMethodTabsView: FC<PaymentMethodTabsViewProps> = ({
  translateX,
  selectMethod,
  selectedMethod,
  creditCardContent,
  pixContent,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(translateX.value, [0, 1], [0, containerWidth / 2]) }],
  }));

  const contentSlideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(translateX.value, [0, 1], [0, -containerWidth]) }],
  }));

  return (
    <View onLayout={onLayout}>
      <View className="flex-row bg-shape rounded-lg p-1 mb-4">
        <Animated.View
          className="absolute top-1 left-1 bottom-1 bg-purple-base rounded-md"
          style={[{ width: "50%" }, tabIndicatorStyle]}
        />

        <TouchableOpacity
          onPress={() => selectMethod("credit_card")}
          className="flex-1 flex-row items-center justify-center py-3 rounded-md z-10"
        >
          <Ionicons
            name="card-outline"
            size={18}
            color={selectedMethod === "credit_card" ? colors.white : colors.gray[400]}
          />
          <Text
            className={`ml-2 text-sm font-semibold ${
              selectedMethod === "credit_card" ? "text-white" : "text-gray-400"
            }`}
          >
            Cartao
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => selectMethod("pix")}
          className="flex-1 flex-row items-center justify-center py-3 rounded-md z-10"
        >
          <Ionicons
            name="qr-code-outline"
            size={18}
            color={selectedMethod === "pix" ? colors.white : colors.gray[400]}
          />
          <Text
            className={`ml-2 text-sm font-semibold ${
              selectedMethod === "pix" ? "text-white" : "text-gray-400"
            }`}
          >
            PIX
          </Text>
        </TouchableOpacity>
      </View>

      {containerWidth > 0 && (
        <View style={{ overflow: "hidden", width: containerWidth }}>
          <Animated.View
            style={[{ flexDirection: "row", width: containerWidth * 2 }, contentSlideStyle]}
          >
            <View style={{ width: containerWidth }}>{creditCardContent}</View>
            <View style={{ width: containerWidth }}>{pixContent}</View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};
