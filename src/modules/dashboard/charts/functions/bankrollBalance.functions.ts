import { GetDailySnapshotDTO } from "@/modules/bankroll/schema/snapshots/dailySnapshot.schema";
import { GetHourlySnapshotDTO } from "@/modules/bankroll/schema/snapshots/hourlySnapshot.schema";
import { ResultFilter, SeriesData } from "../types/bankrollBalance.types";
import { GetMonthlySnapshotDTO } from "@/modules/bankroll/schema/snapshots/monthlySnapshot.schema";
import { GetWeeklySnapshotDTO } from "@/modules/bankroll/schema/snapshots/weeklySnapshot.schema";

function parseDecimalString(value: string | undefined): number {
  return value ? Number(value) : 0;
}

function dailySnapshotToDate(s: GetDailySnapshotDTO): Date {
  // meio-dia pra evitar timezone “virando o dia”
  return new Date(s.year, s.month - 1, s.day, 12, 0, 0);
}

function weeklySnapshotToDate(s: GetWeeklySnapshotDTO): Date {
  // Converte ano + número da semana ISO para a segunda-feira daquela semana
  const jan4 = new Date(s.year, 0, 4); // 4 de jan sempre está na semana 1
  const startOfWeek1 = new Date(jan4);
  startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7)); // segunda da semana 1
  const date = new Date(startOfWeek1);
  date.setDate(startOfWeek1.getDate() + (s.week - 1) * 7);
  date.setHours(12, 0, 0, 0);
  return date;
}

function monthlySnapshotToDate(s: GetMonthlySnapshotDTO): Date {
  // dia 15 ao meio-dia = bem estável para plotagem mensal
  return new Date(s.year, s.month - 1, 15, 12, 0, 0);
}

/** Overloads: sem union exposto e sem any */
export function buildSeries(
  snapshots: GetDailySnapshotDTO[],
  resultFilter: ResultFilter,
): SeriesData;
export function buildSeries(
  snapshots: GetHourlySnapshotDTO[],
  resultFilter: ResultFilter,
): SeriesData;
export function buildSeries(
  snapshots: GetWeeklySnapshotDTO[],
  resultFilter: ResultFilter,
): SeriesData;
export function buildSeries(
  snapshots: GetMonthlySnapshotDTO[],
  resultFilter: ResultFilter,
): SeriesData;

// Implementação única
export function buildSeries(
  snapshots:
    | GetDailySnapshotDTO[]
    | GetHourlySnapshotDTO[]
    | GetWeeklySnapshotDTO[]
    | GetMonthlySnapshotDTO[],
  resultFilter: ResultFilter,
): SeriesData {
  if (snapshots.length === 0) return { dates: [], balances: [], netProfit: 0 };

  const firstItem = snapshots[0];

  const kind =
    "bucketStart" in firstItem
      ? "hourly"
      : "day" in firstItem
        ? "daily"
        : "week" in firstItem
          ? "weekly"
          : "month" in firstItem
            ? "monthly"
            : "unknown";

  if (kind === "unknown") return { dates: [], balances: [], netProfit: 0 };

  const profitOf = (
    s:
      | GetDailySnapshotDTO
      | GetHourlySnapshotDTO
      | GetWeeklySnapshotDTO
      | GetMonthlySnapshotDTO,
  ): number => {
    if (kind === "hourly")
      return parseDecimalString((s as GetHourlySnapshotDTO).hourlyProfit);
    if (kind === "daily")
      return parseDecimalString((s as GetDailySnapshotDTO).dailyProfit);
    if (kind === "weekly")
      return parseDecimalString((s as GetWeeklySnapshotDTO).weeklyProfit);
    return parseDecimalString((s as GetMonthlySnapshotDTO).monthlyProfit);
  };

  const dateOf = (
    s:
      | GetDailySnapshotDTO
      | GetHourlySnapshotDTO
      | GetWeeklySnapshotDTO
      | GetMonthlySnapshotDTO,
  ): Date => {
    if (kind === "hourly")
      return new Date((s as GetHourlySnapshotDTO).bucketStart);
    if (kind === "daily") return dailySnapshotToDate(s as GetDailySnapshotDTO);
    if (kind === "weekly")
      return weeklySnapshotToDate(s as GetWeeklySnapshotDTO);
    return monthlySnapshotToDate(s as GetMonthlySnapshotDTO);
  };

  const filtered = snapshots.filter((s) => {
    if (resultFilter === "all") return true;

    const profit = profitOf(
      s as GetDailySnapshotDTO | GetHourlySnapshotDTO | GetMonthlySnapshotDTO,
    );

    if (resultFilter === "won") return profit > 0;
    if (resultFilter === "lost") return profit < 0;
    if (resultFilter === "profitloss") return profit !== 0;
    return true;
  });

  if (filtered.length === 0) return { dates: [], balances: [], netProfit: 0 };

  const sorted = [...filtered].sort((a, b) => {
    const da = dateOf(
      a as GetDailySnapshotDTO | GetHourlySnapshotDTO | GetMonthlySnapshotDTO,
    ).getTime();
    const db = dateOf(
      b as GetDailySnapshotDTO | GetHourlySnapshotDTO | GetMonthlySnapshotDTO,
    ).getTime();
    return da - db;
  });

  // Agora mapeia na ordem correta
  const dates = sorted.map((s) =>
    dateOf(
      s as GetDailySnapshotDTO | GetHourlySnapshotDTO | GetMonthlySnapshotDTO,
    ),
  );

  const balances = sorted.map((s) =>
    parseDecimalString((s as { balance?: string }).balance),
  );

  const first = balances[0] ?? 0;
  const last = balances[balances.length - 1] ?? 0;

  return { dates, balances, netProfit: last - first };
}
