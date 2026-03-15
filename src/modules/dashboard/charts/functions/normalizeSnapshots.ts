type HourlySnapshot = {
  bucketStart: Date | string;
  unitsChange?: string | number | null;
  cumulativeUnits?: string | number | null; // ← adicionar
};

type DailySnapshot = {
  year: number;
  month: number;
  day: number;
  unitsChange?: string | number | null;
  cumulativeUnits?: string | number | null; // ← adicionar
};

type MonthlySnapshot = {
  year: number;
  month: number;
  unitsChange?: string | number | null;
  cumulativeUnits?: string | number | null; // ← adicionar
};

export type NormalizedSnapshot = {
  date: Date;
  unitsChange: number;
  cumulativeUnits: number | null; // ← adicionar
};

const toNumber = (v: unknown): number => {
  if (v == null) return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    // troca vírgula por ponto se vier "1,23"
    const n = Number(v.replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const ensureDate = (d: Date | string): Date =>
  d instanceof Date ? d : new Date(d);

export const normalizeHourly = (rows: HourlySnapshot[]): NormalizedSnapshot[] =>
  rows.map((r) => ({
    date: ensureDate(r.bucketStart),
    unitsChange: toNumber(r.unitsChange),
    cumulativeUnits:
      r.cumulativeUnits != null ? toNumber(r.cumulativeUnits) : null,
  }));

export const normalizeDaily = (rows: DailySnapshot[]): NormalizedSnapshot[] =>
  rows.map((r) => ({
    date: new Date(r.year, r.month - 1, r.day, 0, 0, 0, 0),
    unitsChange: toNumber(r.unitsChange),
    cumulativeUnits:
      r.cumulativeUnits != null ? toNumber(r.cumulativeUnits) : null,
  }));

export const normalizeMonthly = (
  rows: MonthlySnapshot[],
): NormalizedSnapshot[] =>
  rows.map((r) => ({
    date: new Date(r.year, r.month - 1, 1, 0, 0, 0, 0),
    unitsChange: toNumber(r.unitsChange),
    cumulativeUnits:
      r.cumulativeUnits != null ? toNumber(r.cumulativeUnits) : null,
  }));
