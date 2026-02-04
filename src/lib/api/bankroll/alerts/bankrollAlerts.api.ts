import {
  CreateBankrollAlertDTO,
  GetBankrollAlertDTO,
  UpdateBankrollAlertDTO,
} from "@/modules/bankroll/schema/alert/bankrollAlert.schema";
import apiClient from "../../apiBaseUrl";

export const bankrollAlertsApi = {
  // CREATE
  create: async (
    bankrollId: number,
    data: Omit<CreateBankrollAlertDTO, "bankrollId">
  ) => {
    const { data: resp } = await apiClient.post<GetBankrollAlertDTO>(
      `/bankrolls/${bankrollId}/alerts`,
      data
    );
    return resp;
  },

  // GET ALL
  list: async (bankrollId: number) => {
    const { data } = await apiClient.get<GetBankrollAlertDTO[]>(
      `/bankrolls/${bankrollId}/alerts`
    );
    return data;
  },

  // GET BY ID
  getById: async (bankrollId: number, alertId: number) => {
    const { data } = await apiClient.get<GetBankrollAlertDTO>(
      `/bankrolls/${bankrollId}/alerts/${alertId}`
    );
    return data;
  },

  // UPDATE
  update: async (
    bankrollId: number,
    alertId: number,
    data: UpdateBankrollAlertDTO
  ) => {
    const { data: resp } = await apiClient.patch<GetBankrollAlertDTO>(
      `/bankrolls/${bankrollId}/alerts/${alertId}`,
      data
    );
    return resp;
  },

  // DELETE
  delete: async (bankrollId: number, alertId: number) => {
    const { data } = await apiClient.delete<{ message: string }>(
      `/bankrolls/${bankrollId}/alerts/${alertId}`
    );
    return data;
  },
};
