import { z } from "zod";

export const AuthenticatedUserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: AuthenticatedUserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
