import { memo, useEffect, useMemo } from "react";
import { useDailySnapshots } from "@/modules/bankroll/hook/snapshots/useDailySnapshots";
import { useHourlySnapshots } from "@/modules/bankroll/hook/snapshots/useHourlySnapshots";
import { useMonthlySnapshots } from "@/modules/bankroll/hook/snapshots/useMonthlySnapshots";
import { buildSeries } from "./bankrollBalance.functions";
import { ResultFilter, SeriesData } from "../types/bankrollBalance.types";

type Period = "day" | "week" | "month" | "year" | "custom";
type RangeParams = { startDate: string; endDate: string };

export const BankrollSnapshotFetcher = memo(
  ({
    id,
    period,
    range,
    year,
    resultFilter,
    onDataLoaded,
  }: {
    id: number;
    period: Period;
    range: RangeParams;
    year: number;
    resultFilter: ResultFilter;
    onDataLoaded: (id: number, series: SeriesData) => void;
  }) => {
    const hourlyQ = useHourlySnapshots(id, range, period === "day");
    const dailyQ = useDailySnapshots(
      id,
      range,
      period === "week" || period === "month" || period === "custom",
    );
    const monthlyQ = useMonthlySnapshots(id, { year }, period === "year");

    const series = useMemo(() => {
      if (period === "day")
        return buildSeries(hourlyQ.data ?? [], resultFilter);
      if (period === "week" || period === "month" || period === "custom")
        return buildSeries(dailyQ.data ?? [], resultFilter);
      return buildSeries(monthlyQ.data ?? [], resultFilter);
    }, [period, hourlyQ.data, dailyQ.data, monthlyQ.data, resultFilter]);

    useEffect(() => {
      onDataLoaded(id, series);
    }, [id, series, onDataLoaded]);

    return null;
  },
);

BankrollSnapshotFetcher.displayName = "BankrollSnapshotFetcher";
