import { marketPlaceApiClient } from "../api/market-place"
import { GetProductRequest } from "../interfaces/http/product";
import { ProductResponse } from "../interfaces/http/product-response"


export const getProducts = async (params: GetProductRequest) => {
  const { data } = await marketPlaceApiClient.post<ProductResponse>("/products", params)

  return data;
}