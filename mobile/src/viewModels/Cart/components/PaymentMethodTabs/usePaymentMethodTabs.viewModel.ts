import { useSharedValue, withTiming } from "react-native-reanimated";

export type PaymentMethod = "credit_card" | "pix";

export const usePaymentMethodTabsViewModel = (
  selectedMethod: PaymentMethod,
  onSelectMethod: (method: PaymentMethod) => void
) => {
  const translateX = useSharedValue(selectedMethod === "credit_card" ? 0 : 1);

  const selectMethod = (method: PaymentMethod) => {
    translateX.value = withTiming(method === "credit_card" ? 0 : 1, { duration: 300 });
    onSelectMethod(method);
  };

  return {
    translateX,
    selectMethod,
    selectedMethod,
  };
};
