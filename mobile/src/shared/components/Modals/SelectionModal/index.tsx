import { View, Text, TouchableOpacity } from "react-native"
import { SelectionOptions } from "../../../hooks/useAppModal";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

export interface SelectionModalProps {
  title: string;
  message?: string;
  options: SelectionOptions[]
}

export const SelectionModal: FC<SelectionModalProps> = ({
  title,
  message,
  options
}) => {
  return (
    <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm p-6">
      <Text>{title}</Text>

      {message && <Text>{message}</Text>}

      <View>
        {
          options.map((option) => (
            <TouchableOpacity
              onPress={option.onPress}
              className="w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2"
            >
              {
                option.icon && (
                  <Ionicons
                    name={option.icon}
                    size={20}
                  />
                )
              }
              <Text>{option.text}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}