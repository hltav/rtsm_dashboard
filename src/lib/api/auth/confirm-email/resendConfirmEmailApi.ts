import axios from "axios";
import apiClient from "../../apiBaseUrl";

interface ResendConfirmationResponse {
  message: string;
}

export const resendEmailConfirmation = async (email: string) => {
  try {
    const res = await apiClient.post<ResendConfirmationResponse>(
      "/auth/resend-confirmation",
      { email },
      { withCredentials: true }
    );
    return res.data;
  } catch (error: unknown) {
    let message = "Erro ao enviar link de confirmação";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
