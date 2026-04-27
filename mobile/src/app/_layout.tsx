import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { Appearance } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import ToastManager from 'toastify-react-native'
import { AppModal } from "../shared/components/AppModal"
import '../styles/global.css'
import { useNotifications } from "../shared/hooks/useNotifications"
import { useOneSignal } from "../shared/hooks/useOneSignal"

Appearance.setColorScheme('light')

const queryClient = new QueryClient()

export default function RootLayout() {
  useNotifications();
  useOneSignal();

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