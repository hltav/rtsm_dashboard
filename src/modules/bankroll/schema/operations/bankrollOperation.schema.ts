import { z } from "zod";

// Mesmo enum do backend
export const OperationTypeEnum = z.enum([
  "DEPOSIT",
  "WITHDRAW",
  "ADJUSTMENT",
  "TRANSFER",
  "OTHER",
]);

// Helpers simples do front
export const optionalStringSchema = z.string().optional().nullable();
export const optionalNumberSchema = z.number().optional().nullable();

export const CreateOperationSchema = z.object({
  bankrollId: z.number().int().positive(),
  type: OperationTypeEnum,
  amount: z.string(), // frontend recebe como string mesmo!
  description: optionalStringSchema,
  relatedBankrollId: optionalNumberSchema,
  date: z.coerce
    .date()
    .optional()
    .default(() => new Date()),
});

export type CreateBankrollOperationDTO = z.infer<typeof CreateOperationSchema>;

export const GetOperationSchema = CreateOperationSchema.extend({
  id: z.number().int(),
});

export type GetBankrollOperationDTO = z.infer<typeof GetOperationSchema>;
