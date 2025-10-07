import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";

interface ApiError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
}

export function useBankrolls(userId: number) {
  return useQuery({
    queryKey: ["bankrolls", userId],
    queryFn: () => bankrollApi.getAll(userId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 20, // 20 minutos
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: ApiError) => {
      if (error.status === 404 || error.statusCode === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useCreateBankroll(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BankrollDto, "id" | "userId">) =>
      bankrollApi.create(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankrolls", userId] });
    },
  });
}

export function useUpdateBankroll(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<BankrollDto, "id" | "userId">;
    }) => bankrollApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankrolls", userId] });
    },
  });
}

export function useDeleteBankroll(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bankrollApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankrolls", userId] });
    },
  });
}
