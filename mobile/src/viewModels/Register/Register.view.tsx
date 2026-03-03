import { router } from "expo-router"
import React, { FC } from "react"
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native"
import { AppInputController } from "../../shared/components/AppInputController"
import { AuthFormHeader } from "../../shared/components/AuthFormHeader"
import { KeyboardContainer } from "../../shared/components/KeyboardContainer"
import { useRegisterViewModel } from "./useRegister.viewModel"
import { AppButton } from "../../shared/components/AppButton"
import { Ionicons } from "@expo/vector-icons"

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({
  onSubmit,
  control,
  handleSelectAvatar,
  avatarUri
}) => {

  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <AuthFormHeader title="Crie sua conta" subtitle="Informe seus dados pessoais e de acesso" />

        <TouchableOpacity
          className="w-[120px] h-[120px] rounded-[12px] items-center justify-center bg-shape self-center mb-8"
          onPress={handleSelectAvatar}
        >
          {
            avatarUri ? (
              <Image source={{ uri: avatarUri }}
                className="w-full h-full rounded-[12px]"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="cloud-upload-outline" size={32} />
            )
          }
        </TouchableOpacity>

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

        <AppButton className="mt-6" onPress={onSubmit}>Registrar</AppButton>

        <View className="mt-16">
          <Text className="text-base text-gray-300 mb-6 ">Já tem uma conta?</Text>
          <AppButton variant="outlined" onPress={() => router.push("/(public)/login")} >Login</AppButton>
        </View>
      </ScrollView>
    </KeyboardContainer>
  )
}