import { View, Text, TouchableOpacity } from "react-native"
import { useRegisterViewModel } from "./useRegister.viewModel"
import { FC } from "react"

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({ onSubmit }) => {
  return (
    <View className="justify-center items-center flex-1">
      <TouchableOpacity onPress={onSubmit}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  )
}