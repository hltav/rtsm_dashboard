import z from "zod";

const decimalSchema = z.string().optional();

// CREATE SCHEMA
export const CreateHourlySnapshotSchema = z.object({
  bankrollId: z.number().int().positive(),

  /**
   * Início da hora (bucket).
   * Ex: 2026-01-31T13:00:00.000Z
   *
   * No front você vai mandar string ISO.
   * Usando z.coerce.date() pra aceitar string -> Date automaticamente.
   */
  bucketStart: z.coerce.date(),

  // Balanços
  balance: decimalSchema,
  unidValue: decimalSchema,

  // Performance horária
  hourlyProfit: decimalSchema,
  hourlyROI: decimalSchema,
  unitsChange: decimalSchema,

  // Drawdown
  peakBalance: decimalSchema,
  maxDrawdown: decimalSchema,
  hourlyDrawdown: decimalSchema,
  drawdownPercent: decimalSchema,

  // Apostas
  betsPlaced: z.number().int().default(0),
  betsWon: z.number().int().default(0),
  betsLost: z.number().int().default(0),

  winRate: decimalSchema,
});

export type CreateHourlySnapshotDTO = z.infer<typeof CreateHourlySnapshotSchema>;

// GET SCHEMA
export const GetHourlySnapshotSchema = CreateHourlySnapshotSchema.extend({
  id: z.number().int(),
  createdAt: z.coerce.date(),
});

export type GetHourlySnapshotDTO = z.infer<typeof GetHourlySnapshotSchema>;
