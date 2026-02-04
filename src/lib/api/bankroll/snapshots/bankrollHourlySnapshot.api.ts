import {
  CreateHourlySnapshotDTO,
  GetHourlySnapshotDTO,
} from "@/modules/bankroll/schema/snapshots/hourlySnapshot.schema";
import apiClient from "../../apiBaseUrl";

export const hourlySnapshotApi = {
  // CREATE
  async createSnapshot(bankrollId: number, data: CreateHourlySnapshotDTO) {
    return apiClient.post<GetHourlySnapshotDTO>(
      `/bankrolls/${bankrollId}/snapshots/hourly`,
      data,
    );
  },

  // GET LIST (RANGE, ALL)
  async getSnapshots(
    bankrollId: number,
    params?: {
      startDate?: string; // ISO
      endDate?: string; // ISO
    },
  ) {
    return apiClient.get<GetHourlySnapshotDTO[]>(
      `/bankrolls/${bankrollId}/snapshots/hourly`,
      { params },
    );
  },

  // GET LATEST
  async getLatestSnapshot(bankrollId: number) {
    return apiClient.get<GetHourlySnapshotDTO>(
      `/bankrolls/${bankrollId}/snapshots/hourly/latest`,
    );
  },

  // GET BY BUCKET START
  // GET /snapshots/
  // /hourly/bucket?bucketStart=2026-01-31T13:00:00.000Z
  async getSnapshotByBucketStart(bankrollId: number, bucketStart: string) {
    return apiClient.get<GetHourlySnapshotDTO>(
      `/bankrolls/${bankrollId}/snapshots/hourly/bucket`,
      { params: { bucketStart } },
    );
  },

  // GET BY ID
  async getSnapshotById(snapshotId: number) {
    return apiClient.get<GetHourlySnapshotDTO>(
      `/bankrolls/snapshots/hourly/id/${snapshotId}`,
    );
  },

  // UPDATE
  async updateSnapshot(
    snapshotId: number,
    data: Partial<CreateHourlySnapshotDTO>,
  ) {
    return apiClient.put<GetHourlySnapshotDTO>(
      `/bankrolls/snapshots/hourly/${snapshotId}`,
      data,
    );
  },

  // DELETE ONE
  async deleteSnapshot(snapshotId: number) {
    return apiClient.delete(`/bankrolls/snapshots/hourly/${snapshotId}`);
  },

  // DELETE BY RANGE
  async deleteSnapshotsByDateRange(
    bankrollId: number,
    startDate: string,
    endDate: string,
  ) {
    return apiClient.delete<{ count: number; message: string }>(
      `/bankrolls/${bankrollId}/snapshots/hourly/range`,
      { params: { startDate, endDate } },
    );
  },
};
