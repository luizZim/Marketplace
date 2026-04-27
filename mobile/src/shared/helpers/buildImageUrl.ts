import Constants from "expo-constants";

export const buildImageUrl = (originalUrl: string) => {
  console.log(originalUrl)
  if (Boolean(Constants.expoConfig?.extra?.isProduction)) {
    return originalUrl
  }

  return originalUrl.replace("localhost", "192.168.3.118")
}