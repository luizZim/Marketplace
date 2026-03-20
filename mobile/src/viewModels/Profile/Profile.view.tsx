import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Image, ScrollView, Text, TouchableOpacity } from "react-native"
import { AppButton } from "../../shared/components/AppButton"
import { AppInputController } from "../../shared/components/AppInputController"
import { AuthFormHeader } from "../../shared/components/AuthFormHeader"
import { KeyboardContainer } from "../../shared/components/KeyboardContainer"
import { useProfileViewModel } from "./useProfile.viewModel"
import { Header } from "./components/Header"

export const ProfileView: FC<ReturnType<typeof useProfileViewModel>> = ({
  avatarUri,
  control,
  onSubmit
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <Header />
        <TouchableOpacity
          className="w-[120px] h-[120px] rounded-[12px] items-center justify-center bg-shape self-center mb-8 mt-6"
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

        <Text className="text-base mt-6 font-bold text-gray-500">Dados pessoais</Text>

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

        <AppButton className="mt-6" onPress={onSubmit}>Atualizar cadastro</AppButton>
      </ScrollView>
    </KeyboardContainer>
  )
}