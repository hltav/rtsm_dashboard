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
  date: z.coerce.date(),
  unidValue: z.coerce.number().nullable().optional(),
  actualReturn: z.coerce.number().nullable().optional(),
  amount: z.coerce.number().nullable().optional(),
  balanceAfter: z.coerce.number().nullable().optional(),
  balanceBefore: z.coerce.number().nullable().optional(),
  description: z.string().nullable().optional(),
  eventId: z.number().nullable().optional(),
  eventName: z.string().nullable().optional(),
  odds: z.coerce.number().nullable().optional(),
  potentialWin: z.coerce.number().nullable().optional(),
  stake: z.coerce.number().nullable().optional(),
  type: HistoryTypeEnum.nullable().optional(),
  unidValueAfter: z.coerce.number().nullable().optional(),
  unidValueBefore: z.coerce.number().nullable().optional(),
});

export type GetBankrollHistoryDTO = z.infer<typeof BankrollHistorySchema>;
