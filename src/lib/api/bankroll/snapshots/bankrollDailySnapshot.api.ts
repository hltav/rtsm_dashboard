import {
  CreateDailySnapshotDTO,
  GetDailySnapshotDTO,
} from "@/modules/bankroll/schema/snapshots/dailySnapshot.schema";
import apiClient from "../../apiBaseUrl";

export const dailySnapshotApi = {

  // CREATE
  async createSnapshot(bankrollId: number, data: CreateDailySnapshotDTO) {
    return apiClient.post<GetDailySnapshotDTO>(
      `/bankrolls/${bankrollId}/snapshots/daily`,
      data
    );
  },


  // GET LIST (YEAR, MONTH, RANGE, ALL)
  async getSnapshots(
    bankrollId: number,
    params?: {
      year?: number;
      month?: number;
      startDate?: string;
      endDate?: string;
    }
  ) {
    return apiClient.get<GetDailySnapshotDTO[]>(
      `/bankrolls/${bankrollId}/snapshots/daily`,
      {
        params,
      }
    );
  },

  // GET LATEST
  async getLatestSnapshot(bankrollId: number) {
    return apiClient.get<GetDailySnapshotDTO>(
      `/bankrolls/${bankrollId}/snapshots/daily/latest`
    );
  },

  // GET BY SPECIFIC DATE
  async getSnapshotByDate(
    bankrollId: number,
    year: number,
    month: number,
    day: number
  ) {
    return apiClient.get<GetDailySnapshotDTO>(
      `/bankrolls/${bankrollId}/snapshots/daily/${year}/${month}/${day}`
    );
  },

  // GET BY ID
  async getSnapshotById(snapshotId: number) {
    return apiClient.get<GetDailySnapshotDTO>(
      `/bankrolls/snapshots/daily/id/${snapshotId}`
    );
  },

  // UPDATE
  async updateSnapshot(
    snapshotId: number,
    data: Partial<CreateDailySnapshotDTO>
  ) {
    return apiClient.put<GetDailySnapshotDTO>(
      `/bankrolls/snapshots/daily/${snapshotId}`,
      data
    );
  },

  // DELETE ONE
  async deleteSnapshot(snapshotId: number) {
    return apiClient.delete(`/bankrolls/snapshots/daily/${snapshotId}`);
  },

  // DELETE BY MONTH
  async deleteSnapshotsByMonth(
    bankrollId: number,
    year: number,
    month: number
  ) {
    return apiClient.delete<{ count: number; message: string }>(
      `/bankrolls/${bankrollId}/snapshots/daily/month/${year}/${month}`
    );
  },

  // DELETE BY YEAR
  async deleteSnapshotsByYear(bankrollId: number, year: number) {
    return apiClient.delete<{ count: number; message: string }>(
      `/bankrolls/${bankrollId}/daily/year/${year}`
    );
  },
};
