import { Period } from "../utils/dateRanges";

export interface BankrollBalanceChartProps {
  bankrollId: number | "all" | null;
}

export interface BankrollUnitsChartProps {
  bankrollId: number | "all" | null;
  period: Period;
  selectedDate: Date;
  customStart: Date | null;
  customEnd: Date | null;
  onPeriodChange: (period: Period) => void;
  onSelectedDateChange: (date: Date) => void;
  onCustomStartChange: (date: Date | null) => void;
  onCustomEndChange: (date: Date | null) => void;
}
