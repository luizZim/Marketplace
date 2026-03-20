import { Ionicons } from "@expo/vector-icons";
import { useModalStore } from "../store/modal-store"
import { createElement } from "react";
import { SelectionModal, SelectionModalProps } from "../components/Modals/SelectionModal";
import { SuccessModal, SuccessModalParams } from "../components/Modals/SuccessModal";

export type SelectionVariant = "primary" | "secundary" | "danger";

export interface SelectionOptions {
  text: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant: SelectionVariant
}


export const useAppModal = () => {
  const { open, close } = useModalStore()

  const showSelection = ({ options, title, message }: { title: string; message?: string; options: SelectionOptions[]; }) => {
    open(createElement(SelectionModal, { options, title, message } as SelectionModalProps))
  }

  const showSuccess = (config: SuccessModalParams) => {
    open(
      createElement(SuccessModal, {
        ...config,
        onButtonPress: () => {
          if (config.onButtonPress) {
            config.onButtonPress();
          }
          close();
        },
      })
    );
  };

  return { showSelection, showSuccess }
}