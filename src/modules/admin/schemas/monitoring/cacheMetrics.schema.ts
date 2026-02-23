import { z } from "zod";

export const cacheMetricsSchema = z.object({
  status: z.enum(["connected", "error"]),
  uptimeInSeconds: z.number().nonnegative(),
  connectedClients: z.number().nonnegative(),
  usedMemoryBytes: z.number().nonnegative(),
  usedMemoryHuman: z.string(),
  totalCommandsProcessed: z.number().nonnegative(),
  keyspaceHits: z.number().nonnegative(),
  keyspaceMisses: z.number().nonnegative(),
  evictedKeys: z.number().nonnegative(),
  expiredKeys: z.number().nonnegative(),
  memoryFragmentationRatio: z.number().nonnegative(),
  hitRate: z.number().min(0).max(100),
  timestamp: z.string().datetime(),
});

export type CacheMetrics = z.infer<typeof cacheMetricsSchema>;
