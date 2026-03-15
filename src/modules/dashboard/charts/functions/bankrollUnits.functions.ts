import { ResultFilter } from "../types/bankrollBalance.types";
import { NormalizedSnapshot } from "./normalizeSnapshots";

export type SeriesUnitsData = {
  dates: Date[];
  values: number[]; // cumulativo em unidades
  net: number;
};

export function buildUnitsSeries(
  rows: NormalizedSnapshot[],
  filter: ResultFilter,
): SeriesUnitsData {
  const ordered = [...rows].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Se o último snapshot com cumulativeUnits não-nulo existir, usa o backend
  const hasCumulative = ordered.some((r) => r.cumulativeUnits !== null);

  let cum = 0;
  const dates: Date[] = [];
  const values: number[] = [];

  for (const r of ordered) {
    const u = r.unitsChange;

    if (filter === "won" && u <= 0) continue;
    if (filter === "lost" && u >= 0) continue;

    if (hasCumulative) {
      // Usa o valor acumulado real do backend — não recalcula
      if (r.cumulativeUnits === null) continue; // pula snapshots sem cumulative
      dates.push(r.date);
      values.push(Number(r.cumulativeUnits.toFixed(4)));
    } else {
      // Fallback: recalcula localmente (snapshots antigos sem cumulativeUnits)
      cum += u;
      dates.push(r.date);
      values.push(Number(cum.toFixed(4)));
    }
  }

  const net = values.length ? values[values.length - 1] : 0;
  return { dates, values, net };
}
