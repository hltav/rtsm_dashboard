import { z } from "zod";
import { Result } from "./Result.schema";

export const BetCoreSchema = z.object({
  id: z.number(),
  bankrollId: z.number().int().positive(),
  userId: z.number(),
  // === CONTEXTO DO EVENTO ===
  sport: z.string().trim().min(1),
  league: z.string().trim().min(1),
  eventDescription: z.string().trim().min(1),
  eventDate: z.string().optional().nullable(),
  homeTeam: z.string().optional().nullable(),
  awayTeam: z.string().optional().nullable(),
  homeTeamBadge: z.string().trim().optional().nullable(),
  awayTeamBadge: z.string().trim().optional().nullable(),
  leagueBadge: z.string().trim().optional().nullable(),
  // === MERCADO ===
  market: z.string().trim().min(1),
  marketCategory: z.string().trim().min(1),
  marketSub: z.string().optional().nullable(),
  selection: z.string().trim().min(1),
  // === VALORES (Decimal no backend) ===
  odd: z.string(), // Decimal
  stake: z.string(), // Decimal
  potentialReturn: z.string(),
  actualReturn: z.string().optional().nullable(),
  bankrollBalance: z.string(),
  unitValue: z.string(),
  stakeInUnits: z.string(),
  // === RESULTADO ===
  result: Result,
  profit: z.string().optional().nullable(),
  roi: z.string().optional().nullable(),
  isWin: z.boolean().optional().nullable(),
  // === DATAS ===
  placedAt: z.string(),
  settledAt: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BetIntegrationSchema = z.object({
  externalMatchId: z.number().optional().nullable(),
  apiEventId: z.string().optional().nullable(),
  secondaryApiEventId: z.string().optional().nullable(),
});

export const BetVisualsSchema = z.object({
  strHomeTeamBadge: z.string().optional().nullable(),
  strAwayTeamBadge: z.string().optional().nullable(),
  strBadge: z.string().optional().nullable(),
  strThumb: z.string().optional().nullable(),
});

export const FullBetSchema =
  BetCoreSchema.merge(BetIntegrationSchema).merge(BetVisualsSchema);

export type BetCore = z.infer<typeof BetCoreSchema>;
export type FullBet = z.infer<typeof FullBetSchema>;
