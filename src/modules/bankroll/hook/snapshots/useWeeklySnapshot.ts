import { weeklySnapshotApi } from "@/lib/api/bankroll/snapshots/bankrollWeeklySnapshot.api";
import { useQuery } from "@tanstack/react-query";
import { GetWeeklySnapshotDTO } from "../../schema/snapshots/weeklySnapshot.schema";

export type WeeklyParams = {
  year?: number;
};

export function useWeeklySnapshots(
  bankrollId: number,
  params?: WeeklyParams,
  enabled = true,
  ) {
  return useQuery<GetWeeklySnapshotDTO[]>({
    queryKey: ["bankroll", bankrollId, "snapshots", "weekly"],
    queryFn: async () => {
      const res = await weeklySnapshotApi.getSnapshots(bankrollId, params);
      return res.data;
    },
    enabled: enabled && !!bankrollId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
