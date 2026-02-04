import z from "zod";


// SCHEMA CREATE
export const CreateWeeklySnapshotSchema = z.object({
  bankrollId: z.number().int().positive(),
  year: z.number().int(),
  week: z.number().int().min(1).max(53),

  // Balances
  balance: z.string(),
  unidValue: z.string(),

  // Performance
  weeklyProfit: z.string(),
  weeklyROI: z.string(),
  unitsChange: z.string(),

  // Drawdown
  peakBalance: z.string(),
  maxDrawdown: z.string(),
  drawdownPercent: z.string(),

  // Bets
  betsPlaced: z.number().int().default(0),
  betsWon: z.number().int().default(0),
  betsLost: z.number().int().default(0),

  winRate: z.string(),
});

export type CreateWeeklySnapshotDTO = z.infer<
  typeof CreateWeeklySnapshotSchema
>;


// SCHEMA GET
export const GetWeeklySnapshotSchema = CreateWeeklySnapshotSchema.extend({
  id: z.number().int(),
  createdAt: z.coerce.date(),
});

export type GetWeeklySnapshotDTO = z.infer<typeof GetWeeklySnapshotSchema>;
