import { z } from "zod";

export const ResultEnum = z.enum([
  "pending",
  "win",
  "lose",
  "draw",
  "cashout",
  "returned",
  "void",
  "half_win",
  "half_lose",
]);

export const EventStatusEnum = z.enum([
  "SCHEDULED",
  "LIVE",
  "FINISHED",
  "CANCELED",
  "POSTPONED",
  "ABANDONED",
]);

export const OperationTypeEnum = z.enum([
  "DEPOSIT",
  "WITHDRAWAL",
  "STAKE",
  "BET_PLACED",
  "BET_WIN",
  "BET_LOSS",
  "BET_VOID",
  "BET_CASHOUT",
  "UNID_VALUE_CHANGE",
  "BALANCE_ADJUSTMENT",
  "BET_BONUS",
  "TRANSFER",
]);

// BANKROLL FILTER
export const BankrollFilterSchema = z.object({
  userId: z.number().int().optional(),
  isActive: z.boolean().optional(),
  bookmaker: z.string().optional(),
  bankrollId: z.number().int().optional(),
});

export type BankrollFilterDTO = z.infer<typeof BankrollFilterSchema>;

// EVENT FILTER
export const EventFilterSchema = z.object({
  bankrollId: z.number().int().optional(),
  userId: z.number().int().optional(),
  result: ResultEnum.optional(),
  status: EventStatusEnum.optional(),
  modality: z.string().optional(),
  market: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type EventFilterDTO = z.infer<typeof EventFilterSchema>;

// HISTORY FILTER
export const HistoryFilterSchema = z.object({
  bankrollId: z.number().int().optional(),
  type: OperationTypeEnum.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type HistoryFilterDTO = z.infer<typeof HistoryFilterSchema>;
