import { z } from "zod";

export const BankrollSchema = z.object({
  id: z.number({ message: "ID inválido" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  balance: z.coerce.number().nonnegative({ message: "Saldo não pode ser negativo" }),
  unidValue: z.coerce.number().positive({ message: "Valor da unidade deve ser maior que zero" }),
  bookmaker: z.string().min(1, { message: "Casa de apostas é obrigatória" }),
});

export type BankrollDto = z.infer<typeof BankrollSchema>;