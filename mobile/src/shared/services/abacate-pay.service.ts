import { abacatePayApiClient } from "../api/abacate-pay";
import { CreatePixQrCodeRequest, CreatePixQrCodeResponse } from "../interfaces/http/abacate-pay";

export const createPixQrCode = async (params: CreatePixQrCodeRequest) => {
  const { data } = await abacatePayApiClient.post<CreatePixQrCodeResponse>("/pixQrCode/create", params);

  return data;
};
