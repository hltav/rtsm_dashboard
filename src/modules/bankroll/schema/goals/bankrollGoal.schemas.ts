import { z } from "zod";

export const CreateGoalSchema = z.object({
  bankrollId: z.number().int().positive(),
  description: z.string().max(255),
  targetProfit: z.string(), // decimal → string
  currentValue: z.string().default("0"),
  period: z
    .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
    .optional()
    .nullable(),
  deadline: z.coerce.date().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateBankrollGoalDto = z.infer<typeof CreateGoalSchema>;

export const UpdateGoalSchema = z.object({
  id: z.number().int().positive(),
  description: z.string().max(255).optional(),
  targetProfit: z.string().optional(),
  currentValue: z.string().optional(),
  deadline: z.coerce.date().optional().nullable(),
  achievedAt: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
});

export type UpdateBankrollGoalDto = z.infer<typeof UpdateGoalSchema>;

export const GetGoalSchema = CreateGoalSchema.extend({
  id: z.number().int(),
  achievedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type GetBankrollGoalDto = z.infer<typeof GetGoalSchema>;
