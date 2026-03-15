import { z } from "zod";

export const HistoryTypeEnum = z.enum([
  "DEPOSIT",
  "WITHDRAWAL",
  "BET_PLACED",
  "BET_WON",
  "BET_LOST",
  "BET_VOID",
  "UNID_VALUE_CHANGE",
  "BALANCE_ADJUSTMENT",
]);

export type HistoryType = z.infer<typeof HistoryTypeEnum>;

export const BankrollHistorySchema = z.object({
  id: z.number().int(),
  bankrollId: z.number().int(),
  type: HistoryTypeEnum,
  date: z.coerce.date(),

  // Estado antes/depois
  balanceBefore: z.coerce.number(),
  balanceAfter: z.coerce.number(),
  unidValueBefore: z.coerce.number(),
  unidValueAfter: z.coerce.number(),

  // amount
  amount: z.coerce.number(),

  // Relacionamentos
  eventId: z.number().nullable().optional(),

  // Optional description
  description: z.string().nullable().optional(),

  // Timestamp
  createdAt: z.coerce.date(),
});

export type GetBankrollHistoryDTO = z.infer<typeof BankrollHistorySchema>;
