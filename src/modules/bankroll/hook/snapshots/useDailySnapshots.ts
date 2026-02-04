import { dailySnapshotApi } from "@/lib/api/bankroll/snapshots/bankrollDailySnapshot.api";
import { useQuery } from "@tanstack/react-query";
import { GetDailySnapshotDTO } from "../../schema/snapshots/dailySnapshot.schema";

export type DailyRangeParams = {
  startDate?: string;
  endDate?: string;
  year?: number;
  month?: number;
};

export function useDailySnapshots(
  bankrollId: number,
  params?: DailyRangeParams,
  enabled = true,
) {
  return useQuery<GetDailySnapshotDTO[]>({
    queryKey: ["bankroll", bankrollId, "snapshots", "daily", params ?? {}],
    queryFn: async () => {
      const res = await dailySnapshotApi.getSnapshots(bankrollId, params);
      return res.data;
    },
    enabled: enabled && !!bankrollId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
