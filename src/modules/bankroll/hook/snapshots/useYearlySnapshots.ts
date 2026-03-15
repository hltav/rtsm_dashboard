import { yearlySnapshotApi } from "@/lib/api/bankroll/snapshots/bankrollYearlySnapshot.api";
import { useQuery } from "@tanstack/react-query";
import { GetYearlySnapshotDTO } from "../../schema/snapshots/yearlySnapshot.schema";

export type YearlyParams = {
  startYear?: number;
  endYear?: number;
};

export function useYearlySnapshots(
  bankrollId: number,
  params?: YearlyParams,
  enabled = true,
) {
  return useQuery<GetYearlySnapshotDTO[]>({
    queryKey: ["bankroll", bankrollId, "snapshots", "yearly", params ?? {}],
    queryFn: async () => {
      const res = await yearlySnapshotApi.getSnapshots(bankrollId, params);
      return res.data;
    },
    enabled: enabled && !!bankrollId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
