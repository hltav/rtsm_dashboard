export type FilterMode = "all" | "daily";
export type ResultFilter = "all" | "won" | "lost" | "profitloss";

export type SeriesData = {
  dates: Date[];
  balances: number[];
  netProfit: number;
};
