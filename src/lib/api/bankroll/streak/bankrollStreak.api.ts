import {
  CreateBankrollStreakDTO,
  GetBankrollStreakDTO,
} from "@/modules/bankroll/schema/streak/bankrollStreak.schema";
import apiClient from "../../apiBaseUrl";

export const bankrollStreaksApi = {
  // CREATE
  create: async (
    bankrollId: number,
    data: CreateBankrollStreakDTO
  ): Promise<GetBankrollStreakDTO> => {
    const res = await apiClient.post(
      `/bankroll/${bankrollId}/bankroll_streaks`,
      data
    );
    return res.data;
  },

  // GET BY ID
  getById: async (
    bankrollId: number,
    id: number
  ): Promise<GetBankrollStreakDTO> => {
    const res = await apiClient.get(
      `/bankroll/${bankrollId}/bankroll_streaks/${id}`
    );
    return res.data;
  },

  // LIST ALL FOR A BANKROLL
  getAll: async (bankrollId: number): Promise<GetBankrollStreakDTO[]> => {
    const res = await apiClient.get(`/bankroll/${bankrollId}/bankroll_streaks`);
    return res.data;
  },

  // DELETE
  delete: async (bankrollId: number, id: number): Promise<void> => {
    await apiClient.delete(`/bankroll/${bankrollId}/bankroll_streaks/${id}`);
  },
};
