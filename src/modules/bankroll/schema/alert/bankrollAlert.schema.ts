import z from "zod";

// Se você já tem no back, importe igual aqui:
export const AlertTypeEnum = z.enum([
  "DRAWDOWN",
  "PROFIT_TARGET",
  "LOSS_LIMIT",
  "STREAK",
  "ROI_DROP",
]);

export const optionalDateSchema = z.union([
  z.string().datetime().nullable(),
  z.date().nullable(),
]);

// CREATE DTO
export const CreateBankrollAlertSchema = z.object({
  bankrollId: z.number().int().positive(),
  type: AlertTypeEnum,
  threshold: z.string().max(100),
  message: z.string().max(255),
  isActive: z.boolean().default(true),
});

export type CreateBankrollAlertDTO = z.infer<typeof CreateBankrollAlertSchema>;

// UPDATE DTO
export const UpdateBankrollAlertSchema = z.object({
  threshold: z.string().max(100).optional(),
  message: z.string().max(255).optional(),
  isActive: z.boolean().optional(),
  triggeredAt: optionalDateSchema.optional(),
});

export type UpdateBankrollAlertDTO = z.infer<typeof UpdateBankrollAlertSchema>;

// GET DTO
export const GetBankrollAlertSchema = CreateBankrollAlertSchema.extend({
  id: z.number().int(),
  triggeredAt: optionalDateSchema.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type GetBankrollAlertDTO = z.infer<typeof GetBankrollAlertSchema>;
