import { useMemo } from "react";
import { GetDailySnapshotDTO } from "../schema/snapshots/dailySnapshot.schema";
import { GetHourlySnapshotDTO } from "../schema/snapshots/hourlySnapshot.schema";
import { GetMonthlySnapshotDTO } from "../schema/snapshots/monthlySnapshot.schema";
import { GetWeeklySnapshotDTO } from "../schema/snapshots/weeklySnapshot.schema";
import { GetYearlySnapshotDTO } from "../schema/snapshots/yearlySnapshot.schema";

import { useDailySnapshots } from "./snapshots/useDailySnapshots";
import { useHourlySnapshots } from "./snapshots/useHourlySnapshots";
import { useMonthlySnapshots } from "./snapshots/useMonthlySnapshots";
import { useWeeklySnapshots } from "./snapshots/useWeeklySnapshot";
import { useYearlySnapshots } from "./snapshots/useYearlySnapshots";

export type SnapshotMode = "hourly" | "daily" | "weekly" | "monthly" | "yearly";

type SnapshotParams = {
  hourly?: { startDate?: string; endDate?: string };
  daily?: {
    startDate?: string;
    endDate?: string;
    year?: number;
    month?: number;
  };
  weekly?: { year?: number }; // ou range se você tiver
  monthly?: { year?: number };
  yearly?: { startYear?: number; endYear?: number };
};

/**
 * Mantém compatibilidade com seu select antigo:
 * - "all" = hourly (todas as atualizações)
 * - "daily" = daily (última do dia)
 */
type LegacyMode = "all" | "daily";
type Mode = SnapshotMode | LegacyMode;

type AnySnapshotDTO =
  | GetHourlySnapshotDTO
  | GetDailySnapshotDTO
  | GetWeeklySnapshotDTO
  | GetMonthlySnapshotDTO
  | GetYearlySnapshotDTO;

function normalizeMode(mode: Mode): SnapshotMode {
  if (mode === "all") return "hourly";
  if (mode === "daily") return "daily";
  return mode;
}

export function useBankrollSnapshots(
  bankrollId: number,
  mode: Mode,
  params?: SnapshotParams,
) {
  const normalizedMode = normalizeMode(mode);

  const hourlyEnabled = normalizedMode === "hourly";
  const dailyEnabled = normalizedMode === "daily";
  const weeklyEnabled = normalizedMode === "weekly";
  const monthlyEnabled = normalizedMode === "monthly";
  const yearlyEnabled = normalizedMode === "yearly";

  const hourly = useHourlySnapshots(bankrollId, params?.hourly, hourlyEnabled);
  const daily = useDailySnapshots(bankrollId, params?.daily, dailyEnabled);
  const weekly = useWeeklySnapshots(bankrollId, params?.weekly, weeklyEnabled);
  const monthly = useMonthlySnapshots(
    bankrollId,
    params?.monthly,
    monthlyEnabled,
  );
  const yearly = useYearlySnapshots(bankrollId, params?.yearly, yearlyEnabled);

  const active =
    normalizedMode === "hourly"
      ? hourly
      : normalizedMode === "daily"
        ? daily
        : normalizedMode === "weekly"
          ? weekly
          : normalizedMode === "monthly"
            ? monthly
            : yearly;

  const data = useMemo(
    () => (active.data ?? []) as AnySnapshotDTO[],
    [active.data],
  );

  return {
    ...active,
    mode: normalizedMode,
    data,
  };
}
