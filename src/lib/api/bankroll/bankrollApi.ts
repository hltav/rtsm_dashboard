import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import apiClient from "../apiBaseUrl";

export const bankrollApi = {
  create: async (
    bankrollData: Omit<BankrollDto, "id" | "userId">,
    userId: number
  ) => {
    const { data } = await apiClient.post<BankrollDto>("/bankrolls", {
      ...bankrollData,
      userId,
    });
    return data;
  },

  getAll: async (userId: number) => {
    const { data } = await apiClient.get<BankrollDto[]>(
      `/bankrolls/user/${userId}`
    );
    return data;
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get<BankrollDto>(`/bankrolls/${id}`);
    return data;
  },

  update: async (
    id: string,
    bankrollData: Omit<BankrollDto, "id" | "userId">
  ) => {
    const { data } = await apiClient.put<BankrollDto>(
      `/bankrolls/${id}`,
      bankrollData
    );
    return data;
  },

  patch: async (
    id: string,
    bankrollData: Partial<Omit<BankrollDto, "id" | "userId">>
  ) => {
    const { data } = await apiClient.patch<BankrollDto>(
      `/bankrolls/${id}`,
      bankrollData
    );
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete<{ message: string }>(
      `/bankrolls/${id}`
    );
    return data;
  },
};
