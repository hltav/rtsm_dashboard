import {
  CreateBankrollOperationDTO,
  GetBankrollOperationDTO,
} from "@/modules/bankroll/schema/operations/bankrollOperation.schema";
import apiClient from "../../apiBaseUrl";

export const bankrollOperationsApi = {
  // 🟩 Criar uma operação (deposit, withdraw, transfer, ajuste etc.)
  create: async (
    bankrollId: number,
    operationData: Omit<CreateBankrollOperationDTO, "bankrollId">
  ) => {
    const { data } = await apiClient.post<GetBankrollOperationDTO>(
      `/bankrolls/${bankrollId}/operations`,
      {
        ...operationData,
        bankrollId,
      }
    );

    return data;
  },

  // 🟦 Buscar todas operações do bankroll
  getAll: async (bankrollId: number) => {
    const { data } = await apiClient.get<GetBankrollOperationDTO[]>(
      `/bankrolls/${bankrollId}/operations`
    );
    return data;
  },

  // 🟧 Buscar operações filtradas por tipo
  getByType: async (
    bankrollId: number,
    type: "DEPOSIT" | "WITHDRAW" | "ADJUSTMENT" | "TRANSFER" | "OTHER"
  ) => {
    const { data } = await apiClient.get<GetBankrollOperationDTO[]>(
      `/bankrolls/${bankrollId}/operations`,
      {
        params: { type },
      }
    );
    return data;
  },

  // 🟨 Buscar uma operação específica
  getById: async (bankrollId: number, operationId: number) => {
    const { data } = await apiClient.get<GetBankrollOperationDTO>(
      `/bankrolls/${bankrollId}/operations/${operationId}`
    );
    return data;
  },

  // 🟥 Deletar uma operação
  delete: async (bankrollId: number, operationId: number) => {
    await apiClient.delete(
      `/bankrolls/${bankrollId}/operations/${operationId}`
    );
    return { message: "Operation deleted" };
  },
};
