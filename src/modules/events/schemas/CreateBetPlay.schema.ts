import { z } from "zod";

export const CreateBetSchema = z.object({
  bankrollId: z.number().int().positive(),
  // === CONTEXTO DO EVENTO ===
  sport: z.string().trim().min(1, "Sport é obrigatório"),
  league: z.string().trim().min(1, "League é obrigatória"),
  eventDescription: z.string().trim().min(1, "Evento é obrigatório"),
  eventDate: z.string().optional().nullable(),
  homeTeam: z.string().optional().nullable(),
  awayTeam: z.string().optional().nullable(),
  homeTeamBadge: z.string().trim().optional().nullable(),
  awayTeamBadge: z.string().trim().optional().nullable(),
  leagueBadge: z.string().trim().optional().nullable(),
  // === MERCADO ===
  market: z.string().trim().min(1, "Market é obrigatório"),
  marketCategory: z.string().trim().min(1, "Categoria do market é obrigatória"),
  marketSub: z.string().optional().nullable(),
  selection: z.string().trim().min(1, "Selection é obrigatória"),
  // === VALORES (Decimal no backend) ===
  odd: z.string().trim().min(1, "Odd é obrigatória"),
  stake: z.string().trim().min(1, "Stake é obrigatória"),
  unitValue: z.string(),
  // === INTEGRAÇÃO ===
  externalMatchId: z.number().int().optional().nullable(),
  apiSportsEventId: z.string().optional().nullable(), 
  tsdbEventId: z.string().optional().nullable(),
  // === METADADOS ===
  confidence: z.number().int().min(1).max(10).optional().nullable(),
  notes: z.string().optional().nullable(),
  tags: z.array(z.string().trim()).optional(),
});

export type CreateBetPayload = z.infer<typeof CreateBetSchema>;
