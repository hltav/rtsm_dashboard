export type Period = "day" | "week" | "month" | "year";

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

// Semana padrão Brasil: domingo → sábado
export function startOfWeek(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0 (domingo) → 6
  date.setDate(date.getDate() - day);
  return startOfDay(date);
}

export function endOfWeek(d: Date): Date {
  const date = startOfWeek(d);
  date.setDate(date.getDate() + 6);
  return endOfDay(date);
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

export function getRange(period: Period, date: Date) {
  switch (period) {
    case "day":
      return {
        startDate: startOfDay(date).toISOString(),
        endDate: endOfDay(date).toISOString(),
      };

    case "week":
      return {
        startDate: startOfWeek(date).toISOString(),
        endDate: endOfWeek(date).toISOString(),
      };

    case "month":
      return {
        startDate: startOfMonth(date).toISOString(),
        endDate: endOfMonth(date).toISOString(),
      };

    case "year":
      return {
        startDate: startOfYear(date).toISOString(),
        endDate: endOfYear(date).toISOString(),
      };
  }
}
