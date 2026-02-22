import apiClient from "@/lib/api/apiBaseUrl";
import {
  PerformanceMetrics,
  PerformanceMetricsSchema,
} from "../../schemas/monitoring/performanceMetrics.schema";

export const getPerformanceMetrics = async (): Promise<PerformanceMetrics> => {
  const response = await apiClient.get("/admin/monitoring/performance");

  return PerformanceMetricsSchema.parse(response.data);
};
