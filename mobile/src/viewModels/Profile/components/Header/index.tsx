import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View, Text } from "react-native"
import { colors } from "../../../../styles/colors"
import { router } from "expo-router"
import { useUserStore } from "../../../../shared/store/user-store"
import { FC } from "react"

interface HeaderParams {
  handleLogout: () => void;
}

export const Header: FC<HeaderParams> = ({ handleLogout }) => {
  return (
    <View className="flex-row items-center justify-between py-3 border-shape">
      <TouchableOpacity
        onPress={router.back}
        className="flex-row items-center gap-1"
      >
        <Ionicons name="arrow-back" size={24} color={colors["purple-base"]} />
        <Text className="text-base text-purple-base">Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center gap-1"
      >
        <Ionicons name="log-out-outline" color={colors.danger} size={20} />
        <Text className="text-danger text-base ">Sair</Text>
      </TouchableOpacity>
    </View>
  )
}