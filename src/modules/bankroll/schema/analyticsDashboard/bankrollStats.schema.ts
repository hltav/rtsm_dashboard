import z from "zod";

// Campos decimais como string (compatível com Prisma)
const decimal = z.string();

export const BankrollStatsSchema = z.object({
  totalBets: z.number().int(),
  wonBets: z.number().int(),
  lostBets: z.number().int(),
  pendingBets: z.number().int(),
  winRate: decimal,
  roi: decimal,
  totalProfit: decimal,
  avgStake: decimal,
  avgOdds: decimal,
  currentStreak: z.number().int(),
  longestWinStreak: z.number().int(),
  longestLoseStreak: z.number().int(),
  biggestWin: decimal,
  biggestLoss: decimal,
});

export type BankrollStatsDTO = z.infer<typeof BankrollStatsSchema>;

// STATS POR PERÍODO
export const PeriodStatsSchema = z.object({
  period: z.enum(["day", "week", "month", "year"]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  profit: decimal,
  roi: decimal,
  betsPlaced: z.number().int(),
  winRate: decimal,
});

export type PeriodStatsDTO = z.infer<typeof PeriodStatsSchema>;
