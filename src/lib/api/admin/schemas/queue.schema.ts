import { z } from "zod";

export const adminQueueNameSchema = z.enum([
  "frequent",
  "linking",
  "heavy",
  "sync",
]);
export type AdminQueueName = z.infer<typeof adminQueueNameSchema>;

export const adminJobStatusSchema = z.enum([
  "waiting",
  "active",
  "failed",
  "completed",
]);
export type AdminJobStatus = z.infer<typeof adminJobStatusSchema>;

// counts por fila
export const adminQueueCountsSchema = z.object({
  waiting: z.number(),
  active: z.number(),
  failed: z.number(),
  completed: z.number(),
});
export type AdminQueueCounts = z.infer<typeof adminQueueCountsSchema>;

// overview: Record<queueName, counts>
export const adminQueueOverviewSchema = z.record(
  adminQueueNameSchema,
  adminQueueCountsSchema,
);
export type AdminQueueOverview = z.infer<typeof adminQueueOverviewSchema>;


export const adminQueueJobSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    name: z.string().optional(),
    data: z.unknown().optional(),
    timestamp: z.number().optional(),
    attemptsMade: z.number().optional(),
    failedReason: z.string().optional(),
  })
  .passthrough();

export const adminQueueJobsSchema = z.array(adminQueueJobSchema);

export type AdminQueueJob = z.infer<typeof adminQueueJobSchema>;
export type AdminQueueJobs = z.infer<typeof adminQueueJobsSchema>;
