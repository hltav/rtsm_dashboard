import z from "zod";

// SCHEMA CREATE
export const CreateMonthlySnapshotSchema = z.object({
  bankrollId: z.number().int().positive(),
  year: z.number().int(),
  month: z.number().int().min(1).max(12),

  // Balances
  balance: z.string(),
  unidValue: z.string(),

  // Performance
  monthlyProfit: z.string(),
  monthlyROI: z.string(),
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

export type CreateMonthlySnapshotDTO = z.infer<
  typeof CreateMonthlySnapshotSchema
>;

// SCHEMA GET
export const GetMonthlySnapshotSchema = CreateMonthlySnapshotSchema.extend({
  id: z.number().int(),
  createdAt: z.coerce.date(),
});

export type GetMonthlySnapshotDTO = z.infer<typeof GetMonthlySnapshotSchema>;
