import { Text, TouchableOpacity, View } from "react-native"
import { AuthFormHeader } from "../../shared/components/AuthFormHeader"
import { AppInput } from "../../shared/components/AppInput"
import { router } from "expo-router"
import { KeyboardContainer } from "../../shared/components/KeyboardContainer"
import React, { FC } from "react"
import { useLoginViewModel } from "./useLogin.viewModel"
import { AppInputController } from "../../shared/components/AppInputController"

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({
  control,
  onSubmit
}) => {
  return (
    <KeyboardContainer>
      <View className="flex-1, items-center justify-center px-[40px]">
        <AuthFormHeader
          title="Acesse sua conta"
          subtitle="Informe seu e-mail e senha para entrar"
        />

        <AppInputController
          control={control}
          name="email"
          leftIcon="mail-outline"
          label="E-MAIL"
          placeholder="mail@example.com.br"
        />

        <AppInputController
          control={control}
          name="password"
          leftIcon="lock-closed-outline"
          label="SENHA"
          placeholder="Sua senha"
          secureTextEntry
        />

        <TouchableOpacity onPress={onSubmit}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text>Registro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardContainer>
  )
}