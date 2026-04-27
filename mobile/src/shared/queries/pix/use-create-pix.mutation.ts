import { useMutation } from "@tanstack/react-query"
import { createPixQrCode } from "../../services/abacate-pay.service"
import { Toast } from "toastify-react-native"

export const useCreatePixMutation = () => {
  const mutation = useMutation({
    mutationFn: createPixQrCode,
    onError: (error) => {
      console.log(error)
      Toast.error(error.message ?? "Falha ao gerar PIX", "top")
    }
  })

  return mutation
}
