import { useQuery } from "@tanstack/react-query";
import { GetHourlySnapshotDTO } from "@/modules/bankroll/schema/snapshots/hourlySnapshot.schema";
import { hourlySnapshotApi } from "@/lib/api/bankroll/snapshots/bankrollHourlySnapshot.api";

export type HourlyRangeParams = {
  startDate?: string;
  endDate?: string;
};

export function useHourlySnapshots(
  bankrollId: number,
  params?: HourlyRangeParams,
  enabled = true,
) {
  return useQuery<GetHourlySnapshotDTO[]>({
    queryKey: ["bankroll", bankrollId, "snapshots", "hourly", params ?? {}],
    queryFn: async () => {
      const res = await hourlySnapshotApi.getSnapshots(bankrollId, params);
      return res.data;
    },
    enabled: enabled && !!bankrollId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
