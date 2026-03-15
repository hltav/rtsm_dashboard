import { LoginData } from "@/modules/auth/login/interface/loginData.schema";
import apiClient from "../../apiBaseUrl";
import axios from "axios";
import { GetUser } from "@/modules/user/schemas/user.schema";

// Helper para extrair mensagem de erro do Axios
export const getErrorMessage = (error: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.response?.data?.error || defaultMsg
    );
  }
  return defaultMsg;
};

export const loginService = async (data: LoginData) => {
  // Remova o try-catch - deixe o erro propagar naturalmente
  const res = await apiClient.post("/auth/login", data);
  return res.data;
};

export const checkAuthStatusService = async (): Promise<GetUser> => {
  // Remova o try-catch - deixe o erro propagar naturalmente
  const res = await apiClient.get("/auth/me");
  return res.data;
};

export const logoutService = async () => {
  // Remova o try-catch - deixe o erro propagar naturalmente
  const res = await apiClient.post("/auth/logout");
  return res.data;
};

export const refreshTokenService = async () => {
  // Remova o try-catch - deixe o erro propagar naturalmente
  const res = await apiClient.post("/auth/refresh");
  return res.data;
};
