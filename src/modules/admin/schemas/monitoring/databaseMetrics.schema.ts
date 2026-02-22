import { z } from "zod";

export const DatabaseMetricsSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("connected"),
    latencyMs: z.number().int().nonnegative(),
    sizeBytes: z.number().int().nonnegative(),
    activeConnections: z.number().int().nonnegative(),
    timestamp: z.string().datetime(),
  }),
  z.object({
    status: z.literal("error"),
    timestamp: z.string().datetime(),
  }),
]);

export type DatabaseMetrics = z.infer<typeof DatabaseMetricsSchema>;
