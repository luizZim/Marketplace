import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterFormData, registerScheme } from "./register.scheme"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"
import { useUserStore } from "../../shared/store/user-store"
import { useAppModal } from "../../shared/hooks/useAppModal"

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation()
  const { setSession } = useUserStore()
  const modals = useAppModal()

  const handleSelectAvatar = () => {
    modals.showSelection({
      title: "Selecionar Foto",
      message: "Escolha uma opção:",
      options: [
        {
          text: "Galeria",
          icon: "images",
          variant: "primary",
          onPress: () => alert("Funcionou")
        }
      ]
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    }
  })

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData
    const mutationResponse = await userRegisterMutation.mutateAsync(registerData)
    setSession({
      refreshToken: mutationResponse.refreshToken,
      token: mutationResponse.token,
      user: mutationResponse.user
    })
  })

  return { control, errors, onSubmit, handleSelectAvatar }
}