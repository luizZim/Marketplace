import { Text, View } from "react-native"
import { AuthFormHeader } from "../../shared/components/AuthFormHeader"

import { router } from "expo-router"
import React, { FC } from "react"
import { AppButton } from "../../shared/components/AppButton"
import { AppInputController } from "../../shared/components/AppInputController"
import { KeyboardContainer } from "../../shared/components/KeyboardContainer"
import { useLoginViewModel } from "./useLogin.viewModel"

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({
  control,
  onSubmit
}) => {
  return (
    <KeyboardContainer>
      <View className="flex-1 items-center justify-center px-[40px]">
        <View className="flex-1 w-full items-center justify-center">
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

          <AppButton className="mt-6" rightIcon="arrow-forward" onPress={onSubmit}>Login</AppButton>
        </View>

        <View className="flex-2 pb-16">
          <Text className="text-base mb-6 text-gray-300">Ainda não tem uma conta?</Text>
          <AppButton variant="outlined" rightIcon="arrow-forward" onPress={() => router.push("/register")}>Registro</AppButton>
        </View>
      </View>
    </KeyboardContainer >
  )
}