import { LoginData } from "@/modules/auth/login/interface/loginData.schema";
import apiClient from "../../apiBaseUrl";
import axios from "axios";
import { GetUser } from "@/modules/user/schemas/user.schema";

export const loginService = async (data: LoginData) => {
  try {
    const res = await apiClient.post("/auth/login", data, {
      withCredentials: true,
    });

    return { success: true, data: res.data };
  } catch (error: unknown) {
    let message = "Falha no login";

    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message || error.response?.data?.error || message;
      console.log(message);
    }

    throw new Error(message);
  }
};

export const checkAuthStatusService = async (): Promise<GetUser> => {
  try {
    const res = await apiClient.get("/auth/me", {
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    let message = "Erro ao verificar status de autenticação";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message || error.response?.data?.error || message;
    }
    throw new Error(message);
  }
};

export const logoutService = async () => {
  try {
    const res = await apiClient.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    return { success: true, data: res.data };
  } catch (error: unknown) {
    let message = "Erro ao fazer logout";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message || error.response?.data?.error || message;
    }
    throw new Error(message);
  }
};

export const refreshTokenService = async () => {
  try {
    const res = await apiClient.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    return { success: true, data: res.data };
  } catch (error: unknown) {
    let message = "Erro ao atualizar token";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message || error.response?.data?.error || message;
    }
    throw new Error(message);
  }
};
