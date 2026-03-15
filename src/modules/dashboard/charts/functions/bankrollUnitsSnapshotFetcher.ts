import { memo, useEffect, useMemo } from "react";
import { useDailySnapshots } from "@/modules/bankroll/hook/snapshots/useDailySnapshots";
import { useHourlySnapshots } from "@/modules/bankroll/hook/snapshots/useHourlySnapshots";
import { useMonthlySnapshots } from "@/modules/bankroll/hook/snapshots/useMonthlySnapshots";

import { buildUnitsSeries } from "./bankrollUnits.functions";
import {
  normalizeHourly,
  normalizeDaily,
  normalizeMonthly,
} from "./normalizeSnapshots";

import {
  ResultUnitsFilter,
  SeriesUnitsData,
} from "../types/bankrollUnits.types";

type Period = "day" | "week" | "month" | "year" | "custom";
type RangeParams = { startDate: string; endDate: string };

export const BankrollUnitsSnapshotFetcher = memo(
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
    resultFilter: ResultUnitsFilter;
    onDataLoaded: (id: number, series: SeriesUnitsData) => void;
  }) => {
    const hourlyQ = useHourlySnapshots(id, range, period === "day");
    const dailyQ = useDailySnapshots(
      id,
      range,
      period === "week" || period === "month" || period === "custom",
    );
    const monthlyQ = useMonthlySnapshots(id, { year }, period === "year");

    const series = useMemo<SeriesUnitsData>(() => {
      if (period === "day") {
        const normalized = normalizeHourly(hourlyQ.data ?? []);
        return buildUnitsSeries(normalized, resultFilter);
      }

      if (period === "week" || period === "month" || period === "custom") {
        const normalized = normalizeDaily(dailyQ.data ?? []);
        return buildUnitsSeries(normalized, resultFilter);
      }

      const normalized = normalizeMonthly(monthlyQ.data ?? []);
      return buildUnitsSeries(normalized, resultFilter);
    }, [period, hourlyQ.data, dailyQ.data, monthlyQ.data, resultFilter]);

    useEffect(() => {
      onDataLoaded(id, series);
    }, [id, series, onDataLoaded]);

    return null;
  },
);

BankrollUnitsSnapshotFetcher.displayName = "BankrollUnitsSnapshotFetcher";
