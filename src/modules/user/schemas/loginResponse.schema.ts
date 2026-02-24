import { z } from "zod";
import { Role } from "./user.schema";

export const AuthenticatedUserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  role:Role
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: AuthenticatedUserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
