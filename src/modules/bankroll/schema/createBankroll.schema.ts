import { z } from "zod";

export const CreateBankrollSchema = z.object({
  userId: z.number(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  balance: z.coerce
    .number()
    .nonnegative({ message: "Saldo não pode ser negativo" }),
  unidValue: z.coerce
    .number()
    .positive({ message: "Valor da unidade deve ser maior que zero" }),
  bookmaker: z.string().min(1, { message: "Casa de apostas é obrigatória" }),
});

export type CreateBankrollDto = z.infer<typeof CreateBankrollSchema>;
