import { useQuery } from "@tanstack/react-query";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
import { BankrollDto } from "../schema/bankroll.schema";
import { useAuth } from "@/components/Providers/AuthContext";


export function useUserBankrolls() {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<BankrollDto>({
    queryKey: ["bankrolls", userId],
    queryFn: () => bankrollApi.getById(userId!),
    enabled: !!userId, // só busca quando o userId estiver definido
    staleTime: 1000 * 60 * 5,
  });
}
