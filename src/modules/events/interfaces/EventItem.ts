import { z } from "zod";

export const ResultEnum = z.enum([
  "pending",
  "win",
  "lose",
  "draw",
  "returned",
  "void",
]);

export const EventItemSchema = z.object({
  id: z.number(),
  bankId: z.number().int().positive(),
  modality: z.string().trim().min(1),
  eventType: z.string().optional().nullable(),
  league: z.string().trim().min(1),
  event: z.string().trim().min(1),
  market: z.string().trim().min(1),
  marketCategory: z.string().trim().optional().default(""),
  marketSub: z.string().trim().optional().default(""),
  optionMarket: z.string().trim().optional().default(""),
  amount: z.number().positive("Valor deve ser positivo"),
  odd: z.string(),
  userId: z.number(),
  result: ResultEnum.optional().default("pending"),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export const EventIntegrationSchema = z.object({
  apiEventId: z.string().optional().nullable(),
  homeTeam: z.string().optional().nullable(),
  awayTeam: z.string().optional().nullable(),
  eventDate: z.string().optional().nullable(),
});

export const EventVisualsSchema = z.object({
  strHomeTeamBadge: z.string().optional().nullable(),
  strAwayTeamBadge: z.string().optional().nullable(),
  strBadge: z.string().optional().nullable(),
  strThumb: z.string().optional().nullable(),
});

export type EventItem = z.infer<typeof EventItemSchema>;
export type EventIntegration = z.infer<typeof EventIntegrationSchema>;
export type EventVisuals = z.infer<typeof EventVisualsSchema>;

export const FullEventSchema = EventItemSchema.merge(
  EventIntegrationSchema
).merge(EventVisualsSchema);
export type FullEvent = z.infer<typeof FullEventSchema>;
