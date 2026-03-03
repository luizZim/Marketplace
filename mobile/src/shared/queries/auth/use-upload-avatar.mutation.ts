import { useMutation } from "@tanstack/react-query"
import { uploadAvatar } from "../../services/auth.service"
import { Toast } from "toastify-react-native"


export const useUploadAvatarMutation = () => {

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (error) => {
      console.error(error)
      Toast.error("Erro ao fazer o upload da foto de perfil.")
    }
  })
  return mutation
}