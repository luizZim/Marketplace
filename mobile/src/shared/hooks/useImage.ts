import { ImagePickerOptions } from "expo-image-picker"
import { useAppModal } from "./useAppModal"
import { useCamera } from "./useCamera"
import { useGallery } from "./useGallery"
import { useModalStore } from "../store/modal-store";


interface useImageParams extends ImagePickerOptions {
  callback: (uri: string | null) => void;
}

export const useImage = ({ callback, ...pickerOptions }: useImageParams) => {
  const { openCamera, isLoading: cameraLoading } = useCamera({})
  const { openGallery, isLoading: galleryLoading } = useGallery({})

  const modals = useAppModal()

  const loading = cameraLoading || galleryLoading;

  const { close } = useModalStore()

  const handleCallback = (uri: string | null) => {
    close()
    callback(uri)
  }

  const handleSelectImage = () => {
    modals.showSelection({
      title: "Selecionar Foto",
      message: "Escolha uma opção:",
      options: [
        {
          text: "Galeria",
          icon: "images",
          variant: "primary",
          onPress: async () => {
            const imageUri = await openGallery();
            handleCallback(imageUri)
          }
        },
        {
          text: "Câmera",
          icon: "camera",
          variant: "primary",
          onPress: async () => {
            const imageUri = await openCamera();
            handleCallback(imageUri)
          }
        }
      ]
    })
  }


  return { handleSelectImage, loading };
}