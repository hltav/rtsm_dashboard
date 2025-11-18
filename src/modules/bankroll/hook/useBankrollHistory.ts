import { useQuery } from "@tanstack/react-query";
import { bankrollApi } from "@/lib/api/bankroll/bankrollApi";
import { GetBankrollHistoryDTO } from "../schema/bankrollHistory.schema";

export function useBankrollHistory(bankrollId: number) {
  return useQuery<GetBankrollHistoryDTO[]>({
    queryKey: ["bankroll", bankrollId],
    queryFn: () => bankrollApi.getHistoryByBankrollId(bankrollId),
    enabled: !!bankrollId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
