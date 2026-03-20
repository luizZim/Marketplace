import { useQuery } from "@tanstack/react-query"
import { getCreditCards } from "../../services/credit-card.service"

export const useGetCreditCardsQuery = () => {
  const query = useQuery({
    queryKey: ["credit-cards"],
    queryFn: () => getCreditCards(),
    staleTime: 1000 * 60 * 5
  });

  return query
};