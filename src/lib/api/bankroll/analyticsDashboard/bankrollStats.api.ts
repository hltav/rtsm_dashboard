import {
  BankrollStatsDTO,
  PeriodStatsDTO,
} from "@/modules/bankroll/schema/analyticsDashboard/bankrollStats.schema";
import apiClient from "../../apiBaseUrl";

export const bankrollStatsApi = {
  // Estatísticas completas
  get: async (bankrollId: number) => {
    const { data } = await apiClient.get<BankrollStatsDTO>(
      `/bankrolls/${bankrollId}/stats`
    );
    return data;
  },

  // Apenas streaks
  getStreaks: async (bankrollId: number) => {
    const { data } = await apiClient.get<{
      currentStreak: number;
      longestWinStreak: number;
      longestLoseStreak: number;
    }>(`/bankrolls/${bankrollId}/stats/streaks`);
    return data;
  },

  period: async (bankrollId: number, period: "7d" | "30d" | "90d" | "all") => {
    const { data } = await apiClient.get<PeriodStatsDTO[]>(
      `/bankrolls/${bankrollId}/stats/period/${period}`
    );
    return data;
  },
};
