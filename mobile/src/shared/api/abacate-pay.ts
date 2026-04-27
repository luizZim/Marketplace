import axios from "axios";

const ABACATE_PAY_API_KEY = "abc_dev_fCDYytbjUrpyeAAUQRJcKdN3";

const abacatePayInstance = axios.create({
  baseURL: "https://api.abacatepay.com/v1",
});

abacatePayInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${ABACATE_PAY_API_KEY}`;
  return config;
});

export const abacatePayApiClient = abacatePayInstance;
