import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BankrollDto } from "@/modules/bankroll/schema/bankroll.schema";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";

interface ApiError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
}

// 1. Hook de Listagem: Agora não depende de userId
export function useBankrolls() {
  return useQuery({
    queryKey: ["bankrolls"], // Chave simplificada
    queryFn: () => bankrollApi.getAll(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: ApiError) => {
      // 404 agora retorna [] no seu bankrollApi, mas mantemos o check por segurança
      if (error.status === 404 || error.statusCode === 404) return false;
      return failureCount < 2;
    },
  });
}

// 2. Hook de Criação
export function useCreateBankroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BankrollDto, "id" | "userId">) =>
      bankrollApi.create(data),
    onSuccess: () => {
      // Invalida todas as queries de bankrolls de forma simples
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });
    },
  });
}

// 3. Hook de Edição
export function useUpdateBankroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number; // Alterado para number para bater com seu service
      data: Omit<BankrollDto, "id" | "userId">;
    }) => bankrollApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });
    },
  });
}

// 4. Hook de Deleção
export function useDeleteBankroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => bankrollApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankrolls"] });
    },
  });
}
