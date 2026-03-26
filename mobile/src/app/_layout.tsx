import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { Appearance } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

// Força light mode globalmente — evita que o dark mode do sistema
// deixe textos e inputs brancos, já que o app não suporta dark mode.
Appearance.setColorScheme('light')
import ToastManager from 'toastify-react-native'
import { AppModal } from "../shared/components/AppModal"
import { useUserStore } from "../shared/store/user-store"
import '../styles/global.css'

const queryClient = new QueryClient()

export default function RootLayout() {

  const { token } = useUserStore()

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} >
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(private)" />
        </Stack>
        <AppModal />
        <ToastManager useModal={false} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}