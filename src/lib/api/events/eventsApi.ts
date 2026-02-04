import { FullBet } from "@/modules/events/schemas/EventItem";
import apiClient from "../apiBaseUrl";
import { Result } from "@/modules/events/schemas/Result.schema";
import { CreateBetPayload } from "@/modules/events/schemas/CreateBetPlay.schema";

export const createBet = async (data: CreateBetPayload) => {
  const response = await apiClient.post<FullBet>("/bets", data);
  return response.data;
};

// ==================== READ ====================
export const getBets = async () => {
  const response = await apiClient.get<FullBet[]>("/bets");
  return response.data;
};

export const getBetById = async (id: number) => {
  const response = await apiClient.get<FullBet>(`/bets/${id}`);
  return response.data;
};

export const getBetsWithFilters = async (params: {
  bankrollId?: number;
  result?: Result;
  sport?: string;
}) => {
  const response = await apiClient.get<FullBet[]>("/bets/filters", {
    params,
  });
  return response.data;
};

export const getBetsByBankroll = async (bankrollId: number) => {
  const response = await apiClient.get<FullBet[]>(
    `/bets/bankroll/${bankrollId}`
  );
  return response.data;
};

// ==================== UPDATE ====================
export type UpdateBetPayload = {
  id: number;
  result?: Result;
  actualReturn?: string | null;
  notes?: string | null;
  tags?: string[];
};

export const updateBet = async (data: UpdateBetPayload) => {
  const response = await apiClient.patch<FullBet>("/bets", data);
  return response.data;
};

// ==================== DELETE ====================
export const deleteBet = async (id: number) => {
  const response = await apiClient.delete<{
    message: string;
    deletedBet: FullBet;
  }>(`/bets/${id}`);

  return response.data;
};

export const deleteBetsBatch = async (betIds: number[]) => {
  const response = await apiClient.delete<{
    message: string;
    deletedCount: number;
    errors: Array<{ betId: number; error: string }>;
  }>("/bets/batch/multiple", {
    data: { betIds },
  });

  return response.data;
};

// ==================== VOID ====================
export const voidBet = async (id: number, reason?: string) => {
  const response = await apiClient.post<FullBet>(`/bets/${id}/void`, {
    reason,
  });

  return response.data;
};
