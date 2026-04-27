import { FC, ReactNode } from "react";
import { PaymentMethodTabsView } from "./PaymentMethodTabs.view";
import { PaymentMethod, usePaymentMethodTabsViewModel } from "./usePaymentMethodTabs.viewModel";

interface PaymentMethodTabsParams {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  creditCardContent: ReactNode;
  pixContent: ReactNode;
}

export const PaymentMethodTabs: FC<PaymentMethodTabsParams> = ({
  selectedMethod,
  onSelectMethod,
  creditCardContent,
  pixContent,
}) => {
  const viewModel = usePaymentMethodTabsViewModel(selectedMethod, onSelectMethod);

  return (
    <PaymentMethodTabsView
      {...viewModel}
      creditCardContent={creditCardContent}
      pixContent={pixContent}
    />
  );
};
