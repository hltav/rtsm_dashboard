import {
  CreateMonthlySnapshotDTO,
  GetMonthlySnapshotDTO,
} from "@/modules/bankroll/schema/snapshots/monthlySnapshot.schema";
import apiClient from "../../apiBaseUrl";

export const monthlySnapshotApi = {
  // CREATE
  async createSnapshot(bankrollId: number, data: CreateMonthlySnapshotDTO) {
    return apiClient.post<GetMonthlySnapshotDTO>(
      `/bankroll/${bankrollId}/monthly`,
      data
    );
  },

  // GET LIST (ALL OR BY YEAR)
  async getSnapshots(bankrollId: number, params?: { year?: number }) {
    return apiClient.get<GetMonthlySnapshotDTO[]>(
      `/bankroll/${bankrollId}/monthly`,
      {
        params,
      }
    );
  },

  // GET LATEST
  async getLatestSnapshot(bankrollId: number) {
    return apiClient.get<GetMonthlySnapshotDTO>(
      `/bankroll/${bankrollId}/monthly/latest`
    );
  },

  // GET BY YEAR & MONTH
  async getSnapshotByMonth(bankrollId: number, year: number, month: number) {
    return apiClient.get<GetMonthlySnapshotDTO>(
      `/bankroll/${bankrollId}/monthly/${year}/${month}`
    );
  },
  
  // GET BY ID
  async getSnapshotById(snapshotId: number) {
    return apiClient.get<GetMonthlySnapshotDTO>(
      `/bankroll/monthly/id/${snapshotId}`
    );
  },

  // UPDATE
  async updateSnapshot(
    snapshotId: number,
    data: Partial<CreateMonthlySnapshotDTO>
  ) {
    return apiClient.put<GetMonthlySnapshotDTO>(
      `/bankroll/monthly/${snapshotId}`,
      data
    );
  },

  // DELETE ONE
  async deleteSnapshot(snapshotId: number) {
    return apiClient.delete(`/bankroll/monthly/${snapshotId}`);
  },

  // DELETE BY YEAR
  async deleteSnapshotsByYear(bankrollId: number, year: number) {
    return apiClient.delete<{ count: number; message: string }>(
      `/bankroll/${bankrollId}/monthly/year/${year}`
    );
  },
};
