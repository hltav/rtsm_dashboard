import { z } from "zod";

export const BankrollItemSchema = z.object({
  id: z.string(),
  withdrawals: z.string(),
  addedBalance: z.string(),
  gains: z.string(),
  losses: z.string(),
  profitAndLoss: z.string(),
  result: z.string(),
  unidValue: z.string(),
  editBalance: z.string().optional(),
});

export type BankrollItem = z.infer<typeof BankrollItemSchema>;

export const BankrollEditItemSchema = z.object({
  id: z.string(),
  editBalance: z
    .enum(["addedBalance", "withdrawals"])
    .or(z.string().optional()),
  withdrawals: z.string(),
  addedBalance: z.string(),
  unidValue: z.string(),
});

export type BankrollEditItem = z.infer<typeof BankrollEditItemSchema>;
