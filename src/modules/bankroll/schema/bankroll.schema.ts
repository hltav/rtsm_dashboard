import { z } from "zod";
import { BankrollHistorySchema } from "./bankrollHistory.schema";

export const BankrollSchema = z.object({
  id: z.number({ message: "ID inválido" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  balance: z.coerce
    .number()
    .nonnegative({ message: "Saldo não pode ser negativo" }),
  unidValue: z.coerce
    .number()
    .positive({ message: "Valor da unidade deve ser maior que zero" }),
  bookmaker: z.string().min(1, { message: "Casa de apostas é obrigatória" }),
  initialBalance: z.coerce
    .number()
    .nonnegative({ message: "Saldo inicial não pode ser negativo" }),
  totalDeposited: z.coerce.number().optional(),
  totalReturned: z.coerce.number().optional(),
  totalStaked: z.coerce.number().optional(),
  totalWithdrawn: z.coerce.number().optional(),
  lastHistory: BankrollHistorySchema.optional(),
  histories: z.array(BankrollHistorySchema).optional(),
});

export type BankrollDto = z.infer<typeof BankrollSchema>;
