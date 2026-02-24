// import { LoginData } from "@/modules/auth/login/interface/loginData.schema";
// import apiClient from "../../apiBaseUrl";
// import axios from "axios";
// import { GetUser } from "@/modules/user/schemas/user.schema";

// // Helper para extrair mensagem de erro do Axios
// const getErrorMessage = (error: unknown, defaultMsg: string) => {
//   if (axios.isAxiosError(error)) {
//     return (
//       error.response?.data?.message || error.response?.data?.error || defaultMsg
//     );
//   }
//   return defaultMsg;
// };

// export const loginService = async (data: LoginData) => {
//   try {
//     const res = await apiClient.post("/auth/login", data);
//     return { success: true, data: res.data };
//   } catch (error) {
//     throw new Error(getErrorMessage(error, "Falha no login"));
//   }
// };

// export const checkAuthStatusService = async (): Promise<GetUser> => {
//   try {
//     const res = await apiClient.get("/auth/me");
//     return res.data;
//   } catch (error) {
//     throw new Error(getErrorMessage(error, "Não autenticado"));
//   }
// };

// export const logoutService = async () => {
//   try {
//     const res = await apiClient.post("/auth/logout");
//     return res.data;
//   } catch (error) {
//     throw new Error(getErrorMessage(error, "Erro ao fazer logout"));
//   }
// };

// export const refreshTokenService = async () => {
//   try {
//     const res = await apiClient.post("/auth/refresh");
//     return res.data;
//   } catch (error) {
//     throw new Error(getErrorMessage(error, "Erro ao atualizar token"));
//   }
// };
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
