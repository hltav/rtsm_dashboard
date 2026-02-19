export type Period = "day" | "week" | "month" | "year" | "custom";

function toBrazilRangeISO(d: Date, type: "start" | "end"): string {
  // Brasília = UTC-3, então meia-noite local = 03:00 UTC
  const OFFSET_HOURS = 3;

  if (type === "start") {
    // 00:00 Brasília = 03:00 UTC do mesmo dia
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(OFFSET_HOURS)}:00:00.000Z`;
  } else {
    // 23:59 Brasília = 02:59 UTC do dia SEGUINTE
    const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}T${pad(OFFSET_HOURS)}:00:00.000Z`;
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

function toDateOnly(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

export function startOfWeek(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return startOfDay(date);
}

export function endOfWeek(d: Date): Date {
  const date = startOfWeek(d);
  date.setDate(date.getDate() + 6);
  return endOfDay(date);
}

export function startOfPreviousWeek(d: Date): Date {
  // Volta para a segunda da semana ANTERIOR à semana atual
  const start = startOfWeek(d); // segunda desta semana
  const prev = new Date(start);
  prev.setDate(start.getDate() - 7); // recua 7 dias
  return prev;
}

export function endOfPreviousWeek(d: Date): Date {
  const end = startOfWeek(d); // segunda desta semana
  const prevSunday = new Date(end);
  prevSunday.setDate(end.getDate() - 1); // domingo da semana anterior
  return endOfDay(prevSunday);
}
export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function startOfYear(d: Date): Date {
  return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}

export function endOfYear(d: Date): Date {
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

export function getRange(
  period: Period,
  date: Date,
  customRange?: { start: Date; end: Date },
) {
  switch (period) {
    case "day":
      return {
        startDate: toBrazilRangeISO(startOfDay(date), "start"),
        endDate: toBrazilRangeISO(endOfDay(date), "end"),
      };
    case "week":
      return {
        startDate: toBrazilRangeISO(startOfPreviousWeek(date), "start"),
        endDate: toBrazilRangeISO(endOfPreviousWeek(date), "end"),
      };
    case "month":
      // daily usa year/month/day como inteiros, sem timezone
      return {
        startDate: toDateOnly(startOfMonth(date)),
        endDate: toDateOnly(endOfMonth(date)),
      };
    case "year":
      return {
        startDate: toDateOnly(startOfYear(date)),
        endDate: toDateOnly(endOfYear(date)),
      };
    case "custom":
      return {
        startDate: toDateOnly(startOfDay(customRange?.start ?? date)),
        endDate: toDateOnly(endOfDay(customRange?.end ?? date)),
      };
  }
}
