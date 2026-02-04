import z from "zod";

// SCHEMA CREATE
export const CreateYearlySnapshotSchema = z.object({
  bankrollId: z.number().int().positive(),
  year: z.number().int(),

  // Balances
  balance: z.string(),
  unidValue: z.string(),

  // Performance
  yearlyProfit: z.string(),
  yearlyROI: z.string(),
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

export type CreateYearlySnapshotDTO = z.infer<
  typeof CreateYearlySnapshotSchema
>;

// SCHEMA GET
export const GetYearlySnapshotSchema = CreateYearlySnapshotSchema.extend({
  id: z.number().int(),
  createdAt: z.coerce.date(),
});

export type GetYearlySnapshotDTO = z.infer<typeof GetYearlySnapshotSchema>;
