import { z } from "zod";

export const SlowRequestSchema = z.object({
  method: z.string(),
  path: z.string(),
  duration: z.string(),
  timestamp: z.string().datetime(),
});

export const RequestMetricsSchema = z.object({
  total: z.number(),
  avgDuration: z.string(),
  statusCodeDistribution: z.record(z.string(), z.number()),
  slowestRequests: z.array(SlowRequestSchema),
});

export type RequestMetrics = z.infer<typeof RequestMetricsSchema>;
export type SlowRequest = z.infer<typeof SlowRequestSchema>;