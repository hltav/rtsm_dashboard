import { z } from "zod";

export const BankrollFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  balance: z.number().min(1, { message: "Saldo é obrigatório" }),
  unidValue: z.number().min(1, { message: "Valor da unidade é obrigatório" }),
  bookmaker: z.string().min(1, { message: "Casa de apostas é obrigatória" }),
});

export type BankrollForm = z.infer<typeof BankrollFormSchema>;
