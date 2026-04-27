import { useCartStore } from "../../../../shared/store/cart-store";
import { CreditCard } from '../../../../shared/interfaces/credit-card';
import { createElement, useState } from "react";
import { useSubmitOrderMutation } from "../../../../shared/queries/orders/use-submit-order.mutation";
import { router } from "expo-router";
import { useAppModal } from "../../../../shared/hooks/useAppModal";
import { PaymentMethod } from "../PaymentMethodTabs/usePaymentMethodTabs.viewModel";
import { useCreatePixMutation } from "../../../../shared/queries/pix/use-create-pix.mutation";
import { useBottomSheetStore } from "../../../../shared/store/bottomSheet-store";
import { PixPaymentBottomSheet } from "../PixPaymentBottomSheet";
import { localNotificationsService } from "../../../../shared/services/local-notifications.service";

export const useCartFooterViewModel = () => {
  const [selectedCreditCard, setSelectedCreditCard] = useState<null | CreditCard>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card")
  const { total, products, clearCart } = useCartStore();
  const { showSuccess } = useAppModal()
  const { open: openBottomSheet } = useBottomSheetStore()

  const createOrderMutation = useSubmitOrderMutation();
  const createPixMutation = useCreatePixMutation();

  const submitOrderMutation = async () => {
    if (!selectedCreditCard) return

    await createOrderMutation.mutateAsync({
      creditCardId: selectedCreditCard?.id,
      items: products.map(({ id, quantity }) => ({ productId: id, quantity })),
    });

    products.forEach(({ id, name }, index) => {
      localNotificationsService.cancelNotifications(
        `${localNotificationsService.NOTIFICATION_IDS.CART_REMINDER}-${id}`
      )

      localNotificationsService.scheduleFeedbackNotification({
        delayInMinutes: 60 * (index + 1),
        productId: id,
        productName: name
      })
    });



    clearCart();

    showSuccess({
      title: "Sucesso",
      message: "Pedido feito com sucesso!",
      buttonText: "Ver Pedidos",
      onButtonPress: () => {
        router.push("/orders");
      }
    })
  }

  const submitPixPayment = async () => {
    const response = await createPixMutation.mutateAsync({
      amount: Math.round(total * 100),
      expiresIn: 3600,
      description: "Pagamento via PIX",
    });

    openBottomSheet({
      content: createElement(PixPaymentBottomSheet, {
        brCode: response.data.brCode,
        brCodeBase64: response.data.brCodeBase64,
        amount: response.data.amount,
        expiresIn: 3600,
      }),
      config: {
        snapPoints: ["85%"],
      },
    });
  }

  return {
    total,
    setSelectedCreditCard,
    selectedCreditCard,
    submitOrderMutation,
    isOrderLoading: createOrderMutation.isPending,
    paymentMethod,
    setPaymentMethod,
    submitPixPayment,
    isPixLoading: createPixMutation.isPending,
  };
};
