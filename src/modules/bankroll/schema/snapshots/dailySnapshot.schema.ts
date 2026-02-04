import z from "zod";

const decimalSchema = z.string().optional();

// CREATE SCHEMA
export const CreateDailySnapshotSchema = z.object({
  bankrollId: z.number().int().positive(),
  year: z.number().int().min(1900),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),

  balance: decimalSchema,
  unidValue: decimalSchema,

  dailyProfit: decimalSchema,
  dailyROI: decimalSchema,
  unitsChange: decimalSchema,

  peakBalance: decimalSchema,
  maxDrawdown: decimalSchema,
  dailyDrawdown: decimalSchema,
  drawdownPercent: decimalSchema,

  betsPlaced: z.number().int().default(0),
  betsWon: z.number().int().default(0),
  betsLost: z.number().int().default(0),

  winRate: decimalSchema,
});

export type CreateDailySnapshotDTO = z.infer<typeof CreateDailySnapshotSchema>;

// GET SCHEMA
export const GetDailySnapshotSchema = CreateDailySnapshotSchema.extend({
  id: z.number().int(),
  createdAt: z.coerce.date(),
});

export type GetDailySnapshotDTO = z.infer<typeof GetDailySnapshotSchema>;
