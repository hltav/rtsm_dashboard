import { monthlySnapshotApi } from "@/lib/api/bankroll/snapshots/bankrollMonthlySnapshot.api";
import { useQuery } from "@tanstack/react-query";
import { GetMonthlySnapshotDTO } from "../../schema/snapshots/monthlySnapshot.schema";

export type MonthlyParams = { year?: number };

export function useMonthlySnapshots(
  bankrollId: number,
  params?: MonthlyParams,
  enabled = true,
) {
  return useQuery<GetMonthlySnapshotDTO[]>({
    queryKey: ["bankroll", bankrollId, "snapshots", "monthly", params ?? {}],
    queryFn: async () => {
      const res = await monthlySnapshotApi.getSnapshots(bankrollId, params);
      return res.data;
    },
    enabled: enabled && !!bankrollId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
