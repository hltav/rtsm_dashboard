import {
  BankrollFilterDTO,
  EventFilterDTO,
  HistoryFilterDTO,
} from "@/modules/bankroll/schema/queryFilters/bankrollFilters.schema";
import apiClient from "../../apiBaseUrl";

export const bankrollFilterApi = {
  async filterBankrolls(
    bankrollId: number,
    filters: BankrollFilterDTO,
    pagination?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  ) {
    const params = {
      ...filters,
      ...pagination,
    };

    const { data } = await apiClient.get(
      `/bankroll/${bankrollId}/filters/bankrolls`,
      { params }
    );
    return data;
  },

  async filterEvents(
    bankrollId: number,
    filters: EventFilterDTO,
    pagination?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  ) {
    const params = {
      ...filters,
      ...pagination,
    };

    const { data } = await apiClient.get(
      `/bankroll/${bankrollId}/filters/events`,
      {
        params,
      }
    );
    return data;
  },

  async filterHistory(
    bankrollId: number,
    filters: HistoryFilterDTO,
    pagination?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  ) {
    const params = {
      ...filters,
      ...pagination,
    };

    const { data } = await apiClient.get(
      `/bankroll/${bankrollId}/filters/history`,
      { params }
    );
    return data;
  },
};
