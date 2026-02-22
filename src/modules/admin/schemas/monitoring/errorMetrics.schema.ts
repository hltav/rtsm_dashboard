import { z } from "zod";

export const TopErrorSchema = z.object({
  path: z.string(),
  count: z.number(),
});

export const RecentErrorSchema = z.object({
  message: z.string(),
  path: z.string(),
  timestamp: z.coerce.date(),
});

export const ErrorMetricsSchema = z.object({
  total: z.number(),
  period: z.string(),
  topErrors: z.array(TopErrorSchema),
  recentErrors: z.array(RecentErrorSchema),
});

export type ErrorMetrics = z.infer<typeof ErrorMetricsSchema>;
export type TopError = z.infer<typeof TopErrorSchema>;
export type RecentError = z.infer<typeof RecentErrorSchema>;
