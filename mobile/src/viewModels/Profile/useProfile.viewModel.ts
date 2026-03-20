import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { ProfileFormData, profileScheme } from "./profile.scheme"
import { useUserStore } from "../../shared/store/user-store"
import { useState } from "react"

export const useProfileViewModel = () => {
  const { user } = useUserStore()
  const [avatarUri, setavatarUri] = useState<string | null>(user?.avatarUrl ?? null)

  const {
    control,
    handleSubmit,
    formState: { errors }
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

  const onSubmit = handleSubmit(async () => {

  })

  return { onSubmit, control, avatarUri }
}