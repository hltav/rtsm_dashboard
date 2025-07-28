import { z } from "zod";

export const phoneSchema = z
  .string()
  .nonempty("O número de telefone é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length === 11, {
    message: "O número de telefone deve ter 11 dígitos",
  })
  .transform((val) => {
    const ddd = val.slice(0, 2);
    const firstDigit = val.slice(2, 3);
    const middle = val.slice(3, 7);
    const last = val.slice(7);
    return `(${ddd}) ${firstDigit} ${middle} - ${last}`;
  });

export type PhoneValidator = z.infer<typeof phoneSchema>;
