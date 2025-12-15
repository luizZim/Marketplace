import { useMutation } from "@tanstack/react-query"
import * as authService from "../../services/auth.service"
import { LoginHttpParams } from "../../interfaces/http/login"

export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: (userData: LoginHttpParams) => authService.login(userData),
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}