import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { ProfileFormData, profileScheme } from "./profile.scheme"
import { useUserStore } from "../../shared/store/user-store"
import { useState } from "react"
import { useUpdateProfileMutation } from "../../shared/queries/profile/use-update-profile.mutation"
import { useAppModal } from "../../shared/hooks/useAppModal"
import { useModalStore } from "../../shared/store/modal-store"
import { useCartStore } from "../../shared/store/cart-store"
import { useImage } from "../../shared/hooks/useImage"
import { CameraType } from "expo-image-picker"
import { useUploadAvatarMutation } from "../../shared/queries/auth/use-upload-avatar.mutation"

export const useProfileViewModel = () => {
  const { user, logout } = useUserStore()
  const [avatarUri, setavatarUri] = useState<string | null>(user?.avatarUrl ?? null)

  const updateProfileMutation = useUpdateProfileMutation()
  const { showSelection } = useAppModal()
  const { close } = useModalStore()
  const { clearCart } = useCartStore()

  const uploadAvatarMutation = useUploadAvatarMutation()

  const { loading, handleSelectImage } = useImage({
    callback: async (url) => {
      if (url) {
        await uploadAvatarMutation.mutateAsync(url)

      }
    },
    cameraType: CameraType.front,

  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileScheme),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: undefined,
      newPassword: undefined
    }
  })

  const validatePasswords = (userData: ProfileFormData) => {
    if (!userData.password) return true;

    if (userData.password === userData.newPassword && userData?.password?.length > 0) {
      return false
    }

    return true;
  }

  const onSubmit = handleSubmit(async (userData) => {
    if (!validatePasswords(userData)) return;

    await updateProfileMutation.mutateAsync(userData)
  });

  const handleLogout = () => showSelection({
    title: "Sair",
    message: "Tem certeza que deseja sair da sua conta?",
    options: [
      {
        text: "Continuar logado",
        onPress: close,
        variant: "primary"
      },
      {
        variant: "danger",
        onPress: () => {
          clearCart();
          logout();
          close();
        },
        text: "Sair"
      }
    ],
  });

  return { onSubmit, control, avatarUri, isSubmitting, handleLogout, handleSelectImage }
}