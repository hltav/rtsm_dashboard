import axios from "axios";
import apiClient from "../../apiBaseUrl";

interface ForgotPasswordResponse {
  message: string;
}

export const forgotPasswordApi = async (email: string) => {
  if (!email) {
    throw new Error("E-mail não fornecido");
  }

  try {
    const res = await apiClient.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      { email }
    );
    return res.data;
  } catch (error: unknown) {
    let message = "Erro ao solicitar redefinição de senha";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
