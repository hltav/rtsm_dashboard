import apiClient from "@/lib/api/apiBaseUrl";
import {
  ErrorMetrics,
  ErrorMetricsSchema,
} from "../../schemas/monitoring/errorMetrics.schema";

export const getErrorMetrics = async (
  hours?: number,
): Promise<ErrorMetrics> => {
  const response = await apiClient.get("/admin/monitoring/errors", {
    params: { hours },
  });
  return ErrorMetricsSchema.parse(response.data);
};
