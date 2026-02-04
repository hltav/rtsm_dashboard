import {
  CreateBankrollRecordDTO,
  GetBankrollRecordDTO,
} from "@/modules/bankroll/schema/records/bankrollRecords.schema";
import apiClient from "../../apiBaseUrl";

export const bankrollRecordApi = {
  // Criar record
  create: async (
    bankrollId: number,
    data: Omit<CreateBankrollRecordDTO, "bankrollId">
  ) => {
    const payload = { ...data, bankrollId };
    const { data: resp } = await apiClient.post<GetBankrollRecordDTO>(
      `/bankrolls/${bankrollId}/records`,
      payload
    );
    return resp;
  },

  // Listar todos (opcional ?type=XYZ)
  getAll: async (bankrollId: number, type?: string) => {
    const { data } = await apiClient.get<GetBankrollRecordDTO[]>(
      `/bankrolls/${bankrollId}/records`,
      { params: type ? { type } : undefined }
    );
    return data;
  },

  // Top N records: GET /bankrolls/:bankrollId/records/top?type=...&limit=...
  getTop: async (bankrollId: number, type: string, limit = 10) => {
    const { data } = await apiClient.get<GetBankrollRecordDTO[]>(
      `/bankrolls/${bankrollId}/records/top`,
      { params: { type, limit } }
    );
    return data;
  },

  // Buscar por id
  getById: async (bankrollId: number, recordId: number) => {
    const { data } = await apiClient.get<GetBankrollRecordDTO>(
      `/bankrolls/${bankrollId}/records/${recordId}`
    );
    return data;
  },

  // Atualizar (PUT) — body: { value: string; metadata: any }
  update: async (
    bankrollId: number,
    recordId: number,
    body: { value: string; metadata?: unknown }
  ) => {
    const { data } = await apiClient.put<GetBankrollRecordDTO>(
      `/bankrolls/${bankrollId}/records/${recordId}`,
      body
    );
    return data;
  },

  // Deletar específico
  delete: async (bankrollId: number, recordId: number) => {
    await apiClient.delete(`/bankrolls/${bankrollId}/records/${recordId}`);
    return { message: "deleted" };
  },

  // Deletar por tipo (DELETE /bankrolls/:bankrollId/records?type=XYZ)
  deleteByType: async (bankrollId: number, type: string) => {
    const { data } = await apiClient.delete<{ message: string; count: number }>(
      `/bankrolls/${bankrollId}/records`,
      { params: { type } }
    );
    return data;
  },
};
