import { z } from "zod";

export const PerformanceMetricsSchema = z.object({
  dataPoints: z.number(),
  memory: z.object({
    avg: z.string(),
    max: z.string(),
    min: z.string(),
  }),
  cpu: z.object({
    avg: z.string(),
  }),
  trend: z.string(),
});

export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>;