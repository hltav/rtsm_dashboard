export type FilterUnitsMode = "all" | "daily";
export type ResultUnitsFilter = "all" | "won" | "lost" | "profitloss";

export type SeriesUnitsData = {
  dates: Date[];
  values: number[]; // antes balances
  net: number; // antes netProfit
};
