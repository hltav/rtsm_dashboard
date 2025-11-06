import { z } from "zod";


export const BankrollHistorySchema = z.object({
  id: z.number({ message: "ID inválido" }),
  bankrollId: z.number({ message: "ID do bankroll inválido" }),
  balance: z.coerce.number().nonnegative({ message: "Saldo não pode ser negativo" }),
  unidValue: z.coerce.number().positive({ message: "Valor da unidade deve ser maior que zero" }),
  deposits: z.coerce.number().nonnegative({ message: "Depósitos não podem ser negativos" }),
  withdrawals: z.coerce.number().nonnegative({ message: "Saques não podem ser negativos" }),
  addedBalance: z.coerce.number(),
  gains: z.coerce.number(),
  losses: z.coerce.number(),
  profitAndLoss: z.coerce.number(),
  result: z.coerce.number(),
  date: z.coerce.date({ message: "Data inválida" }),
});