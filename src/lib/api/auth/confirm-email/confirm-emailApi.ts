import axios from "axios";
import apiClient from "../../apiBaseUrl";
import { ConfirmEmailResponse } from "@/modules/auth/confirm-email/interface/confirmEmail.interface";

export const confirmEmailApi = async (
  token: string
): Promise<ConfirmEmailResponse> => {
  try {
    const res = await apiClient.post<ConfirmEmailResponse>(
      "/auth/confirm-email",
      { token },
      { withCredentials: true }
    );
    return res.data;
  } catch (error: unknown) {
    let message = "Erro ao confirmar e-mail";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }
    throw new Error(message);
  }
};
