import {
  CreateBankrollGoalDto,
  GetBankrollGoalDto,
  UpdateBankrollGoalDto,
} from "@/modules/bankroll/schema/goals/bankrollGoal.schemas";
import apiClient from "../../apiBaseUrl";

export const bankrollGoalApi = {
  // Criar meta
  create: async (bankrollId: number, data: CreateBankrollGoalDto) => {
    const { data: result } = await apiClient.post<GetBankrollGoalDto>(
      `/bankrolls/${bankrollId}/goals`,
      data
    );
    return result;
  },

  // Listar metas
  getAll: async (bankrollId: number) => {
    const { data } = await apiClient.get<GetBankrollGoalDto[]>(
      `/bankrolls/${bankrollId}/goals`
    );
    return data;
  },

  // Listar metas ativas
  getActive: async (bankrollId: number) => {
    const { data } = await apiClient.get<GetBankrollGoalDto[]>(
      `/bankrolls/${bankrollId}/goals/active`
    );
    return data;
  },

  // Buscar meta por ID
  getById: async (goalId: number, bankrollId: number) => {
    const { data } = await apiClient.get<GetBankrollGoalDto>(
      `/bankrolls/${bankrollId}/goals/${goalId}`
    );
    return data;
  },

  // Atualizar meta
  update: async (
    bankrollId: number,
    goalId: number,
    data: UpdateBankrollGoalDto
  ) => {
    const { data: result } = await apiClient.put<GetBankrollGoalDto>(
      `/bankrolls/${bankrollId}/goals/${goalId}`,
      data
    );
    return result;
  },

  // Marcar meta como alcançada
  achieve: async (bankrollId: number, goalId: number) => {
    const { data } = await apiClient.put<GetBankrollGoalDto>(
      `/bankrolls/${bankrollId}/goals/${goalId}/achieve`
    );
    return data;
  },

  // Atualizar progresso
  updateProgress: async (
    bankrollId: number,
    goalId: number,
    currentValue: string
  ) => {
    const { data } = await apiClient.put<GetBankrollGoalDto>(
      `/bankrolls/${bankrollId}/goals/${goalId}/progress`,
      { currentValue }
    );
    return data;
  },

  // Soft delete
  delete: async (bankrollId: number, goalId: number) => {
    await apiClient.delete(`/bankrolls/${bankrollId}/goals/${goalId}`);
  },

  // Hard delete
  hardDelete: async (bankrollId: number, goalId: number) => {
    await apiClient.delete(`/bankrolls/${bankrollId}/goals/${goalId}/hard`);
  },
};
