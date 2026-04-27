import { useState, useEffect, useCallback } from "react";
import * as Clipboard from "expo-clipboard";
import { Toast } from "toastify-react-native";
import { router } from "expo-router";
import { useBottomSheetStore } from "../../../../shared/store/bottomSheet-store";
import { useCartStore } from "../../../../shared/store/cart-store";
import { useAppModal } from "../../../../shared/hooks/useAppModal";

interface UsePixPaymentBottomSheetParams {
  brCode: string;
  amount: number;
  expiresIn: number;
}

export const usePixPaymentBottomSheetViewModel = ({
  brCode,
  amount,
  expiresIn,
}: UsePixPaymentBottomSheetParams) => {
  const [timeRemaining, setTimeRemaining] = useState(expiresIn);
  const { close: closeBottomSheet } = useBottomSheetStore();
  const { clearCart } = useCartStore();
  const { showSuccess } = useAppModal();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = `${String(Math.floor(timeRemaining / 60)).padStart(2, "0")}:${String(
    timeRemaining % 60
  ).padStart(2, "0")}`;

  const formattedAmount = amount / 100;

  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(brCode);
    Toast.success("Codigo PIX copiado!", "top");
  }, [brCode]);

  const simulatePayment = useCallback(() => {
    closeBottomSheet();
    clearCart();
    showSuccess({
      title: "Sucesso",
      message: "Pagamento PIX realizado com sucesso!",
      buttonText: "Ver Pedidos",
      onButtonPress: () => {
        router.push("/orders");
      },
    });
  }, [closeBottomSheet, clearCart, showSuccess]);

  const isExpired = timeRemaining <= 0;

  return {
    timeRemaining,
    formattedTime,
    formattedAmount,
    copyToClipboard,
    simulatePayment,
    isExpired,
  };
};
