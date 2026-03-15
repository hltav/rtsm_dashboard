import { ResultFilter } from "../types/bankrollBalance.types";
import { NormalizedSnapshot } from "./normalizeSnapshots";

export type SeriesUnitsData = {
  dates: Date[];
  values: number[];
  net: number;
};

export function buildUnitsSeries(
  rows: NormalizedSnapshot[],
  filter: ResultFilter,
  rebaseFromFirst = false,
): SeriesUnitsData {
  const ordered = [...rows].sort((a, b) => a.date.getTime() - b.date.getTime());

  const hasCumulative = ordered.some((r) => r.cumulativeUnits !== null);

  let cum = 0;
  const dates: Date[] = [];
  const rawValues: number[] = [];

  for (const r of ordered) {
    const u = r.unitsChange;

    if (filter === "won" && u <= 0) continue;
    if (filter === "lost" && u >= 0) continue;

    if (hasCumulative) {
      if (r.cumulativeUnits === null) continue;
      dates.push(r.date);
      rawValues.push(Number(r.cumulativeUnits.toFixed(4)));
    } else {
      cum += u;
      dates.push(r.date);
      rawValues.push(Number(cum.toFixed(4)));
    }
  }

  const values =
    rebaseFromFirst && rawValues.length > 0
      ? rawValues.map((v) => Number((v - rawValues[0]).toFixed(4)))
      : rawValues;

  const net = values.length ? values[values.length - 1] : 0;

  return { dates, values, net };
}
