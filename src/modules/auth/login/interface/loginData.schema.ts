import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginData = z.infer<typeof loginSchema>;
