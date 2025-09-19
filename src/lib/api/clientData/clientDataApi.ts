import { ClientData } from "@/modules/client-data/client-data.schema";
import axios from "axios";
import apiClient from "../apiBaseUrl";

export const clientDataService = {
  create: async (data: ClientData) => {
    try {
      const res = await apiClient.post("/client-data", data, {
        withCredentials: true,
      });
      return { success: true, data: res.data };
    } catch (error: unknown) {
      let message = "Erro ao criar clientData";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          message;
        console.error(message);
      }

      throw new Error(message);
    }
  },

  get: async (userId: number, clientDataId: number) => {
    try {
      const res = await apiClient.get(
        `/users/${userId}/client-data/${clientDataId}`,
        {
          withCredentials: true,
        }
      );
      return { success: true, data: res.data };
    } catch (error: unknown) {
      let message = "Erro ao buscar clientData";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          message;
        console.error(message);
      }

      throw new Error(message);
    }
  },

  update: async (id: number, data: ClientData) => {
    try {
      const res = await apiClient.put(`/client-data/${id}`, data, {
        withCredentials: true,
      });
      return { success: true, data: res.data };
    } catch (error: unknown) {
      let message = "Erro ao atualizar clientData";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          message;
        console.error(message);
      }

      throw new Error(message);
    }
  },

  delete: async (id: number) => {
    try {
      const res = await apiClient.delete(`/client-data/${id}`, {
        withCredentials: true,
      });
      return { success: true, data: res.data };
    } catch (error: unknown) {
      let message = "Erro ao deletar clientData";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          message;
        console.error(message);
      }

      throw new Error(message);
    }
  },
};
