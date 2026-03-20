import { marketPlaceApiClient } from "../api/market-place";
import { CreateCommentRequest, CreateCommentResponse } from "../interfaces/http/create-comment";
import { PaginatedResponse } from '../interfaces/http/paginated-response';
import { GetProductRequest } from "../interfaces/http/product";
import { GetProductCommentsInterface } from "../interfaces/http/product-comments";
import { GetProductDetailInterface } from "../interfaces/http/product-detail";
import { ProductCategory, ProductInterface } from "../interfaces/product";
import { ProductComment } from "../interfaces/product-comment";
import { UpdateCommentRequest, UpdateCommentResponse, } from "../interfaces/http/update-comment";
import { create } from 'zustand';


export const getProducts = async (params: GetProductRequest) => {
  const { data } = await marketPlaceApiClient.post<PaginatedResponse<ProductInterface>>("/products", params)

  return data;
}

export const getProductsCategories = async () => {
  const { data } = await marketPlaceApiClient.get<ProductCategory[]>("/products/categories")

  return data;
}

export const getProductDetail = async (id: number) => {
  const { data } = await marketPlaceApiClient.get<GetProductDetailInterface>(`/products/${id}`)

  return data
}

export const getProductComments = async (params: GetProductCommentsInterface) => {
  const { data } = await marketPlaceApiClient.post<PaginatedResponse<ProductComment>>("/products/comments", params);

  return data;
}

export const createComment = async (params: CreateCommentRequest) => {
  const { data } = await marketPlaceApiClient.post<CreateCommentResponse>("/products/create/comments", params)

  return data;
}

export const getUserComment = async (productId: number) => {
  const { data } = await marketPlaceApiClient.get<{
    comment: {
      id: number;
      content: string;
      createdAt: Date;
      user: {
        id: number;
        name: string;
      };
    };
    rating: number;
  }>(`/products/${productId}/user-comment`)

  return data;
}

export const updateUserComment = async (params: UpdateCommentRequest) => {
  const { data } = await marketPlaceApiClient.put<UpdateCommentResponse>(`/products/comments/${params.commentId}`, {
    content: params.content,
    rating: params.rating
  })

  return data;
}