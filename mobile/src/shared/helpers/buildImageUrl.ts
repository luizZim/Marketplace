import Constants from "expo-constants";
import { Platform } from "react-native";

export const buildImageUrl = (originalUrl: string) => {
  if (Boolean(Constants.expoConfig?.extra?.isProduction)) {
    return originalUrl
  }

  return Platform.select({
    android: originalUrl.replace("localhost", "192.168.3.240"),
    ios: originalUrl
  })
}