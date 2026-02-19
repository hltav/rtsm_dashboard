import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

export type Period = "day" | "week" | "month" | "year" | "custom";

export interface DateRange {
  start: Date;
  end: Date;
}

export function getCustomRange(period: Period, selectedDate: Date): DateRange {
  switch (period) {
    case "day":
      return {
        start: startOfDay(selectedDate),
        end: endOfDay(selectedDate),
      };

    case "week":
      return {
        start: startOfWeek(selectedDate, { weekStartsOn: 1 }), // Segunda
        end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
      };

    case "month":
      return {
        start: startOfMonth(selectedDate),
        end: endOfMonth(selectedDate),
      };

    case "year":
      return {
        start: startOfYear(selectedDate),
        end: endOfYear(selectedDate),
      };

    default:
      return {
        start: startOfDay(selectedDate),
        end: endOfDay(selectedDate),
      };
  }
}
