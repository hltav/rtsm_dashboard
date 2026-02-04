import { GetDailySnapshotDTO } from "@/modules/bankroll/schema/snapshots/dailySnapshot.schema";
import { GetHourlySnapshotDTO } from "@/modules/bankroll/schema/snapshots/hourlySnapshot.schema";
import { ResultFilter, SeriesData } from "../types/bankrollBalance.types";
import { GetMonthlySnapshotDTO } from "@/modules/bankroll/schema/snapshots/monthlySnapshot.schema";

// export function parseDecimalString(value: string | undefined): number {
//   return value ? Number(value) : 0;
// }

// export function dailySnapshotToDate(s: GetDailySnapshotDTO): Date {
//   // meio-dia pra evitar efeito timezone “virando o dia”
//   return new Date(s.year, s.month - 1, s.day, 12, 0, 0);
// }

// /**
//  * ✅ Overloads pra ficar 100% tipado (sem union e sem any)
//  */
// export function buildSeries(
//   snapshots: GetDailySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData;
// export function buildSeries(
//   snapshots: GetHourlySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData;
// export function buildSeries(
//   snapshots: GetDailySnapshotDTO[] | GetHourlySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData {
//   if (snapshots.length === 0) {
//     return { dates: [], balances: [], netProfit: 0 };
//   }

//   // Detecta pelo campo exclusivo do daily
//   const isDaily = "year" in snapshots[0];

//   const sorted = [...snapshots].sort((a, b) => {
//     if (isDaily) {
//       const da = dailySnapshotToDate(a as GetDailySnapshotDTO).getTime();
//       const db = dailySnapshotToDate(b as GetDailySnapshotDTO).getTime();
//       return da - db;
//     }

//     const da = new Date((a as GetHourlySnapshotDTO).bucketStart).getTime();
//     const db = new Date((b as GetHourlySnapshotDTO).bucketStart).getTime();
//     return da - db;
//   });

//   const filtered = sorted.filter((s) => {
//     if (resultFilter === "all") return true;

//     const profit = isDaily
//       ? parseDecimalString((s as GetDailySnapshotDTO).dailyProfit)
//       : parseDecimalString((s as GetHourlySnapshotDTO).hourlyProfit);

//     if (resultFilter === "won") return profit > 0;
//     if (resultFilter === "lost") return profit < 0;
//     if (resultFilter === "profitloss") return profit !== 0;
//     return true;
//   });

//   if (filtered.length === 0) {
//     return { dates: [], balances: [], netProfit: 0 };
//   }

//   const dates = filtered.map((s) =>
//     isDaily
//       ? dailySnapshotToDate(s as GetDailySnapshotDTO)
//       : new Date((s as GetHourlySnapshotDTO).bucketStart),
//   );

//   const balances = filtered.map((s) =>
//     parseDecimalString(
//       isDaily
//         ? (s as GetDailySnapshotDTO).balance
//         : (s as GetHourlySnapshotDTO).balance,
//     ),
//   );

//   const first = balances[0] ?? 0;
//   const last = balances[balances.length - 1] ?? 0;

//   return {
//     dates,
//     balances,
//     netProfit: last - first,
//   };
// }

// function parseDecimalString(value: string | undefined): number {
//   return value ? Number(value) : 0;
// }

// function dailySnapshotToDate(s: GetDailySnapshotDTO): Date {
//   // meio-dia pra evitar timezone “virando o dia”
//   return new Date(s.year, s.month - 1, s.day, 12, 0, 0);
// }

// function monthlySnapshotToDate(s: GetMonthlySnapshotDTO): Date {
//   // dia 15 ao meio-dia = bem estável para plotagem mensal
//   return new Date(s.year, s.month - 1, 15, 12, 0, 0);
// }

// /** Overloads: sem union exposto e sem any */
// export function buildSeries(
//   snapshots: GetDailySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData;
// export function buildSeries(
//   snapshots: GetHourlySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData;
// export function buildSeries(
//   snapshots: GetMonthlySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData;

// // Implementação única
// export function buildSeries(
//   snapshots:
//     | GetDailySnapshotDTO[]
//     | GetHourlySnapshotDTO[]
//     | GetMonthlySnapshotDTO[],
//   resultFilter: ResultFilter,
// ): SeriesData {
//   if (snapshots.length === 0) return { dates: [], balances: [], netProfit: 0 };

//   const firstItem = snapshots[0];

//   const kind =
//     "bucketStart" in firstItem
//       ? "hourly"
//       : "day" in firstItem
//         ? "daily"
//         : "month" in firstItem
//           ? "monthly"
//           : "unknown";

//   if (kind === "unknown") return { dates: [], balances: [], netProfit: 0 };

//   const filtered = snapshots.filter((s) => {
//     if (resultFilter === "all") return true;

//     const profit =
//       kind === "hourly"
//         ? parseDecimalString((s as GetHourlySnapshotDTO).hourlyProfit)
//         : kind === "daily"
//           ? parseDecimalString((s as GetDailySnapshotDTO).dailyProfit)
//           : parseDecimalString((s as GetMonthlySnapshotDTO).monthlyProfit);

//     if (resultFilter === "won") return profit > 0;
//     if (resultFilter === "lost") return profit < 0;
//     if (resultFilter === "profitloss") return profit !== 0;
//     return true;
//   });

//   if (filtered.length === 0) return { dates: [], balances: [], netProfit: 0 };

//   const dates = filtered.map((s) => {
//     if (kind === "hourly")
//       return new Date((s as GetHourlySnapshotDTO).bucketStart);
//     if (kind === "daily") return dailySnapshotToDate(s as GetDailySnapshotDTO);
//     return monthlySnapshotToDate(s as GetMonthlySnapshotDTO);
//   });

//   const balances = filtered.map((s) =>
//     parseDecimalString((s as { balance?: string }).balance),
//   );

//   const first = balances[0] ?? 0;
//   const last = balances[balances.length - 1] ?? 0;

//   return { dates, balances, netProfit: last - first };
// }

function parseDecimalString(value: string | undefined): number {
  return value ? Number(value) : 0;
}

function dailySnapshotToDate(s: GetDailySnapshotDTO): Date {
  // meio-dia pra evitar timezone “virando o dia”
  return new Date(s.year, s.month - 1, s.day, 12, 0, 0);
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
  snapshots: GetMonthlySnapshotDTO[],
  resultFilter: ResultFilter,
): SeriesData;

// Implementação única
export function buildSeries(
  snapshots:
    | GetDailySnapshotDTO[]
    | GetHourlySnapshotDTO[]
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
        : "month" in firstItem
          ? "monthly"
          : "unknown";

  if (kind === "unknown") return { dates: [], balances: [], netProfit: 0 };

  const profitOf = (
    s: GetDailySnapshotDTO | GetHourlySnapshotDTO | GetMonthlySnapshotDTO,
  ): number => {
    if (kind === "hourly")
      return parseDecimalString((s as GetHourlySnapshotDTO).hourlyProfit);
    if (kind === "daily")
      return parseDecimalString((s as GetDailySnapshotDTO).dailyProfit);
    return parseDecimalString((s as GetMonthlySnapshotDTO).monthlyProfit);
  };

  const dateOf = (
    s: GetDailySnapshotDTO | GetHourlySnapshotDTO | GetMonthlySnapshotDTO,
  ): Date => {
    if (kind === "hourly")
      return new Date((s as GetHourlySnapshotDTO).bucketStart);
    if (kind === "daily") return dailySnapshotToDate(s as GetDailySnapshotDTO);
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
