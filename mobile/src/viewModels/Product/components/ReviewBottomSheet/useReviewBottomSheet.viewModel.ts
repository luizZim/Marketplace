import { useEffect, useState } from "react"
import { useGetUserCommentQuery } from "../../../../shared/queries/comments/use-get-user-comment.query"
import { set } from 'react-hook-form';
import { useCreateCommentMutation } from "../../../../shared/queries/comments/use-create-comment.mutation";
import { useUpdateCommentMutation } from "../../../../shared/queries/comments/use-update-comment-mutation";
import { Toast } from "toastify-react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";

interface RatingFormInterface {
  content: string,
  rating: number,
  isEditing: boolean
  commentId?: number
}

const initialFormValue: RatingFormInterface = {
  content: "",
  isEditing: false,
  rating: 0,
  commentId: undefined
}

export const useReviewBottomSheetViewModel = (productId: number) => {
  const [ratingForm, setRatingForm] = useState(initialFormValue)

  const { data: userComment, isLoading: loadingUserComment } = useGetUserCommentQuery(productId)

  const createCommentMutation = useCreateCommentMutation(productId)

  const updateCommentMutation = useUpdateCommentMutation(productId)

  const { close: closeBottomSheet } = useBottomSheet()

  const handleRatingChange = (rating: number) => {
    setRatingForm((prevData) => ({ ...prevData, rating }))
  }

  const handleContentChange = (content: string) => {
    setRatingForm((prevData) => ({ ...prevData, content }))
  }

  const handleFormSubmit = async () => {
    if (ratingForm.rating === 0) {
      Toast.warn("Por favor, selecione uma nota.", "top")
      return
    }

    if (!ratingForm.content.trim()) {
      Toast.warn("Por favor, escreva um comentário.", "top")
      return
    }

    const { isEditing, ...formData } = ratingForm

    if (isEditing) {
      updateCommentMutation.mutate({
        ...formData,
        commentId: formData.commentId!,
      })
    } else {
      createCommentMutation.mutate({
        content: formData.content,
        rating: formData.rating,
        productId
      })
    }
    closeBottomSheet();
  }

  useEffect(() => {
    if (userComment && userComment.comment) {
      setRatingForm({
        content: userComment.comment.content,
        rating: userComment.rating,
        isEditing: true,
        commentId: userComment.comment.id
      })
    } else {
      setRatingForm(initialFormValue)
    }
  }, [userComment])

  const isLoading = createCommentMutation.isPending || updateCommentMutation.isPending
  return {
    handleContentChange,
    handleRatingChange,
    ratingForm,
    handleFormSubmit,
    isLoading,
    closeBottomSheet
  }
}