import { z } from "zod";

// Schema simples para metadata no front (aceita qualquer JSON)
const JsonLike = z.any().optional().nullable();

export const CreateBankrollRecordSchema = z.object({
  bankrollId: z.number().int().positive(),
  type: z.string().max(50), // "MAX_DAILY_PROFIT", "BEST_STREAK", etc
  value: z.string(), // string no front; no backend converte para decimal
  date: z.coerce.date(),
  metadata: JsonLike,
});

export type CreateBankrollRecordDTO = z.infer<
  typeof CreateBankrollRecordSchema
>;

export const GetBankrollRecordSchema = CreateBankrollRecordSchema.extend({
  id: z.number().int(),
  createdAt: z.coerce.date(),
});

export type GetBankrollRecordDTO = z.infer<typeof GetBankrollRecordSchema>;
