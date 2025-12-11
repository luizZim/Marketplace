import { Text, TouchableOpacity, View } from "react-native"
import { AuthFormHeader } from "../../shared/components/AuthFormHeader"
import { AppInput } from "../../shared/components/AppInput"
import { router } from "expo-router"
import { KeyboardContainer } from "../../shared/components/KeyboardContainer"
import React from "react"

export const LoginView = () => {
  return (
    <KeyboardContainer>
      <View className="flex-1, items-center justify-center px-[40px]">
        <AuthFormHeader
          title="Acesse sua conta"
          subtitle="Informe seu e-mail e senha para entrar"
        />

        <AppInput />

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text>Registro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardContainer>
  )
}