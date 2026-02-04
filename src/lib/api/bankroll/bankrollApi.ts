import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import apiClient from "../apiBaseUrl";
import { GetBankrollHistoryDTO } from "@/modules/bankroll/schema/bankrollHistory.schema";
import axios from "axios";

export const bankrollApi = {
  // Busca todas as bancas do usuário logado.
  //O ID do usuário é extraído do Token pelo Backend.
  getAll: async (): Promise<BankrollDto[]> => {
    try {
      // Usamos a rota raiz GET /bankrolls que o seu Controller já possui
      const { data } = await apiClient.get<BankrollDto[]>("/bankrolls");
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return []; // Silencia o erro 404 e retorna lista vazia
      }
      throw error;
    }
  },
  //Cria uma nova banca para o usuário logado.
  create: async (
    bankrollData: Omit<BankrollDto, "id" | "userId">,
  ): Promise<BankrollDto> => {
    // Não enviamos mais o userId no corpo, o NestJS resolve via req.user
    const { data } = await apiClient.post<BankrollDto>(
      "/bankrolls",
      bankrollData,
    );
    return data;
  },

  getById: async (id: number): Promise<BankrollDto> => {
    const { data } = await apiClient.get<BankrollDto>(`/bankrolls/${id}/bank`);
    return data;
  },

  update: async (
    id: number,
    bankrollData: Omit<BankrollDto, "id" | "userId">,
  ): Promise<BankrollDto> => {
    const { data } = await apiClient.put<BankrollDto>(
      `/bankrolls/${id}`,
      bankrollData,
    );
    return data;
  },

  patch: async (
    id: number,
    bankrollData: Partial<Omit<BankrollDto, "id" | "userId">>,
  ): Promise<BankrollDto> => {
    const { data } = await apiClient.patch<BankrollDto>(
      `/bankrolls/${id}`,
      bankrollData,
    );
    return data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const { data } = await apiClient.delete<{ message: string }>(
      `/bankrolls/${id}`,
    );
    return data;
  },

  //Histórico da Banca
  getHistoryByBankrollId: async (
    id: number,
  ): Promise<GetBankrollHistoryDTO[]> => {
    try {
      const { data } = await apiClient.get<GetBankrollHistoryDTO[]>(
        `/bankrolls/${id}/history`,
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },

  
  //Busca o último registro do histórico da banca  
  getLastHistoryByBankrollId: async (
    id: number,
  ): Promise<GetBankrollHistoryDTO | null> => {
    try {
      const { data } = await apiClient.get<GetBankrollHistoryDTO | null>(
        `/bankrolls/${id}/history/last`,
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null; // Silencia 404 para histórico não encontrado
      }
      throw error;
    }
  },
};
