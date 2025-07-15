import { z } from 'zod';

export const SignUpSchema = z
  .object({
    firstname: z.string().min(2, 'Nome muito curto'),
    lastname: z.string().min(2, 'Sobrenome muito curto'),
    nickname: z.string().min(2, 'Apelido muito curto'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmação deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export interface RegisterFormProps {
  onRegister: (data: SignUpFormData) => Promise<void>;
}