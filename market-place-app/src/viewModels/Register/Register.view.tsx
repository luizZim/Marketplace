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
          placeholder="Seu nome completo"
        />

        <AppInputController
          leftIcon="call-outline"
          control={control}
          name="phone"
          label="TELEFONE"
          placeholder="(00) 00000-0000"
        />

        <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>

        <AppInputController
          leftIcon="mail-outline"
          control={control}
          name="email"
          label="E-MAIL"
          placeholder="mail@example.com.br"
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          control={control}
          name="password"
          label="SENHA"
          placeholder="Sua senha"
          secureTextEntry
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          control={control}
          name="confirmPassword"
          label="CONFIRMAR SENHA"
          placeholder="Confirme a senha"
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