import { createElement } from "react"
import { useGetCreditCardsQuery } from "../../shared/queries/credit-cards/use-get-credit-cards.query"
import { useBottomSheetStore } from "../../shared/store/bottomSheet-store"
import { useCartStore } from "../../shared/store/cart-store"
import { AddCardBottomSheet } from "./components/AddCardBottomSheet"

export const useCartViewModel = () => {
  const { open: openBottomSheet } = useBottomSheetStore()
  const { products } = useCartStore()

  const { data: creditCards = [], isLoading: loadingCreditCards, } = useGetCreditCardsQuery()

  const openCartBottomSheet = () => {
    openBottomSheet({
      content: createElement(AddCardBottomSheet,)
    })
  }

  return { products, openCartBottomSheet, creditCards, loadingCreditCards }
}