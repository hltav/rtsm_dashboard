import { z } from "zod";

// ==================== DatabaseMetrics ====================
export const DatabaseMetricsSchema = z.object({
  totalConnections: z.number().int().nonnegative(),
  activeConnections: z.number().int().nonnegative(),
  idleConnections: z.number().int().nonnegative(),
  queriesPerSecond: z.number().nonnegative(),
  uptime: z.number().nonnegative(),
});

export type DatabaseMetrics = z.infer<typeof DatabaseMetricsSchema>;

// ==================== PerformanceReport ====================
export const PerformanceReportSchema = z.object({
  period: z.string().min(1),
  totalRequests: z.number().int().nonnegative(),
  averageResponseTime: z.number().nonnegative(),
  errorRate: z.number().min(0), // se você quiser limitar até 1, use .max(1)
  slowestEndpoint: z.string().min(1).optional(),
});

export type PerformanceReport = z.infer<typeof PerformanceReportSchema>;

// ==================== RequestMetrics ====================
export const RequestMetricsSchema = z.object({
  endpoint: z.string().min(1),
  method: z
    .string()
    .transform((v) => v.toUpperCase())
    .refine(
      (v) =>
        ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"].includes(
          v,
        ),
      { message: "Invalid HTTP method" },
    ),
  count: z.number().int().nonnegative(),
  avgDuration: z.number().nonnegative(),
});

export type RequestMetrics = z.infer<typeof RequestMetricsSchema>;

// ==================== ErrorMetrics ====================
export const ErrorMetricsSchema = z.object({
  timestamp: z.string().datetime(), // espera ISO 8601
  message: z.string().min(1),
  stack: z.string().optional(),
  statusCode: z.number().int().optional(),
});

export type ErrorMetrics = z.infer<typeof ErrorMetricsSchema>;

// ==================== Helpers (arrays) ====================
export const RequestMetricsArraySchema = z.array(RequestMetricsSchema);
export const ErrorMetricsArraySchema = z.array(ErrorMetricsSchema);
