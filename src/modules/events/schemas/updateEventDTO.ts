import { z } from "zod";
import { ResultEnum } from "./EventItem";

export const UpdateEventDtoSchema = z.object({
  userId: z.number(),
  bankId: z.number().int().positive().optional(),
  modality: z.string().trim().min(1).optional(),
  eventType: z.string().optional().nullable(),
  league: z.string().trim().min(1).optional(),
  event: z.string().trim().min(1).optional(),
  market: z.string().trim().min(1).optional(),
  marketCategory: z.string().trim().optional(),
  marketSub: z.string().trim().optional(),
  optionMarket: z.string().trim().optional(),
  amount: z.number().positive("Valor deve ser positivo").optional(),
  odd: z.string().optional(),
  result: ResultEnum.optional(),

  // Campos de integração
  apiEventId: z.string().optional().nullable(),
  homeTeam: z.string().optional().nullable(),
  awayTeam: z.string().optional().nullable(),
  eventDate: z.string().optional().nullable(),
  strCountry: z.string().optional().nullable(),
  strTimestamp: z.string().optional().nullable(),
  strTime: z.string().optional().nullable(),
  strTimeLocal: z.string().optional().nullable(),
  dateEvent: z.string().optional().nullable(),
  dateEventLocal: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),

  // Campos visuais
  strHomeTeamBadge: z.string().optional().nullable(),
  strAwayTeamBadge: z.string().optional().nullable(),
  strBadge: z.string().optional().nullable(),
  strThumb: z.string().optional().nullable(),
});

export type UpdateEventDto = z.infer<typeof UpdateEventDtoSchema>;
