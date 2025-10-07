import { z } from "zod";

const EditBalanceOptions = z.enum(["addedBalance", "withdrawals"]);

export const BankrollItemSchema = z.object({
  id: z.number(),
  withdrawals: z.number(),
  addedBalance: z.number(),
  gains: z.number(),
  losses: z.number(),
  profitAndLoss: z.number(),
  result: z.number(),
  unidValue: z.number(),
  editBalance: EditBalanceOptions.or(z.literal("")),
  balance: z.number(),
});

export type BankrollItem = z.infer<typeof BankrollItemSchema>;

export const BankrollEditItemSchema = z.object({
  id: z.number(),
  balance: z.number(),
  unidValue: z.number(),
  editBalance: EditBalanceOptions.or(z.literal("")),
  withdrawals: z.number(),
  addedBalance: z.number(),
});

export type BankrollEditItem = z.infer<typeof BankrollEditItemSchema>;
