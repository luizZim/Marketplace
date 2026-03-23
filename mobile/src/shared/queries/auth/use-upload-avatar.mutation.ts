import { useMutation } from "@tanstack/react-query"
import { uploadAvatar } from "../../services/auth.service"
import { Toast } from "toastify-react-native"
import { useUserStore } from "../../store/user-store"


export const useUploadAvatarMutation = () => {

  const { updateUser } = useUserStore()

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (response) => {
      updateUser({ avatarUrl: response.url })
    },
    onError: (error) => {
      console.error(error)
      Toast.error("Erro ao fazer o upload da foto de perfil.")
    }
  })
  return mutation
}