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
  id: z.number().optional(),
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
  createdAt: z.date().optional().default(() => new Date()),
  updatedAt: z.date().optional().default(() => new Date()),
});

export type EventItem = z.infer<typeof EventItemSchema>;
