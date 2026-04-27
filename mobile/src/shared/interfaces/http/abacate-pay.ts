export interface CreatePixQrCodeRequest {
  amount: number;
  expiresIn?: number;
  description?: string;
}

export interface PixQrCodeData {
  id: string;
  amount: number;
  status: string;
  devMode: boolean;
  brCode: string;
  brCodeBase64: string;
  platformFee: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePixQrCodeResponse {
  data: PixQrCodeData;
  error: null | string;
}
