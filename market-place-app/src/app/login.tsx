import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Login() {
  return (
    <View className="justify-center items-center flex-1">
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}