import {
  CreateWeeklySnapshotDTO,
  GetWeeklySnapshotDTO,
} from "@/modules/bankroll/schema/snapshots/weeklySnapshot.schema";
import apiClient from "../../apiBaseUrl";

export const weeklySnapshotApi = {
  // CREATE
  async createSnapshot(bankrollId: number, data: CreateWeeklySnapshotDTO) {
    return apiClient.post<GetWeeklySnapshotDTO>(
      `/bankroll/${bankrollId}/weekly`,
      data
    );
  },

  // GET LIST (ALL OR BY YEAR)
  async getSnapshots(bankrollId: number, params?: { year?: number }) {
    return apiClient.get<GetWeeklySnapshotDTO[]>(
      `/bankroll/${bankrollId}/weekly`,
      {
        params,
      }
    );
  },

  // GET LATEST
  async getLatestSnapshot(bankrollId: number) {
    return apiClient.get<GetWeeklySnapshotDTO>(
      `/bankroll/${bankrollId}/weekly/latest`
    );
  },

  // GET BY YEAR & WEEK
  async getSnapshotByWeek(bankrollId: number, year: number, week: number) {
    return apiClient.get<GetWeeklySnapshotDTO>(
      `/bankroll/${bankrollId}/weekly/${year}/${week}`
    );
  },

  // GET BY ID
  async getSnapshotById(snapshotId: number) {
    return apiClient.get<GetWeeklySnapshotDTO>(
      `/bankroll/weekly/id/${snapshotId}`
    );
  },

  // UPDATE
  async updateSnapshot(
    snapshotId: number,
    data: Partial<CreateWeeklySnapshotDTO>
  ) {
    return apiClient.put<GetWeeklySnapshotDTO>(
      `/bankroll/weekly/${snapshotId}`,
      data
    );
  },

  // DELETE ONE
  async deleteSnapshot(snapshotId: number) {
    return apiClient.delete(`/bankroll/weekly/${snapshotId}`);
  },

  // DELETE BY YEAR
  async deleteSnapshotsByYear(bankrollId: number, year: number) {
    return apiClient.delete<{ count: number; message: string }>(
      `/bankroll/${bankrollId}/weekly/year/${year}`
    );
  },
};
