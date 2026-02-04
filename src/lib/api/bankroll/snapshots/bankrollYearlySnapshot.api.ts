import {
  CreateYearlySnapshotDTO,
  GetYearlySnapshotDTO,
} from "@/modules/bankroll/schema/snapshots/yearlySnapshot.schema";
import apiClient from "../../apiBaseUrl";

export const yearlySnapshotApi = {
  // CREATE
  async createSnapshot(bankrollId: number, data: CreateYearlySnapshotDTO) {
    return apiClient.post<GetYearlySnapshotDTO>(
      `/bankroll/${bankrollId}/yearly`,
      data
    );
  },

  // LIST (ALL OR RANGE)
  async getSnapshots(
    bankrollId: number,
    params?: { startYear?: number; endYear?: number }
  ) {
    return apiClient.get<GetYearlySnapshotDTO[]>(
      `/bankroll/${bankrollId}/yearly`,
      { params }
    );
  },

  // GET LATEST
  async getLatestSnapshot(bankrollId: number) {
    return apiClient.get<GetYearlySnapshotDTO>(
      `/bankroll/${bankrollId}/yearly/latest`
    );
  },

  // GET BY YEAR
  async getSnapshotByYear(bankrollId: number, year: number) {
    return apiClient.get<GetYearlySnapshotDTO>(
      `/bankroll/${bankrollId}/yearly/${year}`
    );
  },

  // GET BY ID
  async getSnapshotById(snapshotId: number) {
    return apiClient.get<GetYearlySnapshotDTO>(
      `/bankroll/yearly/id/${snapshotId}`
    );
  },

  // UPDATE
  async updateSnapshot(
    snapshotId: number,
    data: Partial<CreateYearlySnapshotDTO>
  ) {
    return apiClient.put<GetYearlySnapshotDTO>(
      `/bankroll/yearly/${snapshotId}`,
      data
    );
  },

  // DELETE ONE
  async deleteSnapshot(snapshotId: number) {
    return apiClient.delete(`/bankroll/yearly/${snapshotId}`);
  },

  // DELETE BY RANGE (startYear, endYear)
  async deleteSnapshotsByRange(
    bankrollId: number,
    startYear: number,
    endYear: number
  ) {
    return apiClient.delete<{ count: number; message: string }>(
      `/bankroll/${bankrollId}/yearly/range`,
      { params: { startYear, endYear } }
    );
  },
};
