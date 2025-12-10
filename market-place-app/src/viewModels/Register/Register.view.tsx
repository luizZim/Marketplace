import { View, Text, TouchableOpacity } from "react-native"
import { useRegisterViewModel } from "./useRegister.viewModel"
import { FC, useState } from "react"
import { AppInput } from "../../shared/components/AppInput"

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({ onSubmit }) => {
  const [email, setEmail] = useState("")

  return (
    <View className="justify-center items-center flex-1">
      <AppInput
        label="E-mail"
        leftIcon="mail-outline"
        value={email}
        onChangeText={setEmail}
      />
      <AppInput label="Senha" leftIcon="lock-closed-outline" secureTextEntry />
      <TouchableOpacity onPress={onSubmit}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  )
}