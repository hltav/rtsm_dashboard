"use client";
import { useMemo } from "react";
import { useDailySnapshots } from "@/modules/bankroll/hook/snapshots/useDailySnapshots";
import { useHourlySnapshots } from "@/modules/bankroll/hook/snapshots/useHourlySnapshots";
import { useMonthlySnapshots } from "@/modules/bankroll/hook/snapshots/useMonthlySnapshots";
import { Period } from "@/modules/dashboard/charts/utils/dateRanges";

type RangeParams = { startDate: string; endDate: string };

const toNumber = (v: unknown) => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const n = Number(v.replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

export function useBankrollUnitsMetric(
  bankrollId: number | "all" | null,
  period: Period,
  range: RangeParams,
  year: number,
) {
  const isAll = bankrollId === "all";
  const bankId = !isAll ? Number(bankrollId ?? 0) : 0;

  const hourlyQ = useHourlySnapshots(bankId, range, !isAll && period === "day");
  const dailyQ = useDailySnapshots(
    bankId,
    range,
    !isAll && (period === "week" || period === "month" || period === "custom"),
  );
  const monthlyQ = useMonthlySnapshots(
    bankId,
    { year },
    !isAll && period === "year",
  );

  const totalUnits = useMemo(() => {
    if (isAll) return 0;

    if (period === "day") {
      return Number(
        (hourlyQ.data ?? [])
          .reduce((sum, item) => sum + toNumber(item.unitsChange), 0)
          .toFixed(2),
      );
    }

    if (period === "week" || period === "month" || period === "custom") {
      return Number(
        (dailyQ.data ?? [])
          .reduce((sum, item) => sum + toNumber(item.unitsChange), 0)
          .toFixed(2),
      );
    }

    return Number(
      (monthlyQ.data ?? [])
        .reduce((sum, item) => sum + toNumber(item.unitsChange), 0)
        .toFixed(2),
    );
  }, [isAll, period, hourlyQ.data, dailyQ.data, monthlyQ.data]);

  const isLoading =
    !isAll &&
    ((period === "day" && hourlyQ.isLoading) ||
      ((period === "week" || period === "month" || period === "custom") &&
        dailyQ.isLoading) ||
      (period === "year" && monthlyQ.isLoading));

  const error = useMemo(() => {
    if (isAll) return null;
    if (period === "day") return hourlyQ.error ?? null;
    if (period === "week" || period === "month" || period === "custom") {
      return dailyQ.error ?? null;
    }
    return monthlyQ.error ?? null;
  }, [isAll, period, hourlyQ.error, dailyQ.error, monthlyQ.error]);

  return {
    totalUnits,
    isLoading,
    error,
  };
}
