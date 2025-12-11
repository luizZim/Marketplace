import { router } from "expo-router"
import React, { FC } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AppInputController } from "../../shared/components/AppInputController"
import { AuthFormHeader } from "../../shared/components/AuthFormHeader"
import { KeyboardContainer } from "../../shared/components/KeyboardContainer"
import { useRegisterViewModel } from "./useRegister.viewModel"

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({
  onSubmit,
  control
}) => {

  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <AuthFormHeader title="Crie sua conta" subtitle="Informe seus dados pessoais e de acesso" />

        <AppInputController
          leftIcon="person-outline"
          control={control}
          name="name"
          label="NOME"
        />

        <AppInputController
          leftIcon="mail-outline"
          control={control}
          name="email"
          label="E-MAIL"
        />

        <AppInputController
          leftIcon="call-outline"
          control={control}
          name="phone"
          label="TELEFONE"
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          control={control}
          name="password"
          label="SENHA"
          secureTextEntry
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          control={control}
          name="confirmPassword"
          label="CONFIRMAR SENHA"
          secureTextEntry
        />

        <TouchableOpacity onPress={onSubmit}>
          <Text>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardContainer>
  )
}