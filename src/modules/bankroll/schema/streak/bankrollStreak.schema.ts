import { z } from "zod";

export const CreateBankrollStreakSchema = z.object({
  bankrollId: z.number().int().positive(),
  type: z.string().max(50), // WIN_STREAK, LOSS_STREAK
  length: z.number().int().positive(),
  startDate: z.string(), // date string
  endDate: z.string().nullable().optional(),
  totalProfit: z.string(), // decimal as string
  totalROI: z.string(), // decimal as string
});

export type CreateBankrollStreakDTO = z.infer<
  typeof CreateBankrollStreakSchema
>;

export const GetBankrollStreakSchema = CreateBankrollStreakSchema.extend({
  id: z.number().int(),
  createdAt: z.string(),
});

export type GetBankrollStreakDTO = z.infer<typeof GetBankrollStreakSchema>;
