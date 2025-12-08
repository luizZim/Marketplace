import { View, Pressable, TextInput, TouchableOpacity, Text, TextInputProps } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { useAppInputViewModel } from "./useAppInputViewModel"
import { appInputVariants, AppInputVariantsProps } from "./inputs.variants"

export interface AppInputProps extends TextInputProps, AppInputVariantsProps {
  label?: string
  leftIcon?: keyof typeof Ionicons.glyphMap
  rightIcon?: keyof typeof Ionicons.glyphMap
  containerClassName?: string
  mask?: (value: string) => void | string
  error?: string
}

export const AppInput: FC<AppInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  containerClassName,
  value,
  isError,
  secureTextEntry,
  onBlur,
  onFocus,
  onChangeText,
  mask,
  error,
  isDisabled,
  ...textInputProps
}) => {
  const {
    getIconColor,
    handleBlur,
    handleFocus,
    handleWrapperPress,
    handlePasswordToggle,
    handleTextChange,
    isFocused
  } = useAppInputViewModel({
    error,
    onBlur,
    onFocus,
    isError: !!error,
    mask,
    onChangeText,
    isDisabled,
    secureTextEntry,
    value
  })

  const styles = appInputVariants({
    isFocused,
  })

  return (
    <View className={styles.container({ className: containerClassName })}>
      <Text className={styles.label()}>{label}</Text>
      <Pressable className={styles.wrapper()}>
        {
          leftIcon && (
            <Ionicons
              color={getIconColor()}
              className="mr-3"
              size={22}
              name={leftIcon}
            />
          )
        }

        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={handleTextChange}
          value={value}
          className={styles.input()}
          {...textInputProps}
        />

        <TouchableOpacity>
          <Ionicons size={22} name="eye-off-outline" />
        </TouchableOpacity>
      </Pressable>
    </View>
  )

}