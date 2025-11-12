import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterFormData, registerScheme } from "./register.scheme"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: 'luiz',
      email: 'teste@gmail.com',
      password: '123123',
      confirmPassword: '123123',
      phone: '45999823445'
    }
  })

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData
    await userRegisterMutation.mutateAsync(registerData)
  })

  return { control, errors, onSubmit }
}