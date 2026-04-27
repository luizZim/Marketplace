import { FC } from "react";
import { PixPaymentBottomSheetView } from "./PixPaymentBottomSheet.view";
import { usePixPaymentBottomSheetViewModel } from "./usePixPaymentBottomSheet.viewModel";

export interface PixPaymentBottomSheetParams {
  brCode: string;
  brCodeBase64: string;
  amount: number;
  expiresIn: number;
}

export const PixPaymentBottomSheet: FC<PixPaymentBottomSheetParams> = ({
  brCode,
  brCodeBase64,
  amount,
  expiresIn,
}) => {
  const viewModel = usePixPaymentBottomSheetViewModel({ brCode, amount, expiresIn });

  return (
    <PixPaymentBottomSheetView {...viewModel} brCodeBase64={brCodeBase64} brCode={brCode} />
  );
};
