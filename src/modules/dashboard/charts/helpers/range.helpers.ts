export function isInRange(date: Date, start: Date, end: Date) {
  const time = date.getTime();
  return time >= start.getTime() && time < end.getTime();
}

export function parseRangeDates(range: { startDate?: string; endDate?: string }) {
  return {
    start: range.startDate ? new Date(range.startDate) : null,
    end: range.endDate ? new Date(range.endDate) : null,
  };
}