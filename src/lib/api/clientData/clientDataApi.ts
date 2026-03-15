import { ClientData } from "@/modules/client-data/client-data.schema";
import axios from "axios";
import apiClient from "../apiBaseUrl";

export const clientDataService = {
  // 🔹 UPSERT (cria ou atualiza)
  create: async (data: ClientData) => {
    try {
      const res = await apiClient.post("/client-data", data, {
        withCredentials: true,
      });

      return { success: true, data: res.data };
    } catch (error: unknown) {
      throw handleAxiosError(error, "Erro ao salvar dados do perfil");
    }
  },

  // 🔹 Buscar dados do usuário logado
  get: async () => {
    try {
      const res = await apiClient.get("/client-data/me", {
        withCredentials: true,
      });

      return { success: true, data: res.data };
    } catch (error: unknown) {
      throw handleAxiosError(error, "Erro ao buscar dados do perfil");
    }
  },

  // 🔹 Update separado (opcional se quiser manter PUT)
  update: async (data: ClientData) => {
    try {
      const res = await apiClient.put("/client-data", data, {
        withCredentials: true,
      });

      return { success: true, data: res.data };
    } catch (error: unknown) {
      throw handleAxiosError(error, "Erro ao atualizar perfil");
    }
  },
};

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  let message = defaultMessage;

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      defaultMessage;
  }

  return new Error(message);
};
